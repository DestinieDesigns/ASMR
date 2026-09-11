/**
 * Shyfoxie's Dream Studio — Full 100 Artwork Library
 * 10 Categories x 10 Artworks = 100 Complete Scenes
 */

import { Artwork } from '../../types';
import { category1Artworks } from './category1_magicalAnimals';
import { category2Artworks } from './category2_cuteAnimals';
import { category3Artworks } from './category3_oceanDreams';
import { category4Artworks } from './category4_spaceGalaxy';
import { category5Artworks } from './category5_flowersGardens';
import { category6Artworks } from './category6_fantasyWorlds';
import { category7Artworks } from './category7_cozyNight';
import { category8Artworks } from './category8_epicDramatic';
import { category9Artworks } from './category9_funUnexpected';
import { category10Artworks } from './category10_specialStream';

export const all100Artworks: Artwork[] = [
  ...category1Artworks,
  ...category2Artworks,
  ...category3Artworks,
  ...category4Artworks,
  ...category5Artworks,
  ...category6Artworks,
  ...category7Artworks,
  ...category8Artworks,
  ...category9Artworks,
  ...category10Artworks,
];

export const artworkCategoryMap: Record<string, Artwork[]> = {
  'magical-animals': category1Artworks,
  'cute-animals': category2Artworks,
  'ocean-dreams': category3Artworks,
  'space-galaxy': category4Artworks,
  'flowers-gardens': category5Artworks,
  'fantasy-worlds': category6Artworks,
  'cozy-night': category7Artworks,
  'epic-dramatic': category8Artworks,
  'fun-unexpected': category9Artworks,
  'special-stream': category10Artworks,
};

export const artworkCategoriesList = [
  { id: 'all', name: 'All 100 Dreams', icon: '✨', count: 100 },
  { id: 'magical-animals', name: 'Magical Animals', icon: '🦊', count: 10 },
  { id: 'cute-animals', name: 'Cute Animals', icon: '🐱', count: 10 },
  { id: 'ocean-dreams', name: 'Ocean Dreams', icon: '🐬', count: 10 },
  { id: 'space-galaxy', name: 'Space & Galaxy', icon: '🌌', count: 10 },
  { id: 'flowers-gardens', name: 'Flowers & Gardens', icon: '🌸', count: 10 },
  { id: 'fantasy-worlds', name: 'Fantasy Worlds', icon: '🏰', count: 10 },
  { id: 'cozy-night', name: 'Cozy Night Scenes', icon: '☕', count: 10 },
  { id: 'epic-dramatic', name: 'Epic & Dramatic', icon: '⚡', count: 10 },
  { id: 'fun-unexpected', name: 'Fun & Unexpected', icon: '🍭', count: 10 },
  { id: 'special-stream', name: 'Special Stream Designs', icon: '🎉', count: 10 },
];
