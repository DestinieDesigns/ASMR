/**
 * Category 9 — Fun & Unexpected (Artworks 81 to 90)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category9Artworks: Artwork[] = [
  // 81. Candy Planet
  {
    id: 'art-081-candy-planet',
    number: 81,
    name: 'Candy Planet',
    description: 'A whimsical landscape with striped candy canes, marshmallow clouds, and a flowing chocolate river.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f43f5e',
    palette: ['#fbcfe8', '#f472b6', '#ef4444', '#ffffff', '#78350f', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '🍬 Swirled peppermint hills and cotton candy clouds...' },
      { atPercentage: 50, clueText: '🍫 A flowing river of melted milk chocolate...' },
      { atPercentage: 75, clueText: '🍭 Giant striped lollipops standing tall... Candy Planet!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#fbcfe8'], [0.6, '#fce7f3'], [1, '#fef08a']],
        horizonY: 26,
        terrainStops: [[0, '#f472b6'], [1, '#db2777']],
        focal: (ctx) => {
          // Chocolate river
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.moveTo(38, 26); ctx.bezierCurveTo(46, 36, 52, 40, 60, 54);
          ctx.lineTo(46, 54); ctx.bezierCurveTo(38, 40, 32, 36, 28, 26);
          ctx.fill();
          // Lollipops
          [[20, 18, '#ef4444'], [74, 16, '#06b6d4']].forEach(([lx, ly, col]) => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(Number(lx) - 1, Number(ly), 2, 14);
            ctx.fillStyle = String(col);
            ctx.beginPath(); ctx.arc(Number(lx), Number(ly), 6, 0, Math.PI * 2); ctx.fill();
          });
        }
      })
  },

  // 82. Floating Donut Galaxy
  {
    id: 'art-082-donut-galaxy',
    number: 82,
    name: 'Floating Donut Galaxy',
    description: 'Giant glazed strawberry donuts with rainbow sprinkles drifting peacefully among cosmic stars.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#030712', '#1e1035', '#ec4899', '#fef08a', '#38bdf8', '#fed7aa'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Deep space stardust sparkling with colorful sprinkles...' },
      { atPercentage: 50, clueText: '🍩 Golden fried pastry with glossy pink strawberry glaze...' },
      { atPercentage: 75, clueText: '✨ Giant frosted toroids drifting... Donut Galaxy!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030014'], [0.5, '#1e0538'], [1, '#09071b']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#09071b'], [1, '#030014']],
        focal: (ctx) => {
          // Giant central donut
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath(); ctx.arc(48, 27, 16, 0, Math.PI * 2); ctx.fill();
          // Pink glaze
          ctx.fillStyle = '#ec4899';
          ctx.beginPath(); ctx.arc(48, 27, 14, 0, Math.PI * 2); ctx.fill();
          // Center hole
          ctx.fillStyle = '#1e0538';
          ctx.beginPath(); ctx.arc(48, 27, 6, 0, Math.PI * 2); ctx.fill();
          // Sprinkles
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(42, 18, 3, 1.5);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(52, 20, 1.5, 3);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(44, 34, 3, 1.5);
        }
      })
  },

  // 83. Magical Arcade
  {
    id: 'art-083-magical-arcade',
    number: 83,
    name: 'Magical Arcade',
    description: 'A retro arcade filled with glowing neon cabinets, pixel art marquees, and nostalgic synthwave light.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#a855f7',
    palette: ['#090514', '#2e1065', '#a855f7', '#06b6d4', '#f43f5e', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🕹️ Dimly lit room illuminated by glowing CRT screens...' },
      { atPercentage: 50, clueText: '👾 Neon joysticks and coin slots awaiting credits...' },
      { atPercentage: 75, clueText: '✨ Retro pixel fantasy paradise... Magical Arcade!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.6, '#1e0836'], [1, '#2e1065']],
        horizonY: 34,
        terrainStops: [[0, '#1e1b4b'], [1, '#090514']],
        focal: (ctx) => {
          // Arcade cabinets
          [[24, '#f43f5e'], [44, '#06b6d4'], [64, '#a855f7']].forEach(([ax, col]) => {
            ctx.fillStyle = '#1e1b4b';
            ctx.fillRect(Number(ax), 16, 12, 26);
            ctx.fillStyle = String(col);
            ctx.fillRect(Number(ax) + 1, 18, 10, 4);
            // Glowing screen
            ctx.fillStyle = '#fde047';
            ctx.fillRect(Number(ax) + 2, 24, 8, 8);
          });
        }
      })
  },

  // 84. Rainbow Cloud City
  {
    id: 'art-084-rainbow-cloud-city',
    number: 84,
    name: 'Rainbow Cloud City',
    description: 'A whimsical metropolis of pastel domes, slides, and bridges built across smiling rainbow clouds.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#38bdf8', '#bae6fd', '#f43f5e', '#eab308', '#22c55e', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌈 A vibrant 7-colored rainbow bridge arching high...' },
      { atPercentage: 50, clueText: '☁️ Fluffy white cloud foundations supporting towers...' },
      { atPercentage: 75, clueText: '🏙️ Pastel domes in the heavens... Rainbow Cloud City!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.6, '#bae6fd'], [1, '#fbcfe8']],
        horizonY: 34,
        terrainStops: [[0, '#ffffff'], [1, '#e2e8f0']],
        focal: (ctx) => {
          // Rainbow arch
          const rCols = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
          rCols.forEach((col, i) => {
            ctx.strokeStyle = col;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(48, 44, 28 - i * 2, Math.PI, 0); ctx.stroke();
          });
          // Cloud towers
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(48, 30, 10, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 85. Tiny Frog Café
  {
    id: 'art-085-tiny-frog-cafe',
    number: 85,
    name: 'Tiny Frog Café',
    description: 'An adorable little green tree frog wearing a barista apron brewing coffee under a broad lily leaf.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#22c55e',
    palette: ['#064e3b', '#16a34a', '#22c55e', '#78350f', '#ffffff', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🍃 A broad green umbrella leaf sheltering a counter...' },
      { atPercentage: 50, clueText: '☕ A miniature espresso pot steaming with roast aroma...' },
      { atPercentage: 75, clueText: '🐸 Big friendly round eyes in an apron... Tiny Frog Café!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#042f2e'], [0.6, '#064e3b'], [1, '#0d9488']],
        horizonY: 28,
        terrainStops: [[0, '#15803d'], [1, '#14532d']],
        focal: (ctx) => {
          // Lily leaf roof
          ctx.fillStyle = '#16a34a';
          ctx.beginPath(); ctx.arc(48, 20, 20, Math.PI, 0); ctx.fill();
          // Wood counter
          ctx.fillStyle = '#78350f';
          ctx.fillRect(36, 36, 24, 8);
          // Frog barista
          ctx.fillStyle = '#22c55e';
          ctx.beginPath(); ctx.arc(48, 31, 6, 0, Math.PI * 2); ctx.fill();
          // Eyes on top
          ctx.fillStyle = '#16a34a';
          ctx.beginPath(); ctx.arc(44, 25, 2.5, 0, Math.PI * 2); ctx.arc(52, 25, 2.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(43, 24, 1.5, 1.5); ctx.fillRect(51, 24, 1.5, 1.5);
        }
      })
  },

  // 86. Mushroom Pizza Planet
  {
    id: 'art-086-mushroom-pizza-planet',
    number: 86,
    name: 'Mushroom Pizza Planet',
    description: 'A hilarious celestial planet shaped like a giant slice of bubbling cheese pizza with mushroom craters.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#020617', '#1e1035', '#eab308', '#dc2626', '#78350f', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Deep space sprinkled with floating oregano stars...' },
      { atPercentage: 50, clueText: '🧀 Bubbling golden mozzarella crust and pepperoni moons...' },
      { atPercentage: 75, clueText: '🍕 The tastiest world in the galaxy... Pizza Planet!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f051d'], [1, '#1e0538']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#1e0538'], [1, '#020617']],
        focal: (ctx) => {
          // Pizza slice shape
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.moveTo(48, 10); ctx.lineTo(24, 44); ctx.lineTo(72, 44);
          ctx.fill();
          // Crust top
          ctx.fillStyle = '#b45309';
          ctx.fillRect(22, 42, 52, 4);
          // Pepperoni craters
          ctx.fillStyle = '#dc2626';
          [[48, 22], [38, 34], [58, 34]].forEach(([px, py]) => {
            ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          });
        }
      })
  },

  // 87. Bubble Tea Kingdom
  {
    id: 'art-087-bubble-tea-kingdom',
    number: 87,
    name: 'Bubble Tea Kingdom',
    description: 'A magical kingdom with giant boba tapioca pearls, milk tea waterfalls, and striped straws.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#d97706',
    palette: ['#fed7aa', '#fde68a', '#d97706', '#1c1917', '#9333ea', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🧋 Creamy golden brown milk tea rivers flowing...' },
      { atPercentage: 50, clueText: '⚪ Glossy black chewy boba pearls piled high...' },
      { atPercentage: 75, clueText: '🥤 Giant striped drinking straw towers... Bubble Tea Kingdom!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#fed7aa'], [0.6, '#fde68a'], [1, '#fbcfe8']],
        horizonY: 28,
        terrainStops: [[0, '#d97706'], [1, '#b45309']],
        focal: (ctx) => {
          // Giant boba cup
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(36, 16, 24, 28);
          // Milk tea fill
          ctx.fillStyle = '#d97706';
          ctx.fillRect(38, 22, 20, 20);
          // Boba pearls
          ctx.fillStyle = '#0f172a';
          for (let i = 0; i < 6; i++) {
            ctx.beginPath(); ctx.arc(42 + (i % 3) * 6, 38 + Math.floor(i / 3) * 3, 2.5, 0, Math.PI * 2); ctx.fill();
          }
          // Straw
          ctx.fillStyle = '#9333ea';
          ctx.fillRect(46, 6, 4, 20);
        }
      })
  },

  // 88. Candy Castle
  {
    id: 'art-088-candy-castle',
    number: 88,
    name: 'Candy Castle',
    description: 'A grand fortress built of wafer biscuits, sugar icing walls, and gumdrop turrets.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#fbcfe8', '#f472b6', '#ec4899', '#ffffff', '#22c55e', '#eab308'],
    clues: [
      { atPercentage: 25, clueText: '🧁 Sugar glaze glistening like winter frost...' },
      { atPercentage: 50, clueText: '🏰 Wafer brick towers topped with gumdrop flags...' },
      { atPercentage: 75, clueText: '🍬 Royal palace of sweets... Candy Castle!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#fbcfe8'], [0.5, '#bae6fd'], [1, '#ffffff']],
        horizonY: 32,
        terrainStops: [[0, '#f472b6'], [1, '#db2777']],
        focal: (ctx) => {
          // Castle main block
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(36, 18, 24, 16);
          // Gumdrop turrets
          ctx.fillStyle = '#22c55e';
          ctx.beginPath(); ctx.arc(36, 16, 5, Math.PI, 0); ctx.fill();
          ctx.fillStyle = '#eab308';
          ctx.beginPath(); ctx.arc(60, 16, 5, Math.PI, 0); ctx.fill();
          // Chocolate gate
          ctx.fillStyle = '#451a03';
          ctx.fillRect(44, 24, 8, 10);
        }
      })
  },

  // 89. Floating Rubber Duck Universe
  {
    id: 'art-089-rubber-duck-universe',
    number: 89,
    name: 'Floating Rubber Duck Universe',
    description: 'Giant cheerful yellow rubber duckies orbiting planets in outer space among bubble clusters.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#fde047',
    palette: ['#020617', '#1e1b4b', '#fde047', '#f97316', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Deep cosmic stars floating alongside iridescent bubbles...' },
      { atPercentage: 50, clueText: '🐥 Bright yellow curve and an orange bill in zero gravity...' },
      { atPercentage: 75, clueText: '🛁 Squeaky bath companion of the stars... Rubber Duck Universe!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#0f172a'], [1, '#020617']],
        focal: (ctx) => {
          // Rubber duck body
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.ellipse(48, 30, 14, 10, 0, 0, Math.PI * 2); ctx.fill();
          // Head
          ctx.beginPath(); ctx.arc(38, 20, 7, 0, Math.PI * 2); ctx.fill();
          // Orange bill
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.ellipse(30, 21, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
          // Eye
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.arc(37, 18, 1.5, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 90. Magical Toy Shop
  {
    id: 'art-090-magical-toy-shop',
    number: 90,
    name: 'Magical Toy Shop',
    description: 'A cozy Victorian shop window filled with moving wooden nutcrackers, music boxes, and teddy bears.',
    category: 'fun-unexpected',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#dc2626',
    palette: ['#1c1917', '#78350f', '#dc2626', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🪵 Warm oak storefront trimmed in festive dark evergreen...' },
      { atPercentage: 50, clueText: '🧸 Moving wooden gears, plush teddy bears, and music boxes...' },
      { atPercentage: 75, clueText: '🎁 Enchanted toys springing to life... Magical Toy Shop!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1c1917'], [0.7, '#292524'], [1, '#451a03']],
        horizonY: 34,
        terrainStops: [[0, '#78350f'], [1, '#451a03']],
        focal: (ctx) => {
          // Shop display window
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(24, 14, 48, 22);
          // Wood framing
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 3;
          ctx.strokeRect(24, 14, 48, 22);
          // Teddy bear in window
          ctx.fillStyle = '#78350f';
          ctx.beginPath(); ctx.arc(48, 25, 5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(48, 32, 7, 0, Math.PI * 2); ctx.fill();
        }
      })
  }
];
