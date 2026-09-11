/**
 * Shyfoxie's Dream Studio - Central Interaction Engine
 * Handles stream platform interactions (Twitch, TikTok, Test Events) and routes them to active visual modes.
 */

import { StreamInteraction, FloatingParticle } from '../types';
import { soundEngine } from './audioEngine';

type InteractionListener = (interaction: StreamInteraction) => void;
type ParticleListener = (particle: FloatingParticle) => void;

class InteractionEngine {
  private listeners: Set<InteractionListener> = new Set();
  private particleListeners: Set<ParticleListener> = new Set();
  private history: StreamInteraction[] = [];

  public subscribe(listener: InteractionListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeParticles(listener: ParticleListener): () => void {
    this.particleListeners.add(listener);
    return () => {
      this.particleListeners.delete(listener);
    };
  }

  public receiveInteraction(interaction: Omit<StreamInteraction, 'id' | 'timestamp'>) {
    const fullInteraction: StreamInteraction = {
      ...interaction,
      id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now()
    };

    this.history.unshift(fullInteraction);
    if (this.history.length > 50) this.history.pop();

    // Trigger audio & visual effects based on event
    if (fullInteraction.type === 'gift' && fullInteraction.giftType) {
      soundEngine.playGiftSound(fullInteraction.giftType);
      this.spawnGiftParticles(fullInteraction.giftType, fullInteraction.amount || 1);
    } else if (fullInteraction.type === 'like') {
      // Spawn floating heart particles
      const count = Math.min(15, Math.max(1, Math.round(fullInteraction.amount / 2)));
      for (let i = 0; i < count; i++) {
        this.spawnHeartParticle();
      }
    } else if (fullInteraction.type === 'shake') {
      soundEngine.playSandShake();
    }

    // Notify all active mode listeners
    this.listeners.forEach(fn => {
      try {
        fn(fullInteraction);
      } catch (err) {
        console.error('Interaction listener error:', err);
      }
    });
  }

  private spawnHeartParticle() {
    const p: FloatingParticle = {
      id: `p-${Math.random()}`,
      x: window.innerWidth * (0.35 + Math.random() * 0.3),
      y: window.innerHeight * 0.85 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 2,
      vy: -2 - Math.random() * 3,
      emoji: Math.random() > 0.4 ? '❤️' : '✨',
      size: 18 + Math.random() * 12,
      opacity: 1,
      life: 0,
      maxLife: 60 + Math.random() * 30
    };
    this.particleListeners.forEach(fn => fn(p));
  }

  private spawnGiftParticles(giftType: string, count: number) {
    let emoji = '🌹';
    let color = '#f43f5e';
    if (giftType === 'heart') {
      emoji = '💜';
      color = '#a855f7';
    } else if (giftType === 'flower') {
      emoji = '🌸';
      color = '#ec4899';
    } else if (giftType === 'big_gift') {
      emoji = '🎁';
      color = '#eab308';
    }

    const total = Math.min(25, 6 + count * 2);
    for (let i = 0; i < total; i++) {
      const p: FloatingParticle = {
        id: `gift-${Math.random()}`,
        x: window.innerWidth * (0.25 + Math.random() * 0.5),
        y: window.innerHeight * 0.75 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 4,
        vy: -3 - Math.random() * 4,
        emoji,
        color,
        size: 22 + Math.random() * 16,
        opacity: 1,
        life: 0,
        maxLife: 75 + Math.random() * 35
      };
      this.particleListeners.forEach(fn => fn(p));
    }
  }

  public getRecentInteractions(): StreamInteraction[] {
    return [...this.history];
  }
}

export const interactionEngine = new InteractionEngine();
