/**
 * Shyfoxie's Dream Studio - Streamer / Admin Mode Drawer
 * Comprehensive control panel for the streamer: mode switcher, artwork gallery, playback, test interactions, and stream configuration.
 */

import React, { useRef, useState } from 'react';
import { ArtMode, Artwork, SpeedSetting, StudioConfig } from '../types';
import { defaultArtworks, createCustomArtworkFromFile, artworkCategoriesList } from '../services/artworkLibrary';
import { interactionEngine } from '../services/interactionEngine';
import { soundEngine } from '../services/audioEngine';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Shuffle,
  Volume2,
  Sparkles,
  Upload,
  Radio,
  Clock,
  Heart,
  Gift,
  HelpCircle,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: StudioConfig;
  onUpdateConfig: (partial: Partial<StudioConfig>) => void;
  currentArtwork: Artwork;
  onSelectArtwork: (artwork: Artwork) => void;
  onRestartArtwork: () => void;
  onNextArtwork: () => void;
  onShuffleArtwork: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  onAddCustomArtwork: (art: Artwork) => void;
  artworks: Artwork[];
}

export const StreamerAdminDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  currentArtwork,
  onSelectArtwork,
  onRestartArtwork,
  onNextArtwork,
  onShuffleArtwork,
  isPaused,
  onTogglePause,
  onAddCustomArtwork,
  artworks,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filteredArtworks = artworks.filter((art) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'custom') return art.isCustom;
    return art.category === categoryFilter;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const newArt = await createCustomArtworkFromFile(file);
      onAddCustomArtwork(newArt);
      onSelectArtwork(newArt);
    } catch (err) {
      console.error('Failed to import custom art:', err);
    }
  };

  const triggerInteraction = (
    type: 'like' | 'gift' | 'shake' | 'chat',
    amount: number = 1,
    giftType?: 'rose' | 'heart' | 'flower' | 'big_gift'
  ) => {
    soundEngine.unlock();
    interactionEngine.receiveInteraction({
      type,
      amount,
      giftType,
      sender: 'StreamerTester',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in select-none">
      {/* Drawer Panel */}
      <div className="w-full max-w-md md:max-w-lg h-full bg-[#120f24] border-l border-purple-500/30 shadow-2xl p-6 overflow-y-auto flex flex-col gap-6 text-purple-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-400/30 text-yellow-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Streamer & Admin Control</h2>
              <p className="text-xs text-purple-300/70">Hidden from stream viewers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-700/40 text-purple-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Active Mode Selection */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-purple-300/80">
            Art Creation Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: 'diamond', label: 'Diamond Painting', icon: '💎' },
                { id: 'sand', label: 'Falling Sand', icon: '🏺' },
                { id: 'bubble', label: 'Bubble Pop', icon: '🫧' },
              ] as const
            ).map((m) => {
              const active = config.activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onUpdateConfig({ activeMode: m.id })}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    active
                      ? 'bg-purple-600/30 border-pink-400 text-white shadow-lg shadow-purple-900/40'
                      : 'bg-purple-950/40 border-purple-800/30 text-purple-300 hover:bg-purple-900/30'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-xs font-semibold">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Playback Controls */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-purple-300/80">
            Playback Controls
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={onTogglePause}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                isPaused
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                  : 'bg-purple-950/40 border-purple-700/40 text-purple-200 hover:bg-purple-900/40'
              }`}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              <span className="text-[11px] font-medium">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            <button
              onClick={onRestartArtwork}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-700/40 text-purple-200 flex flex-col items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-[11px] font-medium">Restart</span>
            </button>

            <button
              onClick={onNextArtwork}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-700/40 text-purple-200 flex flex-col items-center gap-1 transition-all cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
              <span className="text-[11px] font-medium">Next Art</span>
            </button>

            <button
              onClick={onShuffleArtwork}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-purple-700/40 text-purple-200 flex flex-col items-center gap-1 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span className="text-[11px] font-medium">Shuffle</span>
            </button>
          </div>
        </div>

        {/* Section 3: Creation Speed & Ambient Pace */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-purple-300/80">
            Speed & Vibe
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                { id: 'sleep', label: '🌙 Sleep/ASMR' },
                { id: 'normal', label: '☕ Cozy Normal' },
                { id: 'fast', label: '⚡ Fast Stream' },
                { id: 'turbo', label: '🚀 Turbo 10x' },
              ] as const
            ).map((s) => {
              const active = config.speed === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onUpdateConfig({ speed: s.id })}
                  className={`p-2 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-pink-600/30 border-pink-400 text-white font-bold'
                      : 'bg-purple-950/40 border-purple-800/30 text-purple-300 hover:bg-purple-900/30'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Artwork Gallery Library */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300/80">
              Artwork Library ({filteredArtworks.length})
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-pink-300 hover:text-pink-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Complete 10-Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs no-scrollbar">
            {artworkCategoriesList.map((cat) => {
              const active = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer shrink-0 ${
                    active
                      ? 'bg-pink-600/40 text-pink-200 border border-pink-400/50 shadow-md'
                      : 'bg-purple-950/40 text-purple-300/70 border border-purple-800/30 hover:bg-purple-900/30'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-[9px] opacity-70">({cat.count})</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
            {filteredArtworks.map((art) => {
              const isSelected = art.id === currentArtwork.id;
              return (
                <button
                  key={art.id}
                  onClick={() => onSelectArtwork(art)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-700/30 border-pink-400 text-white ring-2 ring-pink-500/20'
                      : 'bg-purple-950/40 border-purple-800/30 text-purple-300 hover:bg-purple-900/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden relative shadow border border-white/10 bg-purple-900/50 flex items-center justify-center">
                    {art.imageUrl ? (
                      <img
                        src={art.imageUrl}
                        alt={art.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: art.thumbnailColor || '#a855f7' }}
                      >
                        <span className="text-[10px] text-white/90">#{art.number || '★'}</span>
                      </div>
                    )}
                  </div>
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-1">
                      {art.number && (
                        <span className="text-[10px] font-mono text-pink-300/80">#{art.number}</span>
                      )}
                      <p className="text-xs font-bold text-white truncate">{art.name}</p>
                    </div>
                    <p className="text-[10px] text-purple-300/60 truncate capitalize">
                      {art.category.replace('-', ' ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Interactive Event Simulator (Twitch / TikTok Engine) */}
        <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-purple-950/50 border border-purple-700/40">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Stream Interaction Simulator</span>
            </label>
            <span className="text-[10px] text-purple-300/70">Twitch & TikTok Ready</span>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-200 flex items-center gap-1 w-16">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Likes:
            </span>
            <button
              onClick={() => triggerInteraction('like', 1)}
              className="flex-1 py-1.5 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-200 text-xs font-semibold cursor-pointer"
            >
              +1 Like
            </button>
            <button
              onClick={() => triggerInteraction('like', 10)}
              className="flex-1 py-1.5 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-200 text-xs font-semibold cursor-pointer"
            >
              +10 Likes
            </button>
            <button
              onClick={() => triggerInteraction('like', 100)}
              className="flex-1 py-1.5 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-200 text-xs font-semibold cursor-pointer"
            >
              +100 Likes
            </button>
          </div>

          {/* Gifts */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-purple-200 flex items-center gap-1 w-16">
              <Gift className="w-3.5 h-3.5 text-yellow-400" />
              Gifts:
            </span>
            <button
              onClick={() => triggerInteraction('gift', 1, 'rose')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 text-pink-200 text-xs font-medium cursor-pointer"
            >
              🌹 Rose
            </button>
            <button
              onClick={() => triggerInteraction('gift', 1, 'heart')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-medium cursor-pointer"
            >
              💜 Heart
            </button>
            <button
              onClick={() => triggerInteraction('gift', 1, 'flower')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-pink-950/60 hover:bg-pink-900/80 border border-pink-400/40 text-pink-100 text-xs font-medium cursor-pointer"
            >
              🌸 Flower
            </button>
            <button
              onClick={() => triggerInteraction('gift', 1, 'big_gift')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-yellow-200 text-xs font-bold cursor-pointer"
            >
              🎁 Big Gift
            </button>
          </div>

          {/* Sand Shake Button */}
          <div className="flex items-center justify-between pt-2 border-t border-purple-800/30">
            <span className="text-xs text-purple-300">Sand Mode Feature:</span>
            <button
              onClick={() => triggerInteraction('shake', 1)}
              className="py-1.5 px-3 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-400/40 text-amber-200 text-xs font-semibold cursor-pointer"
            >
              🏺 Trigger !shake
            </button>
          </div>
        </div>

        {/* Section 6: Completion & Stream Settings */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-purple-300/80">
            Stream & Timer Settings
          </label>

          {/* Masterpiece hold duration slider */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-300" />
                Completed Artwork Display:
              </span>
              <span className="font-bold text-white">{config.masterpieceHoldSeconds} seconds</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={config.masterpieceHoldSeconds}
              onChange={(e) => onUpdateConfig({ masterpieceHoldSeconds: Number(e.target.value) })}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          {/* Audio Volume Slider */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-pink-300" />
                ASMR Audio Volume:
              </span>
              <span className="font-bold text-white">{Math.round(config.soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={config.soundVolume}
              onChange={(e) => {
                const vol = Number(e.target.value);
                soundEngine.setVolume(vol);
                onUpdateConfig({ soundVolume: vol });
              }}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>

          {/* Mystery Dream Mode Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>❓</span> Mystery Dream / Guess Mode
              </span>
              <span className="text-[10px] text-purple-300/60">
                Hides name & reveals clues at 25%, 50%, 75% for viewers to guess
              </span>
            </div>
            <button
              onClick={() => onUpdateConfig({ mysteryMode: !config.mysteryMode })}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                config.mysteryMode
                  ? 'bg-amber-500/30 border border-amber-400 text-amber-200'
                  : 'bg-purple-900/40 border border-purple-700/40 text-purple-400'
              }`}
            >
              {config.mysteryMode ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Smart Category Randomizer Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>🔀</span> Smart Category Randomizer
              </span>
              <span className="text-[10px] text-purple-300/60">
                Avoids picking the same category back-to-back to keep stream fresh
              </span>
            </div>
            <button
              onClick={() => onUpdateConfig({ smartRandomCategory: !config.smartRandomCategory })}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                config.smartRandomCategory
                  ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-200'
                  : 'bg-purple-900/40 border border-purple-700/40 text-purple-400'
              }`}
            >
              {config.smartRandomCategory ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Ambient Drone Pad Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Ambient Sleep Drone</span>
              <span className="text-[10px] text-purple-300/60">Gentle 432Hz harmonic relaxation tone</span>
            </div>
            <button
              onClick={() => {
                soundEngine.unlock();
                const nextState = !config.asmrAmbientEnabled;
                soundEngine.toggleAmbientPad(nextState);
                onUpdateConfig({ asmrAmbientEnabled: nextState });
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                config.asmrAmbientEnabled
                  ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-200'
                  : 'bg-purple-900/40 border border-purple-700/40 text-purple-400'
              }`}
            >
              {config.asmrAmbientEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Stream Overlay Mode: hides admin wand button from viewer view */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Pure OBS Browser Source Mode</span>
              <span className="text-[10px] text-purple-300/60">Hides admin wand icon from screen (use ?mode=admin to return)</span>
            </div>
            <button
              onClick={() => onUpdateConfig({ streamModeOnly: !config.streamModeOnly })}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                config.streamModeOnly
                  ? 'bg-pink-500/30 border border-pink-400 text-pink-200'
                  : 'bg-purple-900/40 border border-purple-700/40 text-purple-400'
              }`}
            >
              {config.streamModeOnly ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-2 text-center text-[11px] text-purple-300/50">
          Shyfoxie's Dream Studio • Interactive Streaming Experience
        </div>
      </div>
    </div>
  );
};
