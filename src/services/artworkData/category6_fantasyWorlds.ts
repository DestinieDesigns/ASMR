/**
 * Category 6 — Fantasy Worlds (Artworks 51 to 60)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category6Artworks: Artwork[] = [
  // 51. Floating Castle
  {
    id: 'art-051-floating-castle',
    number: 51,
    name: 'Floating Castle',
    description: 'A colossal fantasy fortress levitating above golden sunset clouds with spires and waterfalls.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#3b0764', '#a855f7', '#fbbf24', '#fde047', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '☁️ Sunset cloudbanks glowing with orange and lavender...' },
      { atPercentage: 50, clueText: '🏰 High stone ramparts and flying buttresses in midair...' },
      { atPercentage: 75, clueText: '✨ Levitating kingdom above the sky... Floating Castle!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#3b0764'], [0.5, '#9333ea'], [1, '#fb923c']],
        celestial: { type: 'sun', x: 48, y: 34, r: 12, color: '#fef08a' },
        horizonY: 54,
        terrainStops: [[0, '#fb923c'], [1, '#3b0764']],
        focal: (ctx) => {
          // Floating rock base
          ctx.fillStyle = '#475569';
          ctx.beginPath();
          ctx.moveTo(28, 28); ctx.lineTo(68, 28); ctx.lineTo(48, 44); ctx.fill();
          // Castle walls & spires
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(36, 16, 24, 12);
          ctx.fillRect(34, 12, 6, 16);
          ctx.fillRect(56, 12, 6, 16);
          // Gold cone roofs
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.moveTo(32, 12); ctx.lineTo(37, 4); ctx.lineTo(42, 12); ctx.fill();
          ctx.beginPath(); ctx.moveTo(54, 12); ctx.lineTo(59, 4); ctx.lineTo(64, 12); ctx.fill();
          // Waterfall from base
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(47, 28, 2, 22);
        }
      })
  },

  // 52. Dragon Kingdom
  {
    id: 'art-052-dragon-kingdom',
    number: 52,
    name: 'Dragon Kingdom',
    description: 'A fortress built into a rugged mountain canyon where majestic dragons patrol the skies.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#dc2626',
    palette: ['#450a0a', '#991b1b', '#ea580c', '#334155', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🌋 Jagged volcanic crags lit by molten embers...' },
      { atPercentage: 50, clueText: '🏰 High mountain stone battlements and iron gates...' },
      { atPercentage: 75, clueText: '🐉 Scaled silhouettes circling the spires... Dragon Kingdom!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#450a0a'], [0.6, '#991b1b'], [1, '#ea580c']],
        horizonY: 34,
        terrainStops: [[0, '#1e293b'], [1, '#0f172a']],
        mountains: [{ x: 48, y: 16, w: 70, h: 20, color: '#334155' }],
        focal: (ctx) => {
          // Castle battlement
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(38, 24, 20, 14);
          // Dragon silhouette flying
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.ellipse(30, 14, 5, 2.5, -0.2, 0, Math.PI * 2);
          ctx.fill();
          // Wings
          ctx.beginPath();
          ctx.moveTo(30, 14); ctx.lineTo(24, 6); ctx.lineTo(34, 12);
          ctx.moveTo(30, 14); ctx.lineTo(32, 6); ctx.lineTo(36, 12);
          ctx.fill();
        }
      })
  },

  // 53. Fairy Village
  {
    id: 'art-053-fairy-village',
    number: 53,
    name: 'Fairy Village',
    description: 'Tiny whimsical fairy houses nestled in mossy tree hollows and lit by glowing dandelion lamps.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#10b981',
    palette: ['#022c22', '#065f46', '#10b981', '#f43f5e', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🍃 Giant curling leaves and dewdrops on moss...' },
      { atPercentage: 50, clueText: '🏠 Miniature acorn-cap roofs and twig ladder bridges...' },
      { atPercentage: 75, clueText: '✨ Glowing fairy dust swirling around... Fairy Village!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.6, '#064e3b'], [1, '#047857']],
        horizonY: 30,
        terrainStops: [[0, '#065f46'], [1, '#022c22']],
        focal: (ctx) => {
          // Hollow tree trunk
          ctx.fillStyle = '#451a03';
          ctx.fillRect(36, 10, 24, 44);
          // Fairy door
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.arc(48, 38, 5, Math.PI, 0); ctx.fill();
          // Windows
          ctx.fillRect(42, 22, 3, 3);
          ctx.fillRect(51, 22, 3, 3);
          // Floating fairy dust
          ctx.fillStyle = '#fef08a';
          for (let i = 0; i < 10; i++) {
            ctx.fillRect(20 + (i * 7) % 56, 15 + (i * 11) % 30, 1.5, 1.5);
          }
        }
      })
  },

  // 54. Crystal Kingdom
  {
    id: 'art-054-crystal-kingdom',
    number: 54,
    name: 'Crystal Kingdom',
    description: 'A dazzling fantasy metropolis made entirely of prismatic quartz, sapphire, and emerald towers.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#082f49', '#0284c7', '#06b6d4', '#67e8f9', '#c084fc', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '💎 Giant crystal shards reflecting prismatic rainbows...' },
      { atPercentage: 50, clueText: '✨ Translucent sapphire and quartz towers soaring high...' },
      { atPercentage: 75, clueText: '👑 Gleaming geometric jewel spires... Crystal Kingdom!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#082f49'], [1, '#0e7490']],
        stars: true,
        horizonY: 32,
        terrainStops: [[0, '#0284c7'], [1, '#082f49']],
        focal: (ctx) => {
          // Crystal obelisks
          const crystals = [
            { x: 30, h: 22, w: 8, col: '#38bdf8' },
            { x: 48, h: 30, w: 10, col: '#67e8f9' },
            { x: 66, h: 24, w: 8, col: '#a855f7' }
          ];
          crystals.forEach((c) => {
            ctx.fillStyle = c.col;
            ctx.beginPath();
            ctx.moveTo(c.x - c.w * 0.5, 36);
            ctx.lineTo(c.x, 36 - c.h);
            ctx.lineTo(c.x + c.w * 0.5, 36);
            ctx.fill();
            // Highlight facet
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(c.x, 36 - c.h);
            ctx.lineTo(c.x + c.w * 0.5, 36);
            ctx.lineTo(c.x, 36);
            ctx.fill();
          });
        }
      })
  },

  // 55. Wizard Tower
  {
    id: 'art-055-wizard-tower',
    number: 55,
    name: 'Wizard Tower',
    description: 'A spiral stone tower perched on a cliff with glowing purple runic windows and swirling magic.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#7c3aed',
    palette: ['#090514', '#1e0836', '#4c1d95', '#7c3aed', '#fde047', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '⚡ Stormy purple vortex swirling in midnight clouds...' },
      { atPercentage: 50, clueText: '🏰 A lonely twisting stone spire on a rocky pinnacle...' },
      { atPercentage: 75, clueText: '🔮 Glowing arcane runes and an astronomy dome... Wizard Tower!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.6, '#2e1065'], [1, '#4c1d95']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#1e1b4b'], [1, '#090514']],
        mountains: [{ x: 50, y: 22, w: 40, h: 14, color: '#1e1035' }],
        focal: (ctx) => {
          // Tower
          ctx.fillStyle = '#334155';
          ctx.fillRect(44, 14, 8, 26);
          // Conical pointed roof
          ctx.fillStyle = '#7c3aed';
          ctx.beginPath(); ctx.moveTo(42, 14); ctx.lineTo(48, 4); ctx.lineTo(54, 14); ctx.fill();
          // Glowing magic windows
          ctx.fillStyle = '#fde047';
          ctx.fillRect(47, 18, 2, 3);
          ctx.fillRect(47, 26, 2, 3);
          // Arcane ring
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(48, 12, 12, 4, 0, 0, Math.PI * 2); ctx.stroke();
        }
      })
  },

  // 56. Portal in the Forest
  {
    id: 'art-056-portal-in-forest',
    number: 56,
    name: 'Portal in the Forest',
    description: 'An ancient mossy stone ring gate swirling with celestial vortex light deep within a misty forest.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#021812', '#064e3b', '#047857', '#06b6d4', '#67e8f9', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Ancient mossy trees standing guard in silent mist...' },
      { atPercentage: 50, clueText: '⭕ A circular stone henge standing upright...' },
      { atPercentage: 75, clueText: '🌀 Swirling turquoise portal to another realm! Forest Portal!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.6, '#064e3b'], [1, '#047857']],
        horizonY: 28,
        terrainStops: [[0, '#065f46'], [1, '#021812']],
        focal: (ctx) => {
          // Stone ring
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(48, 30, 14, 0, Math.PI * 2); ctx.stroke();
          // Swirling vortex center
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(48, 30, 11, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(48, 30, 4, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 57. Sky Island
  {
    id: 'art-057-sky-island',
    number: 57,
    name: 'Sky Island',
    description: 'A verdant green island adrift in azure skies, with a windmill, sheep, and streaming waterfalls.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#0284c7', '#38bdf8', '#bae6fd', '#15803d', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '☁️ Fluffy white clouds drifting across open skies...' },
      { atPercentage: 50, clueText: '🏝️ Floating inverted earth crag with lush green grass...' },
      { atPercentage: 75, clueText: '💨 A spinning windmill above the clouds... Sky Island!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0284c7'], [0.6, '#38bdf8'], [1, '#bae6fd']],
        horizonY: 54,
        terrainStops: [[0, '#bae6fd'], [1, '#ffffff']],
        focal: (ctx) => {
          // Island body
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(32, 28, 32, 4);
          ctx.fillStyle = '#78350f';
          ctx.beginPath();
          ctx.moveTo(32, 32); ctx.lineTo(64, 32); ctx.lineTo(48, 46); ctx.fill();
          // Windmill
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(44, 18, 6, 10);
          ctx.fillStyle = '#dc2626';
          ctx.beginPath(); ctx.moveTo(43, 18); ctx.lineTo(47, 12); ctx.lineTo(51, 18); ctx.fill();
          // Waterfall
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(56, 32, 2, 18);
        }
      })
  },

  // 58. Magical Train
  {
    id: 'art-058-magical-train',
    number: 58,
    name: 'Magical Train',
    description: 'A glowing steam locomotive crossing a high arched viaduct through starlit mountain canyons.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#090514', '#1e1b4b', '#4338ca', '#f97316', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌉 Stone arch viaduct stretching across a mountain ravine...' },
      { atPercentage: 50, clueText: '🚂 Plumes of starlit steam puffing into the night sky...' },
      { atPercentage: 75, clueText: '✨ Glowing passenger carriages crossing... Magical Train!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.5, '#1e1b4b'], [1, '#312e81']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#1e1b4b'], [1, '#090514']],
        structures: (ctx, w) => {
          // Viaduct arches
          ctx.fillStyle = '#475569';
          ctx.fillRect(10, 32, w - 20, 4);
          for (let x = 20; x < w - 20; x += 16) {
            ctx.fillRect(x, 36, 4, 18);
          }
        },
        focal: (ctx) => {
          // Train engine & carriages
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(44, 25, 12, 7);
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(32, 26, 10, 6);
          ctx.fillRect(20, 26, 10, 6);
          // Headlight beam
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.moveTo(56, 28); ctx.lineTo(76, 24); ctx.lineTo(76, 32); ctx.fill();
          // Steam puffs
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath(); ctx.arc(46, 18, 4, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 59. Castle Above the Clouds
  {
    id: 'art-059-castle-above-clouds',
    number: 59,
    name: 'Castle Above the Clouds',
    description: 'Golden ramparts basking in brilliant sunlight atop an endless ocean of pearly white cumulus clouds.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#0284c7', '#38bdf8', '#fef08a', '#eab308', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '☁️ An endless white ocean of fluffy clouds below...' },
      { atPercentage: 50, clueText: '☀️ Radiant golden sunshine glinting on gilded banners...' },
      { atPercentage: 75, clueText: '🏰 Royal citadel in the heavens... Castle Above Clouds!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0284c7'], [0.5, '#38bdf8'], [1, '#bae6fd']],
        celestial: { type: 'sun', x: 24, y: 12, r: 8, color: '#ffffff', glowColor: 'rgba(255, 255, 255, 0.6)' },
        horizonY: 34,
        terrainStops: [[0, '#ffffff'], [0.6, '#e2e8f0'], [1, '#cbd5e1']],
        clouds: [
          { x: 20, y: 36, r: 12, color: '#ffffff' },
          { x: 50, y: 38, r: 14, color: '#ffffff' },
          { x: 80, y: 36, r: 12, color: '#ffffff' }
        ],
        focal: (ctx) => {
          // Golden Castle
          ctx.fillStyle = '#fde047';
          ctx.fillRect(40, 18, 16, 16);
          ctx.fillStyle = '#eab308';
          ctx.beginPath(); ctx.moveTo(38, 18); ctx.lineTo(48, 8); ctx.lineTo(58, 18); ctx.fill();
        }
      })
  },

  // 60. Hidden Elf Village
  {
    id: 'art-060-hidden-elf-village',
    number: 60,
    name: 'Hidden Elf Village',
    description: 'Graceful elven tree-platforms, rope bridges, and glowing lanterns woven into giant ancient redwoods.',
    category: 'fantasy-worlds',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#15803d',
    palette: ['#022c22', '#064e3b', '#15803d', '#fde047', '#fed7aa', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Towering redwood trunks with emerald mosses...' },
      { atPercentage: 50, clueText: '🌉 Curved wooden walkway bridges high in the forest canopy...' },
      { atPercentage: 75, clueText: '🧝 Glowing lanterns in the trees... Hidden Elf Village!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.6, '#064e3b'], [1, '#065f46']],
        horizonY: 32,
        terrainStops: [[0, '#065f46'], [1, '#022c22']],
        focal: (ctx) => {
          // Giant redwood trunks
          ctx.fillStyle = '#451a03';
          ctx.fillRect(16, 0, 14, 54);
          ctx.fillRect(66, 0, 14, 54);
          // High bridge connecting them
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(30, 24); ctx.quadraticCurveTo(48, 28, 66, 24); ctx.stroke();
          // Hanging elven lanterns
          ctx.fillStyle = '#fde047';
          ctx.fillRect(40, 28, 2, 3);
          ctx.fillRect(55, 28, 2, 3);
        }
      })
  }
];
