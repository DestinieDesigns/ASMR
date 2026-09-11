export type ArtMode = 'diamond' | 'sand' | 'bubble';

export type SpeedSetting = 'sleep' | 'normal' | 'fast' | 'turbo';

export type ArtworkCategory =
  | 'magical-animals'
  | 'cute-animals'
  | 'ocean-dreams'
  | 'space-galaxy'
  | 'flowers-gardens'
  | 'fantasy-worlds'
  | 'cozy-night'
  | 'epic-dramatic'
  | 'fun-unexpected'
  | 'special-stream'
  | 'beach'
  | 'animals'
  | 'scenery'
  | 'nature'
  | 'fantasy'
  | 'cozy'
  | 'custom';

export interface ArtworkClue {
  atPercentage: number;
  clueText: string;
}

export interface Artwork {
  id: string;
  number?: number;
  name: string;
  description: string;
  category: ArtworkCategory;
  aspectRatio: '16:9';
  width: number;
  height: number;
  palette: string[];
  imageUrl?: string;
  thumbnailColor?: string;
  isCustom?: boolean;
  isMystery?: boolean;
  clues?: ArtworkClue[];
  generateImageData: () => ImageData | HTMLCanvasElement;
}

export type GiftType = 'rose' | 'heart' | 'flower' | 'big_gift';

export interface StreamInteraction {
  id: string;
  type: 'like' | 'gift' | 'shake' | 'chat' | 'speed';
  amount: number;
  giftType?: GiftType;
  sender?: string;
  timestamp: number;
}

export interface FloatingParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji?: string;
  color?: string;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export interface LofiTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  mood: string;
  description: string;
  hasBeats: boolean;
}

export interface StudioConfig {
  activeMode: ArtMode;
  autoCycle: boolean;
  masterpieceHoldSeconds: number;
  speed: SpeedSetting;
  soundEnabled: boolean;
  soundVolume: number;
  asmrAmbientEnabled: boolean;
  lofiMusicEnabled: boolean;
  lofiMusicVolume: number;
  lofiTrackIndex: number;
  streamModeOnly: boolean; // Hide all admin hints for OBS Browser source
  gridResolution: 'low' | 'medium' | 'high'; // e.g. 64x36, 96x54, 128x72
  mysteryMode: boolean; // Enables "❓ MYSTERY DREAM ❓" and 25%/50%/75% clues
  smartRandomCategory: boolean; // Prevents choosing the same category consecutively
}

export interface CanvasArtProgress {
  placedCount: number;
  totalCount: number;
  percentage: number;
  isCompleted: boolean;
}
