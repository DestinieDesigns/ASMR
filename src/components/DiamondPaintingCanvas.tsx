/**
 * Shyfoxie's Dream Studio - Mode 1: Diamond Painting Canvas
 * Renders faceted shiny diamonds snapping into place to build a sparkling masterpiece.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Artwork, CanvasArtProgress, SpeedSetting } from '../types';
import { soundEngine } from '../services/audioEngine';
import { interactionEngine } from '../services/interactionEngine';
import { subscribeArtworkImageLoaded } from '../services/artworkLibrary';

interface Props {
  artwork: Artwork;
  speed: SpeedSetting;
  isPaused: boolean;
  onProgress: (progress: CanvasArtProgress) => void;
  onComplete: () => void;
}

interface DiamondCell {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  placed: boolean;
  scale: number;
  sparkleTimer: number;
  highlightFacet: string;
  shadowFacet: string;
  baseHex: string;
}

export const DiamondPaintingCanvas: React.FC<Props> = ({
  artwork,
  speed,
  isPaused,
  onProgress,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const cellsRef = useRef<DiamondCell[]>([]);
  const unplacedIndicesRef = useRef<number[]>([]);
  const progressReportRef = useRef<number>(0);
  const [isDone, setIsDone] = useState(false);

  // Speed multiplier
  const getSpeedParams = useCallback(() => {
    switch (speed) {
      case 'sleep':
        return { batch: 1, intervalFrames: 4 }; // Slow, relaxing ASMR pace
      case 'normal':
        return { batch: 2, intervalFrames: 2 };
      case 'fast':
        return { batch: 6, intervalFrames: 1 };
      case 'turbo':
        return { batch: 20, intervalFrames: 1 };
    }
  }, [speed]);

  // Initialize diamond grid from artwork imageData
  useEffect(() => {
    const rawData = artwork.generateImageData();
    let imgData: ImageData;

    if (rawData instanceof HTMLCanvasElement) {
      const ctx = rawData.getContext('2d')!;
      imgData = ctx.getImageData(0, 0, rawData.width, rawData.height);
    } else {
      imgData = rawData;
    }

    const w = artwork.width;
    const h = artwork.height;
    const cells: DiamondCell[] = [];
    const unplaced: number[] = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = imgData.data[idx];
        const g = imgData.data[idx + 1];
        const b = imgData.data[idx + 2];

        // Compute 3D facet highlights and shadows
        const hr = Math.min(255, Math.round(r * 1.35 + 25));
        const hg = Math.min(255, Math.round(g * 1.35 + 25));
        const hb = Math.min(255, Math.round(b * 1.35 + 25));

        const sr = Math.max(0, Math.round(r * 0.65));
        const sg = Math.max(0, Math.round(g * 0.65));
        const sb = Math.max(0, Math.round(b * 0.65));

        cells.push({
          x,
          y,
          r,
          g,
          b,
          placed: false,
          scale: 0,
          sparkleTimer: 0,
          highlightFacet: `rgb(${hr}, ${hg}, ${hb})`,
          shadowFacet: `rgb(${sr}, ${sg}, ${sb})`,
          baseHex: `rgb(${r}, ${g}, ${b})`
        });
        unplaced.push(cells.length - 1);
      }
    }

    // Sort placement order: organic clusters / spiral from bottom-up or center
    // Gives that realistic craft feel of someone working on diamond painting sections!
    unplaced.sort((a, b) => {
      const cellA = cells[a];
      const cellB = cells[b];
      // cluster by color similarity + vertical bias
      const distCenterA = Math.hypot(cellA.x - w * 0.5, cellA.y - h * 0.5);
      const distCenterB = Math.hypot(cellB.x - w * 0.5, cellB.y - h * 0.5);
      const rowBiasA = (h - cellA.y) * 1.5 + distCenterA * 0.8 + (Math.sin(cellA.x * 0.4) * 5);
      const rowBiasB = (h - cellB.y) * 1.5 + distCenterB * 0.8 + (Math.sin(cellB.x * 0.4) * 5);
      return rowBiasA - rowBiasB;
    });

    cellsRef.current = cells;
    unplacedIndicesRef.current = unplaced;
    progressReportRef.current = 0;
    setIsDone(false);

    onProgress({
      placedCount: 0,
      totalCount: cells.length,
      percentage: 0,
      isCompleted: false
    });

    const unsubLoaded = subscribeArtworkImageLoaded((artId) => {
      if (artId === artwork.id) {
        const raw = artwork.generateImageData();
        let freshData: ImageData;
        if (raw instanceof HTMLCanvasElement) {
          freshData = raw.getContext('2d')!.getImageData(0, 0, raw.width, raw.height);
        } else {
          freshData = raw;
        }
        cellsRef.current.forEach((cell) => {
          const idx = (cell.y * artwork.width + cell.x) * 4;
          const r = freshData.data[idx];
          const g = freshData.data[idx + 1];
          const b = freshData.data[idx + 2];
          cell.r = r;
          cell.g = g;
          cell.b = b;
          const hr = Math.min(255, Math.round(r * 1.35 + 25));
          const hg = Math.min(255, Math.round(g * 1.35 + 25));
          const hb = Math.min(255, Math.round(b * 1.35 + 25));
          const sr = Math.max(0, Math.round(r * 0.65));
          const sg = Math.max(0, Math.round(g * 0.65));
          const sb = Math.max(0, Math.round(b * 0.65));
          cell.highlightFacet = `rgb(${hr}, ${hg}, ${hb})`;
          cell.shadowFacet = `rgb(${sr}, ${sg}, ${sb})`;
          cell.baseHex = `rgb(${r}, ${g}, ${b})`;
        });
      }
    });

    return () => {
      unsubLoaded();
    };
  }, [artwork, onProgress]);

  // Subscribe to stream interactions (likes, gifts, clicks)
  useEffect(() => {
    const unsub = interactionEngine.subscribe((interaction) => {
      if (unplacedIndicesRef.current.length === 0) return;

      let countToPlace = 0;
      if (interaction.type === 'like') {
        countToPlace = Math.min(unplacedIndicesRef.current.length, Math.max(2, interaction.amount * 3));
      } else if (interaction.type === 'gift') {
        countToPlace = interaction.giftType === 'big_gift' ? 250 : 60;
        countToPlace = Math.min(unplacedIndicesRef.current.length, countToPlace);
      }

      for (let i = 0; i < countToPlace; i++) {
        const targetIdx = unplacedIndicesRef.current.shift();
        if (targetIdx !== undefined) {
          const cell = cellsRef.current[targetIdx];
          cell.placed = true;
          cell.scale = 1.35; // snap pop
          cell.sparkleTimer = 18;
        }
      }
      soundEngine.playDiamondSnap(4);
    });

    return () => unsub();
  }, []);

  // Main Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);

      // Handle placement if not paused and not finished
      const { batch, intervalFrames } = getSpeedParams();
      frameCount++;

      if (!isPaused && unplacedIndicesRef.current.length > 0 && frameCount % intervalFrames === 0) {
        let placedThisFrame = 0;
        for (let b = 0; b < batch; b++) {
          if (unplacedIndicesRef.current.length === 0) break;
          const idx = unplacedIndicesRef.current.shift()!;
          const cell = cellsRef.current[idx];
          cell.placed = true;
          cell.scale = 1.3;
          cell.sparkleTimer = 15;
          placedThisFrame++;
        }

        if (placedThisFrame > 0) {
          soundEngine.playDiamondSnap((frameCount % 7));
        }

        const total = cellsRef.current.length;
        const placed = total - unplacedIndicesRef.current.length;
        const percentage = Math.round((placed / total) * 100);

        if (Math.abs(percentage - progressReportRef.current) >= 1 || placed === total) {
          progressReportRef.current = percentage;
          onProgress({
            placedCount: placed,
            totalCount: total,
            percentage,
            isCompleted: placed === total
          });
        }

        if (placed === total && !isDone) {
          setIsDone(true);
          soundEngine.playMasterpieceCelebration();
          onComplete();
        }
      }

      // Draw canvas
      const width = canvas.width;
      const height = canvas.height;
      const gridW = artwork.width;
      const gridH = artwork.height;
      const cellW = width / gridW;
      const cellH = height / gridH;
      const radius = Math.min(cellW, cellH) * 0.48;

      // Dark cozy velvet backdrop for diamond painting canvas
      ctx.fillStyle = '#0c0a1a';
      ctx.fillRect(0, 0, width, height);

      // Draw guide grid & unplaced hints
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 0.5;

      const cells = cellsRef.current;
      const time = performance.now() * 0.002;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const cx = (c.x + 0.5) * cellW;
        const cy = (c.y + 0.5) * cellH;

        if (!c.placed) {
          // Unplaced diamond guide symbol
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
          ctx.fill();
        } else {
          // Animate snap scale
          if (c.scale > 1.0) {
            c.scale = Math.max(1.0, c.scale - 0.04);
          }

          const r = radius * c.scale;

          // Diamond Round/Faceted Gem rendering
          // Base Gem circle
          ctx.save();
          ctx.translate(cx, cy);

          // Drop shadow for 3D depth
          ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
          ctx.beginPath();
          ctx.arc(0.5, 0.8, r, 0, Math.PI * 2);
          ctx.fill();

          // Main gem body
          ctx.fillStyle = c.baseHex;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();

          // Facet top-left highlight
          ctx.fillStyle = c.highlightFacet;
          ctx.beginPath();
          ctx.arc(0, 0, r, Math.PI * 1.15, Math.PI * 1.85);
          ctx.lineTo(0, 0);
          ctx.closePath();
          ctx.fill();

          // Facet bottom-right shadow
          ctx.fillStyle = c.shadowFacet;
          ctx.beginPath();
          ctx.arc(0, 0, r, Math.PI * 0.15, Math.PI * 0.85);
          ctx.lineTo(0, 0);
          ctx.closePath();
          ctx.fill();

          // Central table facet (inner flat diamond reflection)
          ctx.fillStyle = c.baseHex;
          ctx.beginPath();
          ctx.arc(-r * 0.08, -r * 0.08, r * 0.42, 0, Math.PI * 2);
          ctx.fill();

          // Glinting specular spot
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.beginPath();
          ctx.arc(-r * 0.28, -r * 0.28, r * 0.18, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle glint on placement or occasional ambient twinkle
          if (c.sparkleTimer > 0) {
            c.sparkleTimer--;
            const sSize = r * (1.2 + Math.sin(c.sparkleTimer * 0.4) * 0.4);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-sSize, 0);
            ctx.lineTo(sSize, 0);
            ctx.moveTo(0, -sSize);
            ctx.lineTo(0, sSize);
            ctx.stroke();
          } else if ((c.x * 13 + c.y * 7 + Math.floor(time * 2)) % 450 === 0) {
            // Ambient soft twinkle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(-r * 0.25, -r * 0.25, r * 0.25, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [artwork, speed, isPaused, getSpeedParams, isDone, onComplete, onProgress]);

  // Click on canvas to interactively place diamonds!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const cellW = canvas.width / artwork.width;
    const cellH = canvas.height / artwork.height;
    const gx = Math.floor(clickX / cellW);
    const gy = Math.floor(clickY / cellH);

    // Place a circle cluster around click
    const radius = 3;
    let placedAny = false;
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const targetX = gx + dx;
          const targetY = gy + dy;
          if (targetX >= 0 && targetX < artwork.width && targetY >= 0 && targetY < artwork.height) {
            const index = targetY * artwork.width + targetX;
            const cell = cellsRef.current[index];
            if (cell && !cell.placed) {
              cell.placed = true;
              cell.scale = 1.4;
              cell.sparkleTimer = 16;
              placedAny = true;
              // Remove from unplaced
              const uIdx = unplacedIndicesRef.current.indexOf(index);
              if (uIdx !== -1) unplacedIndicesRef.current.splice(uIdx, 1);
            }
          }
        }
      }
    }

    if (placedAny) {
      soundEngine.playDiamondSnap(5);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        onClick={handleCanvasClick}
        className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-purple-950/40 border border-purple-800/20 cursor-pointer transition-transform duration-300 active:scale-[0.998]"
      />
    </div>
  );
};
