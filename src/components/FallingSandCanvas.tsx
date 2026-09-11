/**
 * Shyfoxie's Dream Studio - Mode 2: Falling Sand Art Canvas
 * Colored sand grains fall naturally from above and settle to form a soothing, beautiful sand painting.
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
  isShaking: boolean;
  onShakeTriggered: () => void;
}

interface SandGrain {
  x: number;
  y: number;
  targetCol: number;
  targetRow: number;
  r: number;
  g: number;
  b: number;
  vy: number;
  vx: number;
  settled: boolean;
}

export const FallingSandCanvas: React.FC<Props> = ({
  artwork,
  speed,
  isPaused,
  onProgress,
  onComplete,
  isShaking,
  onShakeTriggered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const activeGrainsRef = useRef<SandGrain[]>([]);
  // 2D grid of settled sand colors [row][col] = { r, g, b } | null
  const settledGridRef = useRef<({ r: number; g: number; b: number } | null)[][]>([]);
  // Target color map from artwork
  const targetMapRef = useRef<{ r: number; g: number; b: number }[][]>([]);
  const colHeightsRef = useRef<number[]>([]); // Current settled height per column (0 = empty, height = full)
  const progressReportRef = useRef<number>(0);
  const [isDone, setIsDone] = useState(false);

  const getSpeedParams = useCallback(() => {
    switch (speed) {
      case 'sleep':
        return { pourRate: 2, speedY: 3.5 };
      case 'normal':
        return { pourRate: 5, speedY: 5.5 };
      case 'fast':
        return { pourRate: 14, speedY: 8.5 };
      case 'turbo':
        return { pourRate: 35, speedY: 12.0 };
    }
  }, [speed]);

  // Initialize sand target grid from artwork
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
    const targetMap: { r: number; g: number; b: number }[][] = [];
    const settledGrid: ({ r: number; g: number; b: number } | null)[][] = [];

    for (let y = 0; y < h; y++) {
      const targetRow: { r: number; g: number; b: number }[] = [];
      const settledRow: ({ r: number; g: number; b: number } | null)[] = [];
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        targetRow.push({
          r: imgData.data[idx],
          g: imgData.data[idx + 1],
          b: imgData.data[idx + 2]
        });
        settledRow.push(null);
      }
      targetMap.push(targetRow);
      settledGrid.push(settledRow);
    }

    targetMapRef.current = targetMap;
    settledGridRef.current = settledGrid;
    colHeightsRef.current = new Array(w).fill(0);
    activeGrainsRef.current = [];
    progressReportRef.current = 0;
    setIsDone(false);

    onProgress({
      placedCount: 0,
      totalCount: w * h,
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
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            if (targetMapRef.current[y] && targetMapRef.current[y][x]) {
              targetMapRef.current[y][x] = {
                r: freshData.data[idx],
                g: freshData.data[idx + 1],
                b: freshData.data[idx + 2]
              };
            }
          }
        }
      }
    });

    return () => {
      unsubLoaded();
    };
  }, [artwork, onProgress]);

  // Compaction & settle loose sand on SHAKE
  const applyShakeCompaction = useCallback(() => {
    const w = artwork.width;
    const h = artwork.height;
    const targetMap = targetMapRef.current;
    const settledGrid = settledGridRef.current;
    const colHeights = colHeightsRef.current;

    // Settle all mid-air grains immediately to column tops
    activeGrainsRef.current.forEach(grain => {
      const col = grain.targetCol;
      if (col >= 0 && col < w) {
        const curH = colHeights[col];
        if (curH < h) {
          const targetY = h - 1 - curH;
          settledGrid[targetY][col] = targetMap[targetY][col];
          colHeights[col] = curH + 1;
        }
      }
    });
    activeGrainsRef.current = [];

    // Smooth adjacent columns so dunes level out
    for (let c = 0; c < w - 1; c++) {
      const diff = colHeights[c] - colHeights[c + 1];
      if (Math.abs(diff) > 2) {
        if (diff > 0 && colHeights[c + 1] < h) {
          const targetY = h - 1 - colHeights[c + 1];
          settledGrid[targetY][c + 1] = targetMap[targetY][c + 1];
          colHeights[c + 1]++;
        } else if (diff < 0 && colHeights[c] < h) {
          const targetY = h - 1 - colHeights[c];
          settledGrid[targetY][c] = targetMap[targetY][c];
          colHeights[c]++;
        }
      }
    }
  }, [artwork.width, artwork.height]);

  useEffect(() => {
    if (isShaking) {
      applyShakeCompaction();
    }
  }, [isShaking, applyShakeCompaction]);

  // Subscribe to interaction engine
  useEffect(() => {
    const unsub = interactionEngine.subscribe((interaction) => {
      if (interaction.type === 'shake') {
        onShakeTriggered();
        applyShakeCompaction();
      } else if (interaction.type === 'like' || interaction.type === 'gift') {
        const count = interaction.type === 'gift' ? 80 : Math.min(40, interaction.amount * 4);
        // Spawn sand waterfall in random column clusters
        const w = artwork.width;
        const h = artwork.height;
        const colHeights = colHeightsRef.current;
        const targetMap = targetMapRef.current;

        for (let i = 0; i < count; i++) {
          const col = Math.floor(Math.random() * w);
          const curH = colHeights[col];
          if (curH < h) {
            const targetY = h - 1 - curH;
            const color = targetMap[targetY]?.[col] || { r: 240, g: 200, b: 100 };
            activeGrainsRef.current.push({
              x: col + (Math.random() - 0.5) * 0.4,
              y: -Math.random() * 5,
              targetCol: col,
              targetRow: targetY,
              r: color.r,
              g: color.g,
              b: color.b,
              vy: 7 + Math.random() * 4,
              vx: (Math.random() - 0.5) * 0.3,
              settled: false
            });
          }
        }
      }
    });

    return () => unsub();
  }, [artwork.width, artwork.height, onShakeTriggered, applyShakeCompaction]);

  // Main Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      frameCount++;

      const w = artwork.width;
      const h = artwork.height;
      const targetMap = targetMapRef.current;
      const settledGrid = settledGridRef.current;
      const colHeights = colHeightsRef.current;
      const activeGrains = activeGrainsRef.current;
      const { pourRate, speedY } = getSpeedParams();

      // Pour new sand grains if not paused and not all columns full
      if (!isPaused && targetMap.length > 0) {
        // Pick random unfinished columns
        const unfinishedCols: number[] = [];
        for (let c = 0; c < w; c++) {
          if (colHeights[c] < h) unfinishedCols.push(c);
        }

        if (unfinishedCols.length > 0) {
          const spawnCount = Math.min(unfinishedCols.length, pourRate);
          for (let i = 0; i < spawnCount; i++) {
            const col = unfinishedCols[Math.floor(Math.random() * unfinishedCols.length)];
            const curH = colHeights[col];
            const targetY = h - 1 - curH;
            const targetColor = targetMap[targetY][col];

            activeGrains.push({
              x: col + (Math.random() - 0.5) * 0.5,
              y: -Math.random() * 3,
              targetCol: col,
              targetRow: targetY,
              r: targetColor.r,
              g: targetColor.g,
              b: targetColor.b,
              vy: speedY * (0.85 + Math.random() * 0.3),
              vx: (Math.random() - 0.5) * 0.2,
              settled: false
            });
          }

          if (frameCount % 4 === 0) {
            soundEngine.playSandGrain();
          }
        }
      }

      // Update falling sand physics
      const remainingGrains: SandGrain[] = [];
      for (let i = 0; i < activeGrains.length; i++) {
        const g = activeGrains[i];
        g.y += g.vy * 0.18;
        g.x += g.vx;

        const col = Math.round(g.x);
        const validCol = Math.max(0, Math.min(w - 1, col));
        const curHeight = colHeights[validCol] || 0;
        const targetGroundY = h - curHeight;

        if (g.y >= targetGroundY) {
          // Settled!
          if (curHeight < h) {
            const row = h - 1 - curHeight;
            settledGrid[row][validCol] = { r: g.r, g: g.g, b: g.b };
            colHeights[validCol]++;
          }
        } else {
          remainingGrains.push(g);
        }
      }
      activeGrainsRef.current = remainingGrains;

      // Calculate progress
      let totalSettled = 0;
      for (let c = 0; c < w; c++) {
        totalSettled += colHeights[c];
      }
      const totalCapacity = w * h;
      const percentage = Math.min(100, Math.round((totalSettled / totalCapacity) * 100));

      if (Math.abs(percentage - progressReportRef.current) >= 1 || totalSettled >= totalCapacity) {
        progressReportRef.current = percentage;
        onProgress({
          placedCount: totalSettled,
          totalCount: totalCapacity,
          percentage,
          isCompleted: totalSettled >= totalCapacity
        });
      }

      if (totalSettled >= totalCapacity && !isDone) {
        setIsDone(true);
        soundEngine.playMasterpieceCelebration();
        onComplete();
      }

      // Draw canvas
      const width = canvas.width;
      const height = canvas.height;
      const cellW = width / w;
      const cellH = height / h;

      // Elegant glass terrarium background
      ctx.fillStyle = '#080712';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric dune texture & guidelines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y * cellH, width, 1);
      }

      // Draw settled sand
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const color = settledGrid[y][x];
          if (color) {
            const rx = x * cellW;
            const ry = y * cellH;

            // Sand grain with tiny texture speckle
            ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            ctx.fillRect(rx, ry, cellW + 0.3, cellH + 0.3);

            // Subtle sand grain highlight
            if ((x * 3 + y * 7) % 5 === 0) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
              ctx.fillRect(rx, ry, cellW * 0.5, cellH * 0.5);
            }
          }
        }
      }

      // Draw falling sand streams
      for (let i = 0; i < remainingGrains.length; i++) {
        const g = remainingGrains[i];
        const gx = g.x * cellW;
        const gy = g.y * cellH;
        const grainSize = Math.max(cellW * 0.9, 3);

        ctx.fillStyle = `rgb(${g.r}, ${g.g}, ${g.b})`;
        ctx.beginPath();
        ctx.arc(gx, gy, grainSize * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing grain glint
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(gx - 1, gy - 1, grainSize * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [artwork, speed, isPaused, getSpeedParams, isDone, onComplete, onProgress]);

  // Click on canvas pours sand directly at that point!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const col = Math.floor(clickX / (canvas.width / artwork.width));

    const w = artwork.width;
    const h = artwork.height;
    const targetMap = targetMapRef.current;
    const colHeights = colHeightsRef.current;

    for (let c = Math.max(0, col - 2); c <= Math.min(w - 1, col + 2); c++) {
      const curH = colHeights[c];
      if (curH < h) {
        const targetY = h - 1 - curH;
        const color = targetMap[targetY]?.[c] || { r: 250, g: 210, b: 120 };
        activeGrainsRef.current.push({
          x: c + (Math.random() - 0.5) * 0.4,
          y: 0,
          targetCol: c,
          targetRow: targetY,
          r: color.r,
          g: color.g,
          b: color.b,
          vy: 8 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 0.2,
          settled: false
        });
      }
    }
    soundEngine.playSandGrain();
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${isShaking ? 'animate-sand-shake' : ''}`}>
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        onClick={handleCanvasClick}
        className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-purple-950/40 border border-amber-500/20 cursor-pointer"
      />
    </div>
  );
};
