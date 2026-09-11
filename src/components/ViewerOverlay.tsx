/**
 * Shyfoxie's Dream Studio - Viewer Overlay
 * Ultra-clean, non-intrusive stream interface focusing 80% attention on the evolving artwork.
 */

import React, { useEffect, useState } from 'react';
import { ArtMode, Artwork, CanvasArtProgress, SpeedSetting } from '../types';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Wand2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Zap,
  Grid,
  X,
  Search,
} from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { artworkCategoriesList } from '../services/artworkData';

interface Props {
  mode: ArtMode;
  artwork: Artwork;
  currentArtworkIndex?: number;
  totalArtworksCount?: number;
  artworks?: Artwork[];
  speed?: SpeedSetting;
  autoCycle?: boolean;
  isPaused?: boolean;
  onTogglePause?: () => void;
  onToggleAutoCycle?: () => void;
  onNextArtwork?: () => void;
  onPrevArtwork?: () => void;
  onShuffleArtwork?: () => void;
  onChangeSpeed?: (speed: SpeedSetting) => void;
  onSelectArtworkIndex?: (index: number) => void;
  onOpenAdmin: () => void;
  onTriggerShake?: () => void;
  streamModeOnly: boolean;
  mysteryMode?: boolean;
}

const MESSAGES_BY_MODE: Record<ArtMode, string[]> = {
  diamond: [
    'One tiny diamond at a time...',
    'A little magic finds its place ✦',
    'Watch the picture come alive...',
    'Something beautiful is taking shape...',
    'Every sparkle tells a story ✨',
  ],
  sand: [
    'Watch the colors fall into place...',
    'Every grain creates something beautiful...',
    'Soothing natural grains settling down...',
    'Keep watching as the dunes form...',
  ],
  bubble: [
    'Pop by pop, the picture appears!',
    'Something magical is hiding underneath...',
    'Gentle bubbles floating away...',
    'Click or tap to pop with us 🫧',
  ],
};

