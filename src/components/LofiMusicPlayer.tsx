import React, { useState, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ListMusic,
  Disc,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { LofiTrack } from '../types';

interface LofiMusicPlayerProps {
  className?: string;
  isCompact?: boolean;
}

export const LofiMusicPlayer: React.FC<LofiMusicPlayerProps> = ({
  className = '',
  isCompact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(soundEngine.getIsMusicPlaying());
  const [currentTrack, setCurrentTrack] = useState<LofiTrack>(soundEngine.getCurrentTrack());
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(soundEngine.getCurrentTrackIndex());
  const [volume, setVolume] = useState(soundEngine.getMusicVolume());
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isCompact);

  const tracks = soundEngine.getTracks();

  useEffect(() => {
    // Subscribe to track changes and playback updates
    const unsubscribeTrack = soundEngine.onTrackChange((track, index) => {
      setCurrentTrack(track);
      setCurrentTrackIdx(index);
    });

    const unsubscribePlay = soundEngine.onPlaybackStateChange((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubscribeTrack();
      unsubscribePlay();
    };
  }, []);

  const handleTogglePlay = () => {
    soundEngine.unlock();
    const nextState = soundEngine.toggleMusicPlaylist();
    setIsPlaying(nextState);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEngine.unlock();
    soundEngine.nextTrack();
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEngine.unlock();
    soundEngine.prevTrack();
  };

  const handleSelectTrack = (index: number) => {
    soundEngine.unlock();
    soundEngine.selectTrack(index);
    if (!isPlaying) {
      soundEngine.startMusicPlaylist(index);
    }
    setShowPlaylist(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setMusicVolume(val);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div
      id="lofi-music-player"
      className={`relative z-30 transition-all duration-300 select-none ${className}`}
    >
      {/* Collapsed Pill Mode */}
      {!isExpanded ? (
        <button
          id="lofi-player-expand-btn"
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 hover:bg-purple-900/90 border border-purple-700/50 backdrop-blur-md shadow-lg text-purple-200 text-xs font-medium transition-all group cursor-pointer"
          title="Open Lo-fi Ambient Music Player"
        >
          <div className={`relative flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            <Disc className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
            {isPlaying && (
              <span className="absolute w-1.5 h-1.5 rounded-full bg-pink-400" />
            )}
          </div>
          <span className="max-w-[110px] truncate text-[11px] text-pink-200 font-semibold">
            {currentTrack.title}
          </span>
          {isPlaying && (
            <div className="flex items-center gap-0.5 h-2.5">
              <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-3 bg-pink-300 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-150" />
            </div>
          )}
        </button>
      ) : (
        /* Full Aesthetic Music Bar */
        <div className="flex flex-col rounded-2xl bg-purple-950/85 border border-purple-700/50 backdrop-blur-xl shadow-2xl p-2.5 sm:p-3 text-purple-100 max-w-[340px] sm:max-w-[380px]">
          {/* Top Bar: Now Playing Info & Collapse */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {/* Vinyl Disc Animation */}
              <div
                className={`relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-900 to-black border border-purple-600/60 flex items-center justify-center shrink-0 shadow-md ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <Disc className="w-5 h-5 text-pink-400/80" />
                <div className="absolute w-2 h-2 rounded-full bg-pink-300" />
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400/90 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Lo-Fi Radio
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/40">
                    {currentTrack.bpm} BPM
                  </span>
                </div>
                <span className="text-xs font-bold text-white truncate drop-shadow-sm">
                  {currentTrack.title}
                </span>
                <span className="text-[10px] text-purple-300/70 truncate">
                  {currentTrack.mood} • Auto-Cycles
                </span>
              </div>
            </div>

            {/* Collapse button */}
            <div className="flex items-center gap-1">
              <button
                id="lofi-playlist-toggle-btn"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  showPlaylist
                    ? 'bg-pink-500/30 border-pink-400 text-pink-200'
                    : 'bg-purple-900/40 border-purple-800/40 hover:bg-purple-800/50 text-purple-300'
                }`}
                title="Playlist Tracklist"
              >
                <ListMusic className="w-3.5 h-3.5" />
              </button>
              {isCompact && (
                <button
                  id="lofi-player-collapse-btn"
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg bg-purple-900/40 border border-purple-800/40 hover:bg-purple-800/50 text-purple-300 transition-all cursor-pointer"
                  title="Minimize Player"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-purple-800/40">
            {/* Playback buttons */}
            <div className="flex items-center gap-1.5">
              <button
                id="lofi-prev-btn"
                onClick={handlePrev}
                className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800/70 border border-purple-700/40 text-purple-200 hover:text-white transition-all cursor-pointer active:scale-95"
                title="Previous Lo-fi Track"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                id="lofi-play-btn"
                onClick={handleTogglePlay}
                className={`flex items-center justify-center w-8 h-8 rounded-full border shadow-md transition-all cursor-pointer active:scale-95 ${
                  isPlaying
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-300 text-white shadow-pink-500/20'
                    : 'bg-purple-800/60 hover:bg-purple-700/70 border-purple-600 text-purple-100 hover:text-white'
                }`}
                title={isPlaying ? 'Pause Lo-fi Music' : 'Play Lo-fi Ambient Music'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                id="lofi-next-btn"
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800/70 border border-purple-700/40 text-purple-200 hover:text-white transition-all cursor-pointer active:scale-95"
                title="Next Lo-fi Track"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-1.5">
              <button
                id="lofi-mute-btn"
                onClick={handleToggleMute}
                className="text-purple-300 hover:text-pink-300 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute All' : 'Mute Sound'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                id="lofi-volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 accent-pink-400 h-1 bg-purple-900/80 rounded-lg cursor-pointer"
                title={`Music Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
          </div>

          {/* Expandable Playlist Selector */}
          {showPlaylist && (
            <div
              id="lofi-tracklist-panel"
              className="mt-2.5 pt-2 border-t border-purple-800/50 flex flex-col gap-1 max-h-48 overflow-y-auto pr-1"
            >
              <div className="text-[10px] font-bold text-purple-300/80 px-1 pb-1 uppercase tracking-wider flex items-center justify-between">
                <span>Select Ambient Track</span>
                <span className="text-[9px] font-normal text-purple-400/60">Cycles automatically</span>
              </div>
              {tracks.map((track, idx) => {
                const isActive = idx === currentTrackIdx;
                return (
                  <button
                    key={track.id}
                    id={`lofi-track-item-${idx}`}
                    onClick={() => handleSelectTrack(idx)}
                    className={`flex items-center justify-between p-1.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-pink-500/25 border border-pink-400/50 text-pink-100 font-semibold shadow-sm'
                        : 'bg-purple-900/30 hover:bg-purple-800/40 border border-transparent text-purple-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] opacity-60 w-3.5 text-center font-mono">
                        {idx + 1}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate leading-tight">{track.title}</span>
                        <span className="text-[9px] text-purple-400/70 truncate">
                          {track.genre}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <span className="text-[9px] text-purple-400/70">{track.bpm} bpm</span>
                      {isActive && isPlaying && (
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
