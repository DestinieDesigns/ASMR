/**
 * Shyfoxie's Dream Studio - Layered Scene Procedural Generator
 * Produces rich, complete 16:9 illustrated scenes with distinct foreground, middle-ground,
 * and background layers so viewers can enjoy suspenseful, gradual reveals across Sand, Diamond, and Bubble modes.
 */

export function createOffscreen(w: number = 96, h: number = 54): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  return [canvas, ctx];
}

export interface LayeredSceneConfig {
  w?: number;
  h?: number;
  // Background
  skyStops: [number, string][];
  stars?: boolean;
  celestial?: {
    type: 'moon' | 'sun' | 'planet' | 'eclipse';
    x: number;
    y: number;
    r: number;
    color: string;
    glowColor?: string;
    rings?: boolean;
  };
  aurora?: string[];
  nebula?: { x: number; y: number; r: number; color: string }[];
  lightning?: boolean;
  rain?: boolean;

  // Middle ground
  horizonY: number;
  terrainStops: [number, string][];
  mountains?: { x: number; y: number; w: number; h: number; color: string; snow?: boolean }[];
  waterReflect?: boolean;
  clouds?: { x: number; y: number; r: number; color: string }[];
  structures?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

  // Focal subject & storytelling
  focal: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

  // Foreground & atmosphere
  foreground?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  particles?: { x: number; y: number; r: number; color: string }[];
}

export function generateLayeredScene(cfg: LayeredSceneConfig): ImageData {
  const w = cfg.w || 96;
  const h = cfg.h || 54;
  const [canvas, ctx] = createOffscreen(w, h);

  // 1. BACKGROUND SKY / SPACE / INTERIOR WALL
  const skyGrad = ctx.createLinearGradient(0, 0, 0, cfg.horizonY);
  cfg.skyStops.forEach(([pos, col]) => skyGrad.addColorStop(pos, col));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, cfg.horizonY);

  // Aurora ribbons
  if (cfg.aurora && cfg.aurora.length > 0) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    cfg.aurora.forEach((auroraColor, i) => {
      ctx.fillStyle = auroraColor;
      ctx.beginPath();
      ctx.moveTo(0, cfg.horizonY * 0.4 + i * 3);
      for (let x = 0; x <= w; x += 8) {
        const wave = Math.sin(x * 0.1 + i) * 6 + Math.cos(x * 0.05) * 4;
        ctx.lineTo(x, cfg.horizonY * 0.3 + wave + i * 2);
      }
      ctx.lineTo(w, 0);
      ctx.lineTo(0, 0);
      ctx.fill();
    });
    ctx.restore();
  }

  // Nebula clouds
  if (cfg.nebula) {
    cfg.nebula.forEach((neb) => {
      const g = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
      g.addColorStop(0, neb.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(neb.x, neb.y, neb.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Stars
  if (cfg.stars) {
    ctx.fillStyle = '#ffffff';
    // Deterministic pseudo-random stars based on horizon
    for (let i = 0; i < 45; i++) {
      const sx = (i * 37) % w;
      const sy = (i * 19) % Math.max(8, cfg.horizonY - 2);
      const sz = i % 7 === 0 ? 1.5 : 1;
      ctx.fillRect(sx, sy, sz, sz);
    }
  }

  // Celestial (Moon, Sun, Planets)
  if (cfg.celestial) {
    const c = cfg.celestial;
    if (c.glowColor) {
      const glow = ctx.createRadialGradient(c.x, c.y, c.r * 0.5, c.x, c.y, c.r * 2.2);
      glow.addColorStop(0, c.glowColor);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();

    if (c.type === 'eclipse') {
      ctx.fillStyle = '#090715';
      ctx.beginPath();
      ctx.arc(c.x + 2, c.y, c.r * 0.95, 0, Math.PI * 2);
      ctx.fill();
    } else if (c.rings) {
      ctx.save();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r * 2.2, c.r * 0.6, -0.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Lightning
  if (cfg.lightning) {
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(w * 0.6, 2);
    ctx.lineTo(w * 0.55, cfg.horizonY * 0.35);
    ctx.lineTo(w * 0.62, cfg.horizonY * 0.45);
    ctx.lineTo(w * 0.52, cfg.horizonY * 0.85);
    ctx.stroke();
  }

  // Distant Mountains
  if (cfg.mountains) {
    cfg.mountains.forEach((m) => {
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.moveTo(m.x - m.w * 0.5, cfg.horizonY);
      ctx.lineTo(m.x, m.y);
      ctx.lineTo(m.x + m.w * 0.5, cfg.horizonY);
      ctx.fill();

      if (m.snow) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(m.x - m.w * 0.2, m.y + (cfg.horizonY - m.y) * 0.35);
        ctx.lineTo(m.x, m.y);
        ctx.lineTo(m.x + m.w * 0.2, m.y + (cfg.horizonY - m.y) * 0.35);
        ctx.fill();
      }
    });
  }

  // Clouds
  if (cfg.clouds) {
    cfg.clouds.forEach((c) => {
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.arc(c.x + c.r * 0.7, c.y - c.r * 0.2, c.r * 0.8, 0, Math.PI * 2);
      ctx.arc(c.x - c.r * 0.7, c.y + c.r * 0.1, c.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // 2. MIDDLE GROUND TERRAIN / WATER
  const groundGrad = ctx.createLinearGradient(0, cfg.horizonY, 0, h);
  cfg.terrainStops.forEach(([pos, col]) => groundGrad.addColorStop(pos, col));
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, cfg.horizonY, w, h - cfg.horizonY);

  // Water reflection shimmer
  if (cfg.waterReflect && cfg.celestial) {
    ctx.fillStyle = cfg.celestial.color;
    ctx.save();
    ctx.globalAlpha = 0.45;
    for (let y = cfg.horizonY; y < h; y += 2) {
      const spread = (y - cfg.horizonY) * 0.8;
      ctx.fillRect(cfg.celestial.x - spread, y, spread * 2, 1);
    }
    ctx.restore();
  }

  // Structures / Castles / Trees / Background architecture
  if (cfg.structures) {
    cfg.structures(ctx, w, h);
  }

  // Rain lines
  if (cfg.rain) {
    ctx.strokeStyle = '#93c5fd';
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 1;
    for (let i = 0; i < 35; i++) {
      const rx = (i * 29) % w;
      const ry = (i * 17) % h;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 3, ry + 7);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
  }

  // 3. FOCAL CHARACTER / SUBJECT
  cfg.focal(ctx, w, h);

  // 4. FOREGROUND LAYER (Lush foliage, flowers, shoreline, window frame, etc.)
  if (cfg.foreground) {
    cfg.foreground(ctx, w, h);
  }

  // Floating particles (fireflies, glowing sparkles, dust motes)
  if (cfg.particles) {
    cfg.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  return ctx.getImageData(0, 0, w, h);
}
