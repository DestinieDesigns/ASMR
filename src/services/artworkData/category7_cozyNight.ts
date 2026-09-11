/**
 * Category 7 — Cozy Night Scenes (Artworks 61 to 70)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category7Artworks: Artwork[] = [
  // 61. Cozy Rainy Window
  {
    id: 'art-061-cozy-rainy-window',
    number: 61,
    name: 'Cozy Rainy Window',
    description: 'A warm amber mug of tea sitting on a dark wooden windowsill while soothing rain trickles down outside.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#d97706',
    palette: ['#0f172a', '#1e293b', '#3b82f6', '#93c5fd', '#d97706', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌧️ Steady soothing raindrops tapping against cool glass...' },
      { atPercentage: 50, clueText: '🪵 Dark wooden sill with soft amber indoor lamp glow...' },
      { atPercentage: 75, clueText: '☕ A hot steaming mug of tea... Cozy Rainy Window!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0f172a'], [0.5, '#1e293b'], [1, '#334155']],
        rain: true,
        horizonY: 38,
        terrainStops: [[0, '#451a03'], [1, '#291102']],
        focal: (ctx) => {
          // Wooden windowsill
          ctx.fillStyle = '#78350f';
          ctx.fillRect(0, 38, 96, 16);
          // Steaming ceramic mug
          ctx.fillStyle = '#fb923c';
          ctx.fillRect(44, 32, 8, 8);
          // Steam
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(48, 30); ctx.quadraticCurveTo(46, 26, 48, 22); ctx.stroke();
        }
      })
  },

  // 62. Moonlit Cabin
  {
    id: 'art-062-moonlit-cabin',
    number: 62,
    name: 'Moonlit Cabin',
    description: 'A cozy log cabin in snowy pine woods with warm golden windows beneath a luminous full moon.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#020617', '#0f172a', '#1e293b', '#cbd5e1', '#fde047', '#78350f'],
    clues: [
      { atPercentage: 25, clueText: '❄️ Snowy pine branches weighed down by winter powder...' },
      { atPercentage: 50, clueText: '🌙 A huge full moon casting crisp blue shadows on snow...' },
      { atPercentage: 75, clueText: '🏡 Golden glowing windows and chimney smoke... Moonlit Cabin!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e293b']],
        stars: true,
        celestial: { type: 'moon', x: 74, y: 14, r: 8, color: '#fef08a' },
        horizonY: 30,
        terrainStops: [[0, '#e2e8f0'], [0.5, '#cbd5e1'], [1, '#94a3b8']],
        focal: (ctx) => {
          // Log cabin
          ctx.fillStyle = '#78350f';
          ctx.fillRect(36, 24, 20, 14);
          // Snow-covered roof
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.moveTo(34, 24); ctx.lineTo(46, 14); ctx.lineTo(58, 24); ctx.fill();
          // Chimney
          ctx.fillStyle = '#475569';
          ctx.fillRect(51, 12, 3, 5);
          // Glowing yellow window
          ctx.fillStyle = '#fde047';
          ctx.fillRect(40, 27, 4, 4);
        }
      })
  },

  // 63. Campfire Under the Stars
  {
    id: 'art-063-campfire-under-stars',
    number: 63,
    name: 'Campfire Under the Stars',
    description: 'A crackling campfire with orange embers beside a mountain lake beneath the Milky Way.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ea580c',
    palette: ['#020617', '#0f172a', '#172554', '#ea580c', '#fde047', '#78350f'],
    clues: [
      { atPercentage: 25, clueText: '🌌 The dense arch of the Milky Way across the night...' },
      { atPercentage: 50, clueText: '🏕️ A cozy pitched canvas tent by the water...' },
      { atPercentage: 75, clueText: '🔥 Crackling orange sparks and warmth... Campfire Under Stars!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#172554']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Campfire logs
          ctx.fillStyle = '#78350f';
          ctx.fillRect(44, 44, 8, 2);
          // Flames
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.moveTo(42, 44); ctx.lineTo(48, 32); ctx.lineTo(54, 44); ctx.fill();
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.moveTo(45, 44); ctx.lineTo(48, 36); ctx.lineTo(51, 44); ctx.fill();
          // Tent on left
          ctx.fillStyle = '#1e3a8a';
          ctx.beginPath(); ctx.moveTo(20, 44); ctx.lineTo(28, 32); ctx.lineTo(36, 44); ctx.fill();
        }
      })
  },

  // 64. Cozy Book Nook
  {
    id: 'art-064-cozy-book-nook',
    number: 64,
    name: 'Cozy Book Nook',
    description: 'An intimate reading alcove filled with rows of classic books, plush pillows, and fairy lights.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f59e0b',
    palette: ['#1c1917', '#292524', '#78350f', '#f59e0b', '#fef08a', '#f43f5e'],
    clues: [
      { atPercentage: 25, clueText: '📚 Floor-to-ceiling wooden shelves stacked with books...' },
      { atPercentage: 50, clueText: '🛋️ Plush knit blankets and soft velvet cushions...' },
      { atPercentage: 75, clueText: '💡 Twinkling string lights in a quiet corner... Book Nook!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1c1917'], [0.7, '#292524'], [1, '#44403c']],
        horizonY: 36,
        terrainStops: [[0, '#78350f'], [1, '#451a03']],
        focal: (ctx) => {
          // Bookshelves on left and right
          ctx.fillStyle = '#78350f';
          ctx.fillRect(4, 4, 20, 46);
          ctx.fillRect(72, 4, 20, 46);
          // Colorful book spines
          const bCols = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
          for (let y = 8; y < 44; y += 8) {
            for (let i = 0; i < 4; i++) {
              ctx.fillStyle = bCols[i];
              ctx.fillRect(6 + i * 4, y, 3, 6);
              ctx.fillRect(74 + i * 4, y, 3, 6);
            }
          }
          // Center armchair & cushion
          ctx.fillStyle = '#991b1b';
          ctx.beginPath(); ctx.arc(48, 38, 12, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 65. Rainy City Café
  {
    id: 'art-065-rainy-city-cafe',
    number: 65,
    name: 'Rainy City Café',
    description: 'A warmly lit bistro on a cobblestone European street reflecting glowing neon and streetlamps.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#0f172a', '#1e293b', '#f97316', '#fde047', '#f43f5e', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '🌧️ Wet cobblestones gleaming with warm streetlamp reflections...' },
      { atPercentage: 50, clueText: '☕ Striped awning and steamy bistro windows...' },
      { atPercentage: 75, clueText: '🥐 Glowing amber sanctuary in the rain... City Café!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0f172a'], [0.5, '#1e293b'], [1, '#334155']],
        rain: true,
        horizonY: 32,
        terrainStops: [[0, '#1e293b'], [1, '#0f172a']],
        focal: (ctx) => {
          // Café facade
          ctx.fillStyle = '#78350f';
          ctx.fillRect(28, 14, 40, 22);
          // Glowing warm glass window
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(32, 18, 32, 14);
          // Striped awning
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(26, 12, 44, 4);
          // Cobblestone reflections
          ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
          ctx.fillRect(36, 36, 24, 14);
        }
      })
  },

  // 66. Sleeping Cat by the Fireplace
  {
    id: 'art-066-sleeping-cat-fireplace',
    number: 66,
    name: 'Sleeping Cat by the Fireplace',
    description: 'A content ginger cat curled on a braided rug beside a rustic brick hearth of glowing logs.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ea580c',
    palette: ['#451a03', '#78350f', '#991b1b', '#ea580c', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🧱 Red brick hearth radiating gentle hearth heat...' },
      { atPercentage: 50, clueText: '🔥 Dancing embers and crackling birch logs...' },
      { atPercentage: 75, clueText: '🐈 Purring curled ginger feline... Cat by Fireplace!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1c1917'], [0.7, '#292524'], [1, '#451a03']],
        horizonY: 36,
        terrainStops: [[0, '#451a03'], [1, '#1c0f06']],
        focal: (ctx) => {
          // Brick fireplace
          ctx.fillStyle = '#7f1d1d';
          ctx.fillRect(34, 12, 28, 24);
          ctx.fillStyle = '#000000';
          ctx.fillRect(40, 18, 16, 18);
          // Fire glow
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.arc(48, 30, 6, 0, Math.PI * 2); ctx.fill();
          // Curled sleeping cat on rug
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.ellipse(48, 42, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(43, 41, 3.5, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 67. Lantern Forest
  {
    id: 'art-067-lantern-forest',
    number: 67,
    name: 'Lantern Forest',
    description: 'Hundreds of glowing silk lanterns floating through misty redwood branches at twilight.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f59e0b',
    palette: ['#021812', '#064e3b', '#065f46', '#f59e0b', '#fef08a', '#ea580c'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Deep dark cedar branches swaying in silence...' },
      { atPercentage: 50, clueText: '🏮 Golden paper spheres casting gentle orbs of light...' },
      { atPercentage: 75, clueText: '✨ A starlit path guided by lanterns... Lantern Forest!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.6, '#064e3b'], [1, '#065f46']],
        horizonY: 32,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Floating lanterns
          const lPos = [[24, 20], [40, 14], [56, 18], [72, 24], [48, 28]];
          lPos.forEach(([lx, ly]) => {
            ctx.fillStyle = '#fef08a';
            ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ea580c';
            ctx.fillRect(lx - 1, ly - 5, 2, 2);
            ctx.fillRect(lx - 1, ly + 3, 2, 2);
          });
        }
      })
  },

  // 68. Midnight Garden
  {
    id: 'art-068-midnight-garden',
    number: 68,
    name: 'Midnight Garden',
    description: 'A stone fountain splashing under the silver moon, surrounded by night-blooming jasmine.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#6366f1',
    palette: ['#020617', '#0f172a', '#1e1b4b', '#6366f1', '#cbd5e1', '#f8fafc'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Cool silver moonlight bathing quiet stone pathways...' },
      { atPercentage: 50, clueText: '⛲ An ornate tiered water fountain splashing gently...' },
      { atPercentage: 75, clueText: '🌸 Night jasmine fragrance in the breeze... Midnight Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        celestial: { type: 'moon', x: 48, y: 12, r: 7, color: '#ffffff' },
        horizonY: 30,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Tiered stone fountain
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(46, 26, 4, 18);
          ctx.beginPath(); ctx.arc(48, 32, 8, 0, Math.PI); ctx.fill();
          ctx.beginPath(); ctx.arc(48, 44, 14, 0, Math.PI); ctx.fill();
          // Water spout
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(47, 22, 2, 4);
        }
      })
  },

  // 69. Cozy Treehouse
  {
    id: 'art-069-cozy-treehouse',
    number: 69,
    name: 'Cozy Treehouse',
    description: 'A rustic wooden cabin high in an ancient oak tree glowing with fairy lights under starlight.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#78350f',
    palette: ['#020617', '#064e3b', '#78350f', '#fde047', '#f59e0b', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌳 Massive gnarled branches stretching into starry skies...' },
      { atPercentage: 50, clueText: '🪜 A wooden rope ladder swaying softly in the wind...' },
      { atPercentage: 75, clueText: '🏡 Secret hideaway glowing in the branches... Cozy Treehouse!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#064e3b'], [1, '#065f46']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Tree trunk & branches
          ctx.fillStyle = '#451a03';
          ctx.fillRect(40, 24, 16, 30);
          // Treehouse
          ctx.fillStyle = '#78350f';
          ctx.fillRect(36, 14, 24, 14);
          ctx.fillStyle = '#451a03';
          ctx.beginPath(); ctx.moveTo(34, 14); ctx.lineTo(48, 6); ctx.lineTo(62, 14); ctx.fill();
          // Glowing window
          ctx.fillStyle = '#fde047';
          ctx.fillRect(42, 18, 5, 5);
        }
      })
  },

  // 70. Starry Bedroom
  {
    id: 'art-070-starry-bedroom',
    number: 70,
    name: 'Starry Bedroom',
    description: 'A peaceful bed under a glass skylight ceiling projecting the constellations and galaxies.',
    category: 'cozy-night',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#6366f1',
    palette: ['#020617', '#1e1b4b', '#4338ca', '#818cf8', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '✨ Constellations projected across a vaulted glass ceiling...' },
      { atPercentage: 50, clueText: '🛏️ Soft lavender duvet and mounds of feather pillows...' },
      { atPercentage: 75, clueText: '🌌 Drifting to sleep beneath galaxies... Starry Bedroom!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f0a2a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#312e81'], [1, '#1e1b4b']],
        focal: (ctx) => {
          // Bed frame & mattress
          ctx.fillStyle = '#4338ca';
          ctx.fillRect(30, 34, 36, 14);
          // Pillows & blanket
          ctx.fillStyle = '#e0e7ff';
          ctx.fillRect(34, 32, 10, 4);
          ctx.fillRect(52, 32, 10, 4);
          ctx.fillStyle = '#818cf8';
          ctx.fillRect(30, 36, 36, 12);
        }
      })
  }
];
