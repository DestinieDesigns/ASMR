/**
 * Shyfoxie's Dream Studio - Ambient Cozy Background
 * Subtle twinkling starlight, gentle floating orbs, and cozy atmospheric glow.
 */

import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stardust particles
    const stars: { x: number; y: number; size: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 65; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 1.5,
        speed: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const time = performance.now() * 0.001;

      // Draw subtle twinkling stardust
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        const alpha = 0.2 + Math.sin(time * 1.5 + s.phase) * 0.18;
        ctx.fillStyle = `rgba(224, 231, 255, ${Math.max(0.05, alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-[#090715]">
      {/* Soft atmospheric gradient orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/15 blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-indigo-900/15 blur-[140px]" />
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-pink-900/10 blur-[100px]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