export const ViewerOverlay: React.FC<Props> = ({
  mode,
  artwork,
  progress,
  currentArtworkIndex = 0,
  totalArtworksCount = 100,
  artworks = [],
  speed = 'normal',
  autoCycle = true,
  isPaused = false,
  onTogglePause,
  onToggleAutoCycle,
  onNextArtwork,
  onPrevArtwork,
  onShuffleArtwork,
  onChangeSpeed,
  onSelectArtworkIndex,
  onOpenAdmin,
  onTriggerShake,
  streamModeOnly,
  mysteryMode = true,
}) => {
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Rotate encouraging messages smoothly every 10 seconds
  useEffect(() => {
    const messages = MESSAGES_BY_MODE[mode];
    const interval = setInterval(() => {
      setCurrentMsgIdx((prev) => (prev + 1) % messages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [mode]);

  const toggleMute = () => {
    soundEngine.unlock();
    const nextMuted = !isMuted;
    soundEngine.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCycleSpeed = () => {
    if (!onChangeSpeed) return;
    const order: SpeedSetting[] = ['normal', 'fast', 'turbo', 'sleep'];
    const currentIdx = order.indexOf(speed as SpeedSetting);
    const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % order.length;
    const nextSpeed: SpeedSetting = order[nextIdx] ?? 'normal';
    onChangeSpeed(nextSpeed);
  };

  const filteredGalleryArtworks = artworks.filter((art) => {
    const matchesCat = galleryCategory === 'all' || art.category === galleryCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(art.number || '').includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const modeBadge =
    mode === 'diamond'
      ? { label: 'DIAMOND PAINTING', icon: '💎', color: 'border-purple-400/40 text-purple-200' }
      : mode === 'sand'
      ? { label: 'FALLING SAND', icon: '🏺', color: 'border-amber-400/40 text-amber-200' }
      : { label: 'POP THE ART', icon: '🫧', color: 'border-pink-400/40 text-pink-200' };

  // Circular progress stroke calculation
  const circleRadius = 24;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress.percentage / 100) * circumference;

  // Mystery Dream calculations
  const isMysteryActive = (mysteryMode || artwork.isMystery) && progress.percentage < 100;
  const isRevealed = (mysteryMode || artwork.isMystery) && progress.percentage >= 100;

  // Active clue based on 25%, 50%, 75% milestones
  const activeClue = React.useMemo(() => {
    if (!artwork.clues || artwork.clues.length === 0) return null;
    if (progress.percentage >= 75) {
      return artwork.clues.find((c) => c.atPercentage === 75) || artwork.clues[2] || artwork.clues[artwork.clues.length - 1];
    } else if (progress.percentage >= 50) {
      return artwork.clues.find((c) => c.atPercentage === 50) || artwork.clues[1] || artwork.clues[0];
    } else if (progress.percentage >= 25) {
      return artwork.clues.find((c) => c.atPercentage === 25) || artwork.clues[0];
    }
    return null;
  }, [artwork.clues, progress.percentage]);

  const displayedTitle = isMysteryActive
    ? artwork.number
      ? `❓ Mystery Dream #${artwork.number} ❓`
      : '❓ MYSTERY DREAM ❓'
    : artwork.name;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-5 md:p-8 z-10 select-none">
      {/* Top Header: Brand & Mode/Artwork pill */}
      <div className="flex items-start justify-between w-full">
        {/* Shyfoxie Branding */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 animate-pulse text-sm">✦</span>
            <h1 className="text-lg md:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 drop-shadow-md">
              SHYFOXIE'S DREAM STUDIO
            </h1>
            <span className="text-yellow-300 animate-pulse text-sm">✦</span>
          </div>
          <p className="text-xs text-purple-300/70 font-medium tracking-wide pl-4">
            Watch something beautiful slowly come to life
          </p>
        </div>

        {/* Current Mode & Masterpiece Title Pill */}
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2.5">
          {/* Mystery Mode Clue Banner */}
          {(mysteryMode || artwork.isMystery) && (
            <div className="animate-fade-in">
              {progress.percentage >= 100 ? (
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs font-semibold shadow-lg flex items-center gap-2">
                  <span>🎉</span>
                  <span className="text-white font-bold">{artwork.name}</span>
                  <span className="text-[10px] text-emerald-300 uppercase tracking-wider">Revealed!</span>
                </div>
              ) : activeClue ? (
                <div className="px-3.5 py-1.5 rounded-full bg-amber-950/70 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs shadow-lg flex items-center gap-2">
                  <span className="text-amber-300">💡</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-[10px] font-bold text-amber-200 uppercase">
                    Clue @ {activeClue.atPercentage}%
                  </span>
                  <span className="text-white font-medium italic">
                    "{activeClue.clueText}"
                  </span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-purple-950/60 backdrop-blur-md border border-purple-500/30 text-purple-200 text-[11px] shadow flex items-center gap-1.5">
                  <span>👀</span>
                  <span>Guess the artwork! Clue 1 at 25%</span>
                </div>
              )}
            </div>
          )}

          <div
            className={`px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border ${
              isMysteryActive ? 'border-amber-400/50 shadow-amber-900/30' : modeBadge.color
            } shadow-lg flex items-center gap-2.5 transition-all`}
          >
            <span className="text-base">{isMysteryActive ? '❓' : modeBadge.icon}</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider opacity-75 uppercase">
                {isMysteryActive ? 'GUESS IN CHAT' : modeBadge.label}
              </span>
              <span
                className={`text-xs font-bold tracking-wide truncate max-w-[160px] md:max-w-[220px] ${
                  isMysteryActive ? 'text-amber-200 animate-pulse' : 'text-white'
                }`}
              >
                {displayedTitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Encouraging message, Center Auto-Play Controller, Circular Progress, and Tools */}
      <div className="flex items-end justify-between w-full gap-3">
        {/* Left: Encouraging Message & Shake prompt */}
        <div className="flex flex-col gap-2 max-w-xs md:max-w-sm hidden sm:flex">
          <div className="px-3.5 py-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-purple-500/20 text-xs text-purple-200/90 shadow-lg flex items-center gap-2 animate-fade-in transition-all">
            <Sparkles className="w-3.5 h-3.5 text-pink-300 shrink-0" />
            <span className="italic truncate">{MESSAGES_BY_MODE[mode][currentMsgIdx]}</span>
          </div>

          {/* Viewer Shake button when in Falling Sand mode */}
          {mode === 'sand' && onTriggerShake && (
            <button
              onClick={onTriggerShake}
              className="pointer-events-auto self-start px-3 py-1 rounded-full bg-amber-950/60 hover:bg-amber-900/80 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Shake the sand container to compact dunes"
            >
              <span>🏺 Shake Sand</span>
              <span className="text-[10px] opacity-75">(!shake)</span>
            </button>
          )}
        </div>

        {/* Center: Auto-Play 100 Designs Controller Pill */}
        {!streamModeOnly && (
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-purple-500/40 shadow-xl shadow-purple-950/50">
            {/* Quick 100 Gallery Trigger */}
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-2.5 py-1 rounded-full bg-purple-900/50 hover:bg-purple-800/70 border border-pink-400/40 text-pink-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
              title="Browse all 100 designs"
            >
              <Grid className="w-3.5 h-3.5 text-pink-300" />
              <span>#{artwork.number || currentArtworkIndex + 1}/{totalArtworksCount}</span>
            </button>

            {/* Prev Artwork */}
            {onPrevArtwork && (
              <button
                onClick={onPrevArtwork}
                className="p-1.5 rounded-full bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 hover:text-white transition-all cursor-pointer"
                title="Previous Design (P)"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Auto-Play Cycle Toggle */}
            {onToggleAutoCycle && (
              <button
                onClick={onToggleAutoCycle}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  autoCycle
                    ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-200 shadow-sm'
                    : 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
                }`}
                title={autoCycle ? 'Auto-play is active (auto-advances after completion)' : 'Auto-play is paused'}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    autoCycle ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="hidden md:inline">Auto-Play</span>
                <span className="font-bold">{autoCycle ? 'ON' : 'OFF'}</span>
              </button>
            )}

            {/* Next Artwork */}
            {onNextArtwork && (
              <button
                onClick={onNextArtwork}
                className="p-1.5 rounded-full bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 hover:text-white transition-all cursor-pointer"
                title="Next Design (N)"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Shuffle */}
            {onShuffleArtwork && (
              <button
                onClick={onShuffleArtwork}
                className="p-1.5 rounded-full bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 hover:text-white transition-all cursor-pointer"
                title="Shuffle Random Design (R)"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Speed Quick Switcher */}
            {onChangeSpeed && (
              <button
                onClick={handleCycleSpeed}
                className="px-2 py-1 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-700/50 text-[11px] font-bold text-pink-300 flex items-center gap-1 cursor-pointer transition-all"
                title="Cycle creation speed: Cozy / Fast / Turbo / Sleep"
              >
                <Zap className="w-3 h-3 text-yellow-300" />
                <span className="capitalize">{speed}</span>
              </button>
            )}
          </div>
        )}

        {/* Right side: Circular progress & Tools */}
        <div className="flex items-center gap-3">
          {/* Circular Glowing Progress Indicator */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
            <svg className="w-14 h-14 md:w-16 md:h-16 -rotate-90 transform" viewBox="0 0 60 60">
              {/* Background circle */}
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="4"
                fill="transparent"
              />
              {/* Animated Glowing progress ring */}
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                stroke="url(#progressGrad)"
                strokeWidth="4.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs md:text-sm font-bold text-white tracking-tight leading-none">
                {progress.percentage}%
              </span>
              <span className="text-[7px] md:text-[8px] text-purple-300/80 uppercase font-semibold leading-none mt-0.5">
                done
              </span>
            </div>
          </div>

          {/* Discreet audio & screen controls */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-purple-500/30 text-purple-200 hover:text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title={isMuted ? 'Unmute ASMR Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-purple-500/30 text-purple-200 hover:text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Admin / Streamer Settings button */}
            {!streamModeOnly && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-full bg-purple-900/50 hover:bg-purple-800/70 backdrop-blur-md border border-purple-400/40 text-pink-200 hover:text-white shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer group"
                title="Streamer / Admin Controls"
              >
                <Wand2 className="w-4 h-4 text-yellow-300 group-hover:rotate-12 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 100-Design Quick Gallery Modal (Standard HTML/CSS overlay) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#120f26] border border-purple-500/40 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎨</span>
                <div>
                  <h2 className="text-lg font-bold text-white">100 Magical Artwork Designs</h2>
                  <p className="text-xs text-purple-300/70">
                    Select any design to play immediately or let them auto-play in sequence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 rounded-full hover:bg-purple-900/50 text-purple-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Category Pills */}
            <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                {artworkCategoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setGalleryCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                      galleryCategory === cat.id
                        ? 'bg-pink-600/40 text-pink-200 border border-pink-400/50'
                        : 'bg-purple-950/40 text-purple-300/80 border border-purple-800/30 hover:bg-purple-900/30'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search 100 designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            {/* 100 Designs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 overflow-y-auto pr-1 flex-1 max-h-[55vh]">
              {filteredGalleryArtworks.map((art) => {
                const isCurrent = art.id === artwork.id;
                const idx = artworks.findIndex((a) => a.id === art.id);
                return (
                  <button
                    key={art.id}
                    onClick={() => {
                      if (onSelectArtworkIndex && idx !== -1) {
                        onSelectArtworkIndex(idx);
                      }
                      setIsGalleryOpen(false);
                    }}
                    className={`p-2 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-pink-900/40 border-pink-400 shadow-md ring-1 ring-pink-400'
                        : 'bg-purple-950/30 border-purple-800/30 hover:bg-purple-900/40 hover:border-purple-600/50'
                    }`}
                  >
                    <div
                      className="w-full aspect-video rounded-xl overflow-hidden relative flex items-center justify-center shadow"
                      style={{ backgroundColor: art.thumbnailColor || '#a855f7' }}
                    >
                      {art.imageUrl ? (
                        <img
                          src={art.imageUrl}
                          alt={art.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white/90">#{art.number || '★'}</span>
                      )}
                      {isCurrent && (
                        <div className="absolute inset-0 bg-pink-900/60 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-bold">
                            Playing Now
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono font-bold text-pink-300">
                          #{art.number}
                        </span>
                        <p className="text-xs font-bold text-white truncate">{art.name}</p>
                      </div>
                      <p className="text-[10px] text-purple-300/60 capitalize truncate">
                        {art.category.replace('-', ' ')}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
