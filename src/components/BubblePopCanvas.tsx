/**
 * Shyfoxie's Dream Studio - Mode 3: Bubble Pop Art Canvas
 * Dreamy translucent floating bubbles cover the artwork and pop with satisfying sparkles to reveal the masterpiece.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Artwork, CanvasArtProgress, SpeedSetting } from '../types';
import { soundEngine } from '../services/audioEngine';
import { interactionEngine } from '../services/interactionEngine';
import { getImageElement, subscribeArtworkImageLoaded } from '../services/artworkLibrary';

interface Props {
  artwork: Artwork;
  speed: SpeedSetting;
  isPaused: boolean;
  onProgress: (progress: CanvasArtProgress) => void;
  onComplete: () => void;
}

interface BubbleCell {
  col: number;
  row: number;
  cx: number;
  cy: number;
  baseRadius: number;
  radius: number;
  wobblePhase: number;
  r: number;
  g: number;
  b: number;
  popped: boolean;
  popAnimation: number; // 0 = fully active, 1..10 = burst frames, >10 = gone
}

interface PopParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  size: number;
  life: number;
  maxLife: number;
}

export const BubblePopCanvas: React.FC<Props> = ({
  artwork,
  speed,
  isPaused,
  onProgress,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bubblesRef = useRef<BubbleCell[]>([]);
  const unpoppedRef = useRef<number[]>([]);
  const particlesRef = useRef<PopParticle[]>([]);
  const baseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressReportRef = useRef<number>(0);
  const [isDone, setIsDone] = useState(false);

  const getSpeedParams = useCallback(() => {
    switch (speed) {
      case 'sleep':
        return { batch: 1, intervalFrames: 5 };
      case 'normal':
        return { batch: 2, intervalFrames: 2 };
      case 'fast':
        return { batch: 7, intervalFrames: 1 };
      case 'turbo':
        return { batch: 25, intervalFrames: 1 };
    }
  }, [speed]);

  // Pre-render underlying high-res artwork into an offscreen canvas
  useEffect(() => {
    let isCancelled = false;
    const rawData = artwork.generateImageData();
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 1920;
    offCanvas.height = 1080;
    const offCtx = offCanvas.getContext('2d')!;

    // Create a temporary low-res canvas to scale cleanly to 1920x1080
    const temp = document.createElement('canvas');
    temp.width = artwork.width;
    temp.height = artwork.height;
    const tempCtx = temp.getContext('2d')!;

    if (rawData instanceof HTMLCanvasElement) {
      tempCtx.drawImage(rawData, 0, 0);
    } else {
      tempCtx.putImageData(rawData, 0, 0);
    }

    const drawPhotoToCanvas = (img: CanvasImageSource, naturalW: number, naturalH: number) => {
      offCtx.clearRect(0, 0, 1920, 1080);
      const imgAspect = naturalW / naturalH;
      const targetAspect = 1920 / 1080;
      let sx = 0, sy = 0, sw = naturalW, sh = naturalH;
      if (imgAspect > targetAspect) {
        sw = naturalH * targetAspect;
        sx = (naturalW - sw) / 2;
      } else {
        sh = naturalW / targetAspect;
        sy = (naturalH - sh) / 2;
      }
      offCtx.imageSmoothingEnabled = true;
      offCtx.imageSmoothingQuality = 'high';
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, 1920, 1080);
      baseCanvasRef.current = offCanvas;
    };

    // Default initial render from temp canvas
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';
    offCtx.drawImage(temp, 0, 0, 1920, 1080);
    baseCanvasRef.current = offCanvas;

    // If realistic image is already cached or loads, draw full-res 1080p photo!
    const cachedImg = getImageElement(artwork.id);
    if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
      drawPhotoToCanvas(cachedImg, cachedImg.naturalWidth, cachedImg.naturalHeight);
    } else if (artwork.imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!isCancelled) {
          drawPhotoToCanvas(img, img.naturalWidth, img.naturalHeight);
        }
      };
      img.src = artwork.imageUrl;
    }

    // Build bubble lattice (e.g. 48 cols x 27 rows of nice big clickable bubbles)
    const bCols = 48;
    const bRows = 27;
    const cellW = 1920 / bCols;
    const cellH = 1080 / bRows;
    const baseR = Math.min(cellW, cellH) * 0.54;

    const imgData = tempCtx.getImageData(0, 0, artwork.width, artwork.height);
    const bubbles: BubbleCell[] = [];
    const unpopped: number[] = [];

    for (let r = 0; r < bRows; r++) {
      for (let c = 0; c < bCols; c++) {
        // Sample corresponding color in artwork
        const sampleX = Math.floor((c / bCols) * artwork.width);
        const sampleY = Math.floor((r / bRows) * artwork.height);
        const pIdx = (sampleY * artwork.width + sampleX) * 4;

        const red = imgData.data[pIdx] || 160;
        const green = imgData.data[pIdx + 1] || 140;
        const blue = imgData.data[pIdx + 2] || 220;

        // Add subtle hex offset to rows for natural bubbly hexagonal packing
        const xOffset = (r % 2 === 1) ? cellW * 0.5 : 0;
        const cx = (c + 0.5) * cellW + xOffset;
        const cy = (r + 0.5) * cellH;

        bubbles.push({
          col: c,
          row: r,
          cx,
          cy,
          baseRadius: baseR,
          radius: baseR,
          wobblePhase: Math.random() * Math.PI * 2,
          r: red,
          g: green,
          b: blue,
          popped: false,
          popAnimation: 0
        });
        unpopped.push(bubbles.length - 1);
      }
    }

    // Sort pop order: lovely swirling spiral reveal from center outwards!
    const centerX = 1920 / 2;
    const centerY = 1080 / 2;
    unpopped.sort((a, b) => {
      const bA = bubbles[a];
      const bB = bubbles[b];
      const distA = Math.hypot(bA.cx - centerX, bA.cy - centerY) + (Math.sin(bA.col * 0.5) * 60);
      const distB = Math.hypot(bB.cx - centerX, bB.cy - centerY) + (Math.sin(bB.col * 0.5) * 60);
      return distA - distB;
    });

    bubblesRef.current = bubbles;
    unpoppedRef.current = unpopped;
    particlesRef.current = [];
    progressReportRef.current = 0;
    setIsDone(false);

    onProgress({
      placedCount: 0,
      totalCount: bubbles.length,
      percentage: 0,
      isCompleted: false
    });

    const unsubLoaded = subscribeArtworkImageLoaded((artId) => {
      if (artId === artwork.id) {
        const loadedImg = getImageElement(artId);
        if (loadedImg && loadedImg.complete) {
          drawPhotoToCanvas(loadedImg, loadedImg.naturalWidth, loadedImg.naturalHeight);
        }
      }
    });

    return () => {
      isCancelled = true;
      unsubLoaded();
    };
  }, [artwork, onProgress]);

  // Helper to trigger a bubble pop
  const popBubbleIndex = useCallback((idx: number) => {
    const bubble = bubblesRef.current[idx];
    if (!bubble || bubble.popped) return;
    bubble.popped = true;
    bubble.popAnimation = 1;

    // Spawn 8-12 sparkling droplet particles
    for (let p = 0; p < 10; p++) {
      const angle = (p / 10) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 3 + Math.random() * 6;
      particlesRef.current.push({
        x: bubble.cx,
        y: bubble.cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        r: Math.min(255, bubble.r + 40),
        g: Math.min(255, bubble.g + 40),
        b: Math.min(255, bubble.b + 40),
        size: 3 + Math.random() * 4,
        life: 0,
        maxLife: 25 + Math.random() * 15
      });
    }

    // Remove from unpopped list
    const uIdx = unpoppedRef.current.indexOf(idx);
    if (uIdx !== -1) unpoppedRef.current.splice(uIdx, 1);
  }, []);

  // Subscribe to interaction engine
  useEffect(() => {
    const unsub = interactionEngine.subscribe((interaction) => {
      if (unpoppedRef.current.length === 0) return;

      const popCount = interaction.type === 'gift' 
        ? (interaction.giftType === 'big_gift' ? 180 : 50) 
        : Math.min(unpoppedRef.current.length, Math.max(3, interaction.amount * 3));

      for (let i = 0; i < popCount; i++) {
        if (unpoppedRef.current.length === 0) break;
        const targetIdx = unpoppedRef.current[0];
        popBubbleIndex(targetIdx);
      }
      soundEngine.playBubblePop();
    });

    return () => unsub();
  }, [popBubbleIndex]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      frameCount++;

      const { batch, intervalFrames } = getSpeedParams();

      // Auto-pop bubbles if not paused
      if (!isPaused && unpoppedRef.current.length > 0 && frameCount % intervalFrames === 0) {
        let poppedThisTick = 0;
        for (let b = 0; b < batch; b++) {
          if (unpoppedRef.current.length === 0) break;
          const idx = unpoppedRef.current[0];
          popBubbleIndex(idx);
          poppedThisTick++;
        }

        if (poppedThisTick > 0 && frameCount % 3 === 0) {
          soundEngine.playBubblePop();
        }

        const total = bubblesRef.current.length;
        const popped = total - unpoppedRef.current.length;
        const percentage = Math.round((popped / total) * 100);

        if (Math.abs(percentage - progressReportRef.current) >= 1 || popped === total) {
          progressReportRef.current = percentage;
          onProgress({
            placedCount: popped,
            totalCount: total,
            percentage,
            isCompleted: popped === total
          });
        }

        if (popped === total && !isDone) {
          setIsDone(true);
          soundEngine.playMasterpieceCelebration();
          onComplete();
        }
      }

      // Draw Revealed Artwork first
      if (baseCanvasRef.current) {
        ctx.drawImage(baseCanvasRef.current, 0, 0, 1920, 1080);
      } else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 1920, 1080);
      }

      // Draw Remaining Bubbles
      const bubbles = bubblesRef.current;
      const time = performance.now() * 0.003;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        if (b.popped && b.popAnimation > 6) continue;

        // Gentle floating wobble
        const wobbleX = Math.sin(time + b.wobblePhase) * 2.5;
        const wobbleY = Math.cos(time * 0.8 + b.wobblePhase) * 2.5;
        const bx = b.cx + wobbleX;
        const by = b.cy + wobbleY;

        if (b.popped) {
          // Burst expansion animation
          b.popAnimation++;
          const expandR = b.baseRadius * (1 + b.popAnimation * 0.18);
          ctx.save();
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - b.popAnimation * 0.15)})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(bx, by, expandR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          continue;
        }

        // Draw translucent iridescent bubble
        ctx.save();
        ctx.translate(bx, by);

        // Fog/veil hiding the artwork
        ctx.fillStyle = 'rgba(15, 12, 28, 0.82)';
        ctx.beginPath();
        ctx.arc(0, 0, b.baseRadius * 0.98, 0, Math.PI * 2);
        ctx.fill();

        // Iridescent colorful gradient rim
        const grad = ctx.createRadialGradient(-b.baseRadius * 0.3, -b.baseRadius * 0.3, 2, 0, 0, b.baseRadius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        grad.addColorStop(0.3, 'rgba(236, 72, 153, 0.5)'); // pink sheen
        grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.4)'); // blue sheen
        grad.addColorStop(0.95, 'rgba(168, 85, 247, 0.6)'); // purple rim
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, b.baseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Specular highlight crescent
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(-b.baseRadius * 0.35, -b.baseRadius * 0.35, b.baseRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.baseRadius * 0.38, b.baseRadius * 0.38, b.baseRadius * 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Draw and update pop particles
      const particles = particlesRef.current;
      const aliveParticles: PopParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gentle gravity
        p.life++;

        if (p.life < p.maxLife) {
          const alpha = 1 - p.life / p.maxLife;
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle glint
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(p.x - 0.5, p.y - 0.5, p.size * 0.4 * alpha, 0, Math.PI * 2);
          ctx.fill();

          aliveParticles.push(p);
        }
      }
      particlesRef.current = aliveParticles;
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, isPaused, getSpeedParams, popBubbleIndex, isDone, onComplete, onProgress]);

  // Click or Drag to pop bubbles!
  const handlePointerInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (1920 / rect.width);
    const clickY = (e.clientY - rect.top) * (1080 / rect.height);

    // Find bubbles within click radius
    const popRadius = 90;
    const bubbles = bubblesRef.current;
    let poppedAny = false;

    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      if (!b.popped) {
        const dist = Math.hypot(b.cx - clickX, b.cy - clickY);
        if (dist <= popRadius) {
          popBubbleIndex(i);
          poppedAny = true;
        }
      }
    }

    if (poppedAny) {
      soundEngine.playBubblePop();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        onClick={handlePointerInteraction}
        onMouseMove={(e) => {
          if (e.buttons === 1) handlePointerInteraction(e); // pop on drag!
        }}
        className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-pink-950/40 border border-pink-500/20 cursor-crosshair active:scale-[0.998]"
      />
    </div>
  );
};
