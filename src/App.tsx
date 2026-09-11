/**
 * Shyfoxie's Dream Studio - Main Application
 * Cozy, magical interactive visual art experience for streaming and ambient relaxation.
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArtMode, Artwork, CanvasArtProgress, StudioConfig } from './types';
import { defaultArtworks } from './services/artworkLibrary';
import { soundEngine } from './services/audioEngine';
import { AmbientBackground } from './components/AmbientBackground';
import { DiamondPaintingCanvas } from './components/DiamondPaintingCanvas';
import { FallingSandCanvas } from './components/FallingSandCanvas';
import { BubblePopCanvas } from './components/BubblePopCanvas';
import { ViewerOverlay } from './components/ViewerOverlay';
import { StreamerAdminDrawer } from './components/StreamerAdminDrawer';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { InteractionParticlesOverlay } from './components/InteractionParticlesOverlay';
import { Volume2 } from 'lucide-react';

export default function App() {
  // Parse URL query parameters: ?mode=admin or ?mode=stream
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialAdmin = urlParams.get('mode') === 'admin';
  const initialStreamOnly = urlParams.get('mode') === 'stream';

  const [artworks, setArtworks] = useState<Artwork[]>(defaultArtworks);
  const artworksRef = useRef(artworks);
  artworksRef.current = artworks;

  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(0);

  const [config, setConfig] = useState<StudioConfig>({
    activeMode: 'diamond',
    autoCycle: true,
    masterpieceHoldSeconds: 8, // 8 seconds of sparkling fanfare before auto-advancing
    speed: 'normal',
    soundEnabled: true,
    soundVolume: 0.5,
    asmrAmbientEnabled: false,
    streamModeOnly: initialStreamOnly,
    gridResolution: 'medium',
    mysteryMode: true,
    smartRandomCategory: true,
  });

  const [isAdminOpen, setIsAdminOpen] = useState(initialAdmin);
  const [isPaused, setIsPaused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [progress, setProgress] = useState<CanvasArtProgress>({
    placedCount: 0,
    totalCount: 1,
    percentage: 0,
    isCompleted: false,
  });

  const currentArtwork = artworks[currentArtworkIndex] || artworks[0];

  // User gesture unlock for audio
  const handleUserUnlockAudio = useCallback(() => {
    soundEngine.unlock();
    setAudioUnlocked(true);
  }, []);

  // Update configuration helper
  const handleUpdateConfig = useCallback((partial: Partial<StudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // Smart randomizer helper: avoids choosing consecutive artworks from the same category
  const getNextIndex = useCallback(
    (currentList: Artwork[], prevIndex: number) => {
      if (currentList.length <= 1) return 0;
      const prevCategory = currentList[prevIndex]?.category;

      if (config.smartRandomCategory && prevCategory) {
        // Collect artworks with different categories to keep stream variety fresh
        const diffCategoryIndices: number[] = [];
        for (let i = 0; i < currentList.length; i++) {
          if (i !== prevIndex && currentList[i].category !== prevCategory) {
            diffCategoryIndices.push(i);
          }
        }
        if (diffCategoryIndices.length > 0) {
          const rand = Math.floor(Math.random() * diffCategoryIndices.length);
          return diffCategoryIndices[rand];
        }
      }

      // Fallback: pick next index avoiding immediate repeat
      let nextIndex = (prevIndex + 1) % currentList.length;
      if (currentList.length > 2 && nextIndex === prevIndex) {
        nextIndex = (prevIndex + 1) % currentList.length;
      }
      return nextIndex;
    },
    [config.smartRandomCategory]
  );

  // Go to next artwork, respecting smart category randomization
  const handleNextArtwork = useCallback(() => {
    setIsCelebrating(false);
    setProgress({
      placedCount: 0,
      totalCount: 1,
      percentage: 0,
      isCompleted: false,
    });

    const currentList = artworksRef.current;
    if (currentList.length <= 1) return;
    setCurrentArtworkIndex((prevIndex) => getNextIndex(currentList, prevIndex));
  }, [getNextIndex]);

  // Go to previous artwork
  const handlePrevArtwork = useCallback(() => {
    setIsCelebrating(false);
    setProgress({
      placedCount: 0,
      totalCount: 1,
      percentage: 0,
      isCompleted: false,
    });

    const currentList = artworksRef.current;
    if (currentList.length <= 1) return;
    setCurrentArtworkIndex((prevIndex) => (prevIndex - 1 + currentList.length) % currentList.length);
  }, []);

  // Jump directly to specific artwork by index
  const handleSelectArtworkIndex = useCallback((index: number) => {
    setIsCelebrating(false);
    setProgress({
      placedCount: 0,
      totalCount: 1,
      percentage: 0,
      isCompleted: false,
    });
    setCurrentArtworkIndex(index);
  }, []);

  // Shuffle to random artwork avoiding same category
  const handleShuffleArtwork = useCallback(() => {
    setIsCelebrating(false);
    setProgress({
      placedCount: 0,
      totalCount: 1,
      percentage: 0,
      isCompleted: false,
    });
    const currentList = artworksRef.current;
    if (currentList.length <= 1) return;
    setCurrentArtworkIndex((prevIndex) => getNextIndex(currentList, prevIndex));
  }, [getNextIndex]);

  // Restart current artwork
  const handleRestartArtwork = useCallback(() => {
    setIsCelebrating(false);
    setProgress({
      placedCount: 0,
      totalCount: 1,
      percentage: 0,
      isCompleted: false,
    });
    // Trigger re-mount by momentarily cycling index or forcing state
    setCurrentArtworkIndex((i) => i);
  }, []);

  // Trigger sand container shake
  const handleTriggerShake = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playSandShake();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 700);
  }, []);

  // Masterpiece completion callback
  const handleArtworkCompleted = useCallback(() => {
    setIsCelebrating(true);
  }, []);

  // Add imported custom artwork
  const handleAddCustomArtwork = useCallback((newArt: Artwork) => {
    setArtworks((prev) => [newArt, ...prev]);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'a' || e.key === 'A') {
        setIsAdminOpen((prev) => !prev);
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        if (config.activeMode === 'sand') {
          handleTriggerShake();
        }
      } else if (e.key === 'n' || e.key === 'N') {
        handleNextArtwork();
      } else if (e.key === 'p' || e.key === 'P') {
        handlePrevArtwork();
      } else if (e.key === 'r' || e.key === 'R') {
        handleShuffleArtwork();
      } else if (e.key === 'c' || e.key === 'C') {
        setConfig((cfg) => ({ ...cfg, autoCycle: !cfg.autoCycle }));
      } else if (e.key === '1') {
        setConfig((cfg) => ({ ...cfg, speed: 'sleep' }));
      } else if (e.key === '2') {
        setConfig((cfg) => ({ ...cfg, speed: 'normal' }));
      } else if (e.key === '3') {
        setConfig((cfg) => ({ ...cfg, speed: 'fast' }));
      } else if (e.key === '4') {
        setConfig((cfg) => ({ ...cfg, speed: 'turbo' }));
      } else if (e.key === 'Escape') {
        setIsAdminOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config.activeMode, handleTriggerShake, handleNextArtwork, handlePrevArtwork, handleShuffleArtwork]);

  return (
    <div
      onClick={handleUserUnlockAudio}
      className="relative w-screen h-screen overflow-hidden bg-[#090715] flex items-center justify-center select-none"
    >
      {/* Subtle Ambient Particle Background */}
      <AmbientBackground />

      {/* Floating Reaction Hearts & Gifts */}
      <InteractionParticlesOverlay />

      {/* Main 16:9 Central Stage: 70%-80% Visual Focus */}
      <main className="relative w-full h-full max-w-[1920px] max-h-[1080px] p-2 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="relative w-full h-full aspect-video flex items-center justify-center">
          {/* Active Visual Mode Canvas */}
          {config.activeMode === 'diamond' && (
            <DiamondPaintingCanvas
              key={`diamond-${currentArtwork.id}-${currentArtworkIndex}`}
              artwork={currentArtwork}
              speed={config.speed}
              isPaused={isPaused}
              onProgress={setProgress}
              onComplete={handleArtworkCompleted}
            />
          )}

          {config.activeMode === 'sand' && (
            <FallingSandCanvas
              key={`sand-${currentArtwork.id}-${currentArtworkIndex}`}
              artwork={currentArtwork}
              speed={config.speed}
              isPaused={isPaused}
              onProgress={setProgress}
              onComplete={handleArtworkCompleted}
              isShaking={isShaking}
              onShakeTriggered={handleTriggerShake}
            />
          )}

          {config.activeMode === 'bubble' && (
            <BubblePopCanvas
              key={`bubble-${currentArtwork.id}-${currentArtworkIndex}`}
              artwork={currentArtwork}
              speed={config.speed}
              isPaused={isPaused}
              onProgress={setProgress}
              onComplete={handleArtworkCompleted}
            />
          )}

          {/* Masterpiece Completion Celebration Overlay */}
          {isCelebrating && (
            <CelebrationOverlay
              mode={config.activeMode}
              artwork={currentArtwork}
              holdSeconds={config.masterpieceHoldSeconds}
              autoCycle={config.autoCycle}
              onNextArtwork={handleNextArtwork}
            />
          )}

          {/* Clean Viewer Stream Overlay */}
          <ViewerOverlay
            mode={config.activeMode}
            artwork={currentArtwork}
            currentArtworkIndex={currentArtworkIndex}
            totalArtworksCount={artworks.length}
            artworks={artworks}
            speed={config.speed}
            autoCycle={config.autoCycle}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((p) => !p)}
            onToggleAutoCycle={() => setConfig((cfg) => ({ ...cfg, autoCycle: !cfg.autoCycle }))}
            onNextArtwork={handleNextArtwork}
            onPrevArtwork={handlePrevArtwork}
            onShuffleArtwork={handleShuffleArtwork}
            onChangeSpeed={(spd) => setConfig((cfg) => ({ ...cfg, speed: spd }))}
            onSelectArtworkIndex={handleSelectArtworkIndex}
            progress={progress}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onTriggerShake={config.activeMode === 'sand' ? handleTriggerShake : undefined}
            streamModeOnly={config.streamModeOnly}
            mysteryMode={config.mysteryMode}
          />
        </div>
      </main>

      {/* Streamer & Admin Drawer (Separated from Viewer Screen) */}
      <StreamerAdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        currentArtwork={currentArtwork}
        onSelectArtwork={(art) => {
          setIsCelebrating(false);
          const idx = artworks.findIndex((a) => a.id === art.id);
          if (idx !== -1) setCurrentArtworkIndex(idx);
        }}
        onRestartArtwork={handleRestartArtwork}
        onPrevArtwork={handlePrevArtwork}
        onNextArtwork={handleNextArtwork}
        onShuffleArtwork={handleShuffleArtwork}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((p) => !p)}
        onAddCustomArtwork={handleAddCustomArtwork}
        artworks={artworks}
      />

      {/* Friendly subtle prompt to unlock ASMR audio on first visit */}
      {!audioUnlocked && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleUserUnlockAudio();
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-purple-950/90 border border-pink-400/40 text-xs text-pink-200 shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105 z-40 animate-pulse"
        >
          <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
          <span>Click anywhere to enable soothing ASMR sounds ✦</span>
        </div>
      )}
    </div>
  );
}
