/**
 * Shyfoxie's Dream Studio - Celebration Overlay
 * Displays ✨ MASTERPIECE COMPLETE ✨ celebration banner, countdown timer, and celebratory confetti.
 */

import React, { useEffect, useState } from 'react';
import { ArtMode, Artwork } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  mode: ArtMode;
  artwork: Artwork;
  holdSeconds: number;
  autoCycle?: boolean;
  onNextArtwork: () => void;
}

export const CelebrationOverlay: React.FC<Props> = ({
  mode,
  artwork,
  holdSeconds,
  autoCycle = true,
  onNextArtwork,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(holdSeconds);

  useEffect(() => {
    setSecondsRemaining(holdSeconds);
  }, [holdSeconds]);

  useEffect(() => {
    if (!autoCycle) return;

    if (secondsRemaining <= 0) {
      onNextArtwork();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsRemaining, autoCycle, onNextArtwork]);

  const title = mode === 'bubble' ? '🎉 POP MASTERPIECE COMPLETE 🎉' : '✨ MASTERPIECE COMPLETE ✨';

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-8 z-30 transition-all duration-700 animate-fade-in">
      {/* Top celebratory banner */}
      <div className="mt-4 px-8 py-3.5 rounded-full bg-purple-950/80 backdrop-blur-md border border-pink-400/40 shadow-2xl shadow-pink-500/20 text-center flex items-center gap-3 animate-float pointer-events-auto">
        <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-xl md:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 drop-shadow">
          {title}
        </span>
        <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      {/* Bottom status & countdown pill */}
      <div className="mb-4 flex items-center gap-4 pointer-events-auto">
        <div className="px-6 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-purple-500/30 text-sm md:text-base text-purple-200/90 shadow-lg flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>
            {artwork.number ? <strong className="text-pink-300 mr-1.5 font-mono">#{artwork.number}</strong> : null}
            Admiring <strong className="text-white font-semibold">{artwork.name}</strong>
          </span>
          {autoCycle ? (
            <>
              <span className="text-purple-400">•</span>
              <span className="text-pink-300">
                Auto-playing next design in <strong className="font-bold text-white">{secondsRemaining}s</strong>
              </span>
            </>
          ) : (
            <>
              <span className="text-purple-400">•</span>
              <span className="text-amber-200">Auto-cycle paused</span>
            </>
          )}
        </div>

        {/* Skip wait button */}
        <button
          onClick={onNextArtwork}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-900/40 cursor-pointer transition-all hover:scale-105 active:scale-95"
          title="Jump to next artwork now"
        >
          <span>Next Masterpiece</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
