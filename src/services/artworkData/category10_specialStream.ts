/**
 * Category 10 — Special Stream Designs (Artworks 91 to 100)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category10Artworks: Artwork[] = [
  // 91. Shyfoxie Logo Art
  {
    id: 'art-091-shyfoxie-logo',
    number: 91,
    name: 'Shyfoxie Logo Art',
    description: 'The iconic Shyfoxie emblem — a gentle smiling fox curled around a glittering amethyst star gem.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#0f172a', '#1e1b4b', '#f97316', '#fdba74', '#c084fc', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '✨ Dreamy lavender mist radiating with starlight...' },
      { atPercentage: 50, clueText: '🦊 A graceful sleeping orange fox curled in a circle...' },
      { atPercentage: 75, clueText: '💜 The heart of the studio... Shyfoxie Logo Art!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0f172a'], [0.5, '#2e1065'], [1, '#4c1d95']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#2e1065'], [1, '#0f172a']],
        focal: (ctx) => {
          // Curled fox circle
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.arc(48, 27, 16, 0, Math.PI * 2); ctx.fill();
          // Inner cutout
          ctx.fillStyle = '#2e1065';
          ctx.beginPath(); ctx.arc(48, 27, 8, 0, Math.PI * 2); ctx.fill();
          // Sparkling gem center
          ctx.fillStyle = '#c084fc';
          ctx.fillRect(46, 25, 4, 4);
          // White tail tip & ears
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(58, 20, 4, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 92. Stream Starting Soon Art
  {
    id: 'art-092-stream-starting-soon',
    number: 92,
    name: 'Stream Starting Soon',
    description: 'A glowing marquee with warm cozy lights, steaming coffee, and art supplies ready for a magical stream.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#18181b', '#3b0764', '#ec4899', '#fde047', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '📺 Ambient studio lights warming up the room...' },
      { atPercentage: 50, clueText: '☕ Fresh coffee poured and easel canvas prepped...' },
      { atPercentage: 75, clueText: '✨ The countdown begins... Stream Starting Soon!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#18181b'], [0.6, '#3b0764'], [1, '#701a75']],
        horizonY: 34,
        terrainStops: [[0, '#2e1065'], [1, '#18181b']],
        focal: (ctx) => {
          // Marquee sign
          ctx.fillStyle = '#ec4899';
          ctx.fillRect(24, 16, 48, 16);
          // Warm glowing text block
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(28, 20, 40, 8);
          // Easel canvas on right
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(74, 24, 12, 14);
        }
      })
  },

  // 93. Stream Ending Art
  {
    id: 'art-093-stream-ending',
    number: 93,
    name: 'Stream Ending (Goodnight)',
    description: 'A sleeping fox tucked into a fluffy cloud bed under a crescent moon with sleepy stars.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#6366f1',
    palette: ['#020617', '#0f172a', '#1e1b4b', '#6366f1', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Gentle crescent moon softly swinging in night skies...' },
      { atPercentage: 50, clueText: '☁️ A soft downy cloud pillow and star blanket...' },
      { atPercentage: 75, clueText: '💤 Sweet dreams and peaceful rest... Stream Ending!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        celestial: { type: 'moon', x: 74, y: 14, r: 8, color: '#fef08a' },
        horizonY: 36,
        terrainStops: [[0, '#1e1b4b'], [1, '#020617']],
        focal: (ctx) => {
          // Cloud bed
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(42, 34, 10, 0, Math.PI * 2);
          ctx.arc(54, 34, 10, 0, Math.PI * 2);
          ctx.fill();
          // Sleeping fox on top
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.ellipse(48, 28, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 94. Chat Celebration Art
  {
    id: 'art-094-chat-celebration',
    number: 94,
    name: 'Chat Celebration',
    description: 'A vibrant burst of confetti, party poppers, balloons, and smiling mascot faces celebrating together.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#fde047',
    palette: ['#ef4444', '#f97316', '#fde047', '#10b981', '#3b82f6', '#ec4899'],
    clues: [
      { atPercentage: 25, clueText: '🎉 Explosive bursts of colorful party ribbons...' },
      { atPercentage: 50, clueText: '🎈 Clusters of balloons rising into bright confetti...' },
      { atPercentage: 75, clueText: '🥳 Cheering community victory... Chat Celebration!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.6, '#bae6fd'], [1, '#fde68a']],
        horizonY: 54,
        terrainStops: [[0, '#fde68a'], [1, '#fbcfe8']],
        focal: (ctx) => {
          // Confetti dots
          const confCols = ['#ef4444', '#f97316', '#fde047', '#10b981', '#3b82f6', '#ec4899'];
          for (let i = 0; i < 40; i++) {
            ctx.fillStyle = confCols[i % confCols.length];
            ctx.fillRect(8 + (i * 13) % 80, 6 + (i * 17) % 40, 2.5, 2.5);
          }
          // Balloons
          [[36, 32, '#ef4444'], [48, 24, '#3b82f6'], [60, 30, '#ec4899']].forEach(([bx, by, col]) => {
            ctx.fillStyle = String(col);
            ctx.beginPath(); ctx.arc(Number(bx), Number(by), 7, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(Number(bx), Number(by) + 7); ctx.lineTo(Number(bx), Number(by) + 18); ctx.stroke();
          });
        }
      })
  },

  // 95. 100 Artwork Milestone
  {
    id: 'art-095-100-artwork-milestone',
    number: 95,
    name: '100 Artwork Milestone',
    description: 'A gleaming trophy cup engraved with "100" surrounded by laurels, fireworks, and golden stars.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#0f172a', '#1e1b4b', '#eab308', '#fef08a', '#ffffff', '#dc2626'],
    clues: [
      { atPercentage: 25, clueText: '🎆 Golden fireworks exploding across the midnight sky...' },
      { atPercentage: 50, clueText: '🏆 A towering golden champion cup with laurel leaves...' },
      { atPercentage: 75, clueText: '💯 Celebrating the full library... 100 Artwork Milestone!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 38,
        terrainStops: [[0, '#1e1b4b'], [1, '#020617']],
        focal: (ctx) => {
          // Golden trophy cup
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.moveTo(38, 14); ctx.lineTo(58, 14); ctx.lineTo(54, 28); ctx.lineTo(42, 28); ctx.fill();
          // Stem & base
          ctx.fillRect(46, 28, 4, 6);
          ctx.fillRect(40, 34, 16, 4);
          // Trophy handles
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(36, 20, 4, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath(); ctx.arc(60, 20, 4, 0, Math.PI * 2); ctx.stroke();
        }
      })
  },

  // 96. Dream Studio Canvas
  {
    id: 'art-096-dream-studio-canvas',
    number: 96,
    name: 'Dream Studio Canvas',
    description: 'An enchanted wooden painter easel holding a magical blank canvas that ripples with living starlight.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#030712', '#1e1b4b', '#78350f', '#38bdf8', '#c084fc', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🪵 A triangular wooden artist easel standing in the center...' },
      { atPercentage: 50, clueText: '🎨 Paintbrushes, palette knives, and rainbow tubes ready...' },
      { atPercentage: 75, clueText: '✨ A canvas opening into another world... Studio Canvas!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030712'], [0.5, '#1e1b4b'], [1, '#312e81']],
        horizonY: 38,
        terrainStops: [[0, '#1e1b4b'], [1, '#030712']],
        focal: (ctx) => {
          // Easel legs
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(48, 10); ctx.lineTo(34, 46); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(48, 10); ctx.lineTo(62, 46); ctx.stroke();
          // Canvas board
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(36, 16, 24, 18);
          // Living starlight on canvas
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.arc(48, 25, 6, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 97. Golden Fox
  {
    id: 'art-097-golden-fox',
    number: 97,
    name: 'Golden Fox',
    description: 'A legendary kitsune fox made of radiant solid gold sitting regally on a velvet pedestal.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#450a0a', '#78350f', '#eab308', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '👑 Imperial crimson velvet drapery and gold embroidery...' },
      { atPercentage: 50, clueText: '✨ Gleaming metallic polished gold reflecting royal candlelight...' },
      { atPercentage: 75, clueText: '🦊 The legendary nine-tailed guardian... Golden Fox!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#450a0a'], [0.6, '#7f1d1d'], [1, '#991b1b']],
        horizonY: 34,
        terrainStops: [[0, '#450a0a'], [1, '#1c0f06']],
        focal: (ctx) => {
          // Velvet pedestal
          ctx.fillStyle = '#7f1d1d';
          ctx.fillRect(34, 36, 28, 8);
          // Golden fox
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.ellipse(48, 26, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
          // Head & ears
          ctx.beginPath(); ctx.arc(42, 20, 5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.moveTo(38, 18); ctx.lineTo(40, 12); ctx.lineTo(43, 18); ctx.fill();
          // Golden tail
          ctx.beginPath(); ctx.ellipse(56, 24, 7, 4, 0.4, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 98. Neon Fox City
  {
    id: 'art-098-neon-fox-city',
    number: 98,
    name: 'Neon Fox City',
    description: 'A futuristic cyberpunk skyline illuminated by a colossal neon holographic fox sign.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#030712', '#1e1035', '#06b6d4', '#ec4899', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🏙️ Cyberpunk skyscrapers slicing through misty rain...' },
      { atPercentage: 50, clueText: '⚡ Glowing magenta and cyan neon holographic billboards...' },
      { atPercentage: 75, clueText: '🦊 Giant glowing fox avatar over the skyline... Neon Fox City!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030712'], [0.5, '#0f051d'], [1, '#1e0836']],
        rain: true,
        horizonY: 34,
        terrainStops: [[0, '#0f051d'], [1, '#030712']],
        focal: (ctx) => {
          // Skyscraper silhouettes
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(16, 20, 16, 26);
          ctx.fillRect(64, 16, 16, 30);
          // Neon holographic fox outline
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(48, 20, 12, 0, Math.PI * 2); ctx.stroke();
          // Neon eyes & ears
          ctx.fillStyle = '#ec4899';
          ctx.fillRect(44, 18, 2, 2);
          ctx.fillRect(50, 18, 2, 2);
        }
      })
  },

  // 99. Rainbow Fox
  {
    id: 'art-099-rainbow-fox',
    number: 99,
    name: 'Rainbow Fox',
    description: 'A magical spirit fox whose prismatic rainbow coat cascades like aurora borealis light.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f43f5e',
    palette: ['#0f172a', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'],
    clues: [
      { atPercentage: 25, clueText: '✨ Sparkling prismatic starlight rippling through space...' },
      { atPercentage: 50, clueText: '🌈 Flowing gradient coat shifting through all the colors...' },
      { atPercentage: 75, clueText: '🦊 Prismatic spectral kitsune... Rainbow Fox!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 36,
        terrainStops: [[0, '#1e1b4b'], [1, '#020617']],
        focal: (ctx) => {
          // Rainbow striped fox body
          const rCols = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
          rCols.forEach((col, i) => {
            ctx.fillStyle = col;
            ctx.fillRect(36 + i * 4, 22, 4, 12);
          });
          // Head
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(36, 24, 5, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 100. Ultimate Dream Studio
  {
    id: 'art-100-ultimate-dream-studio',
    number: 100,
    name: 'Ultimate Dream Studio',
    description: 'The master sanctuary: a warm glowing treehouse observatory overlooking floating islands, auroras, and stars.',
    category: 'special-stream',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#090514', '#1e1035', '#4c1d95', '#ec4899', '#fde047', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Vibrant northern auroras weaving through celestial nebulae...' },
      { atPercentage: 50, clueText: '🏝️ Floating crystal islands and glowing diamond waterfalls...' },
      { atPercentage: 75, clueText: '🦊✨ Our cozy forever haven... Ultimate Dream Studio!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.4, '#2e1065'], [0.8, '#4c1d95'], [1, '#0c4a6e']],
        stars: true,
        aurora: ['rgba(56, 189, 248, 0.4)', 'rgba(168, 85, 247, 0.3)'],
        celestial: { type: 'moon', x: 80, y: 14, r: 8, color: '#fef08a' },
        horizonY: 34,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Floating studio observatory
          ctx.fillStyle = '#78350f';
          ctx.fillRect(34, 18, 28, 16);
          // Glowing panoramic glass window
          ctx.fillStyle = '#fde047';
          ctx.fillRect(38, 22, 20, 8);
          // Observatory telescope dome
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.arc(48, 18, 8, Math.PI, 0); ctx.fill();
          // Mascot banner
          ctx.fillStyle = '#f97316';
          ctx.fillRect(44, 24, 8, 4);
        }
      })
  }
];
