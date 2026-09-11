/**
 * Shyfoxie's Dream Studio - Floating Interaction Particles Overlay
 * Renders floating hearts, rose petals, purple stardust, and celebratory gift emojis across the screen.
 */

import React, { useEffect, useState } from 'react';
import { FloatingParticle } from '../types';
import { interactionEngine } from '../services/interactionEngine';

export const InteractionParticlesOverlay: React.FC = () => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const unsub = interactionEngine.subscribeParticles((newParticle) => {
      setParticles((prev) => [...prev.slice(-35), newParticle]);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life + 1,
            opacity: Math.max(0, 1 - p.life / p.maxLife),
          }))
          .filter((p) => p.life < p.maxLife)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [particles.length]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none transition-transform duration-75 ease-linear pointer-events-none"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            filter: p.color ? `drop-shadow(0 0 8px ${p.color})` : undefined,
          }}
        >
          {p.emoji || '✨'}
        </div>
      ))}
    </div>
  );
};
