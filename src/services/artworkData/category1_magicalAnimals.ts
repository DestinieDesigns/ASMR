/**
 * Category 1 — Magical Animals (Artworks 1 to 10)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category1Artworks: Artwork[] = [
  // 1. Moonlight Fox
  {
    id: 'art-001-moonlight-fox',
    number: 1,
    name: 'Moonlight Fox',
    description: 'A beautiful fox sitting on a hill beneath a giant glowing moon with floating fireflies.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1280&q=80',
    palette: ['#0f172a', '#3b0764', '#7c3aed', '#ea580c', '#fb923c', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Glowing in the moonlit twilight grass...' },
      { atPercentage: 50, clueText: '✨ Pointed ears and a bushy glowing tail...' },
      { atPercentage: 75, clueText: '🦊 Sitting beneath a giant full moon... A magical fox!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#09071b'], [0.5, '#1e1035'], [1, '#3b1d60']],
        stars: true,
        celestial: { type: 'moon', x: 70, y: 16, r: 12, color: '#fef9c3', glowColor: 'rgba(254, 240, 138, 0.4)' },
        horizonY: 34,
        terrainStops: [[0, '#064e3b'], [0.5, '#022c22'], [1, '#021812']],
        mountains: [
          { x: 25, y: 22, w: 40, h: 14, color: '#180d36' },
          { x: 60, y: 25, w: 48, h: 12, color: '#221447' }
        ],
        focal: (ctx) => {
          // Hill mound
          ctx.fillStyle = '#065f46';
          ctx.beginPath();
          ctx.ellipse(44, 40, 24, 12, 0, 0, Math.PI * 2);
          ctx.fill();
          // Fox body
          ctx.fillStyle = '#ea580c';
          ctx.beginPath();
          ctx.ellipse(45, 33, 10, 6, -0.2, 0, Math.PI * 2);
          ctx.fill();
          // Head & ears
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.arc(38, 26, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(35, 23);
          ctx.lineTo(33, 18);
          ctx.lineTo(38, 22);
          ctx.fill();
          // White muzzle & chest
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(36, 27, 2, 0, Math.PI * 2);
          ctx.arc(40, 31, 2.5, 0, Math.PI * 2);
          ctx.fill();
          // Bushy tail with white tip
          ctx.fillStyle = '#ea580c';
          ctx.beginPath();
          ctx.ellipse(55, 33, 8, 4, 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(62, 34, 2.2, 0, Math.PI * 2);
          ctx.fill();
        },
        foreground: (ctx, w) => {
          // Glowing fireflies and mushrooms in grass
          ctx.fillStyle = '#fef08a';
          for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(15 + i * 9, 44 + (i % 3) * 2, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        },
        particles: [
          { x: 30, y: 38, r: 1.5, color: '#67e8f9' },
          { x: 58, y: 26, r: 1.2, color: '#fef08a' },
          { x: 74, y: 36, r: 1.5, color: '#a78bfa' },
        ]
      })
  },

  // 2. Crystal Wolf
  {
    id: 'art-002-crystal-wolf',
    number: 2,
    name: 'Crystal Wolf',
    description: 'A majestic wolf on a snowy mountain surrounded by glowing blue crystals and northern lights.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1280&q=80',
    palette: ['#030712', '#0c4a6e', '#0284c7', '#38bdf8', '#a5f3fc', '#cbd5e1', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '❄️ Snowy mountain winds and northern skies...' },
      { atPercentage: 50, clueText: '💎 Radiant blue crystals sprouting from ice...' },
      { atPercentage: 75, clueText: '🐺 Howling under emerald aurora... A Crystal Wolf!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.4, '#082f49'], [1, '#0e7490']],
        aurora: ['rgba(56, 189, 248, 0.45)', 'rgba(52, 211, 153, 0.35)'],
        stars: true,
        horizonY: 30,
        terrainStops: [[0, '#38bdf8'], [0.3, '#cbd5e1'], [1, '#f1f5f9']],
        mountains: [
          { x: 20, y: 16, w: 42, h: 16, color: '#0f172a', snow: true },
          { x: 78, y: 18, w: 38, h: 14, color: '#1e293b', snow: true },
        ],
        focal: (ctx) => {
          // Standing cliff rock
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.moveTo(35, 48);
          ctx.lineTo(46, 32);
          ctx.lineTo(60, 32);
          ctx.lineTo(68, 50);
          ctx.fill();
          // Glowing crystals
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(37, 34); ctx.lineTo(39, 24); ctx.lineTo(41, 34); ctx.fill();
          ctx.moveTo(62, 34); ctx.lineTo(64, 23); ctx.lineTo(66, 34); ctx.fill();
          // Wolf body
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.ellipse(50, 27, 8, 4.5, -0.3, 0, Math.PI * 2);
          ctx.fill();
          // Head howling upwards
          ctx.beginPath();
          ctx.moveTo(46, 24);
          ctx.lineTo(42, 17);
          ctx.lineTo(47, 21);
          ctx.fill();
          // Crystal aura spine
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(49, 23, 2, 2);
          ctx.fillRect(52, 24, 2, 2);
        }
      })
  },

  // 3. Enchanted Deer
  {
    id: 'art-003-enchanted-deer',
    number: 3,
    name: 'Enchanted Deer',
    description: 'A graceful deer with glowing antlers inside a magical forest filled with glowing mushrooms.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#10b981',
    imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1280&q=80',
    palette: ['#022c22', '#064e3b', '#047857', '#10b981', '#6ee7b7', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Deep in an ancient moss-covered grove...' },
      { atPercentage: 50, clueText: '🍄 Glowing bioluminescent mushrooms...' },
      { atPercentage: 75, clueText: '🦌 Radiant branching golden antlers... Enchanted deer!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.6, '#064e3b'], [1, '#059669']],
        stars: true,
        horizonY: 28,
        terrainStops: [[0, '#047857'], [0.5, '#064e3b'], [1, '#022c22']],
        focal: (ctx) => {
          // Deer body
          ctx.fillStyle = '#92400e';
          ctx.beginPath();
          ctx.ellipse(48, 36, 9, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          // Legs
          ctx.fillStyle = '#78350f';
          ctx.fillRect(42, 40, 2, 8);
          ctx.fillRect(45, 40, 2, 8);
          ctx.fillRect(51, 40, 2, 8);
          ctx.fillRect(54, 40, 2, 8);
          // Neck & Head
          ctx.fillStyle = '#b45309';
          ctx.beginPath();
          ctx.ellipse(43, 29, 3.5, 6, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(40, 24, 4, 3, 0, 0, Math.PI * 2);
          ctx.fill();
          // Glowing Antlers
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(41, 22); ctx.lineTo(39, 14); ctx.lineTo(36, 11);
          ctx.moveTo(39, 17); ctx.lineTo(42, 12);
          ctx.moveTo(43, 22); ctx.lineTo(46, 14); ctx.lineTo(50, 11);
          ctx.moveTo(45, 17); ctx.lineTo(43, 12);
          ctx.stroke();
        },
        foreground: (ctx) => {
          // Glowing mushrooms
          ctx.fillStyle = '#ec4899';
          ctx.beginPath(); ctx.arc(20, 46, 3, Math.PI, 0); ctx.fill();
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(75, 45, 3.5, Math.PI, 0); ctx.fill();
        }
      })
  },

  // 4. Galaxy Cat
  {
    id: 'art-004-galaxy-cat',
    number: 4,
    name: 'Galaxy Cat',
    description: 'A fluffy cat on a windowsill gazing into deep space with planets, stars, and swirling galaxies.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#8b5cf6',
    palette: ['#09071b', '#2e1065', '#581c87', '#a855f7', '#f43f5e', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Looking out into deep cosmic nebulae...' },
      { atPercentage: 50, clueText: '🪟 Silhouetted window sill and warm curtains...' },
      { atPercentage: 75, clueText: '🐱 A fluffy feline gazing at the stars... Galaxy cat!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030014'], [0.5, '#1e0538'], [1, '#4c0519']],
        stars: true,
        celestial: { type: 'planet', x: 68, y: 16, r: 9, color: '#f43f5e', rings: true, glowColor: 'rgba(244, 63, 94, 0.4)' },
        nebula: [{ x: 30, y: 15, r: 18, color: 'rgba(168, 85, 247, 0.35)' }],
        horizonY: 38,
        terrainStops: [[0, '#1e1b4b'], [1, '#0f0e26']],
        focal: (ctx) => {
          // Window frame
          ctx.fillStyle = '#1e1b4b';
          ctx.fillRect(0, 38, 96, 16);
          ctx.fillRect(0, 0, 8, 54);
          ctx.fillRect(88, 0, 8, 54);
          // Cat silhouette on ledge
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.ellipse(48, 37, 7, 9, 0, 0, Math.PI * 2);
          ctx.fill();
          // Head & ears
          ctx.beginPath();
          ctx.arc(48, 27, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.moveTo(44, 24); ctx.lineTo(43, 19); ctx.lineTo(47, 23);
          ctx.moveTo(49, 23); ctx.lineTo(53, 19); ctx.lineTo(52, 24);
          ctx.fill();
          // Tail
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#0f172a';
          ctx.beginPath();
          ctx.moveTo(52, 42); ctx.quadraticCurveTo(62, 40, 60, 30);
          ctx.stroke();
        }
      })
  },

  // 5. Rainbow Butterfly Garden
  {
    id: 'art-005-rainbow-butterfly',
    number: 5,
    name: 'Rainbow Butterfly Garden',
    description: 'A giant detailed butterfly with rainbow wings surrounded by blooming garden flowers.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#0284c7', '#06b6d4', '#10b981', '#eab308', '#f97316', '#ec4899', '#8b5cf6'],
    clues: [
      { atPercentage: 25, clueText: '🌸 Lush meadow petals and sunny breeze...' },
      { atPercentage: 50, clueText: '🦋 Spreading iridescent wing patterns...' },
      { atPercentage: 75, clueText: '🌈 Giant butterfly in a blooming rainbow garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.5, '#bae6fd'], [1, '#fef08a']],
        horizonY: 26,
        terrainStops: [[0, '#15803d'], [0.6, '#166534'], [1, '#14532d']],
        focal: (ctx) => {
          // Central giant butterfly wings
          const wx = 48, wy = 24;
          // Rainbow gradients on wings
          ctx.fillStyle = '#ec4899';
          ctx.beginPath(); ctx.ellipse(wx - 10, wy - 6, 12, 8, -0.4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(wx + 10, wy - 6, 12, 8, 0.4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.ellipse(wx - 8, wy + 6, 9, 6, 0.4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(wx + 8, wy + 6, 9, 6, -0.4, 0, Math.PI * 2); ctx.fill();
          // Butterfly body
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.ellipse(wx, wy, 2, 10, 0, 0, Math.PI * 2); ctx.fill();
        },
        foreground: (ctx, w) => {
          // Wildflower dots
          const colors = ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8', '#ffffff'];
          for (let x = 6; x < w - 6; x += 6) {
            ctx.fillStyle = colors[(x * 3) % colors.length];
            ctx.beginPath(); ctx.arc(x, 44 + ((x * 7) % 6), 2.5, 0, Math.PI * 2); ctx.fill();
          }
        }
      })
  },

  // 6. Phoenix Sunrise
  {
    id: 'art-006-phoenix-sunrise',
    number: 6,
    name: 'Phoenix Sunrise',
    description: 'A glowing phoenix soaring upward through radiant golden, red, and crimson sun clouds.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ea580c',
    palette: ['#450a0a', '#991b1b', '#ea580c', '#f97316', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🔥 Blazing sky filled with golden embers...' },
      { atPercentage: 50, clueText: '🪶 Sweeping wings of incandescent flame...' },
      { atPercentage: 75, clueText: '☀️ Soaring toward the dawn... The Phoenix Sunrise!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#450a0a'], [0.4, '#b91c1c'], [0.8, '#ea580c'], [1, '#fde047']],
        celestial: { type: 'sun', x: 48, y: 38, r: 16, color: '#ffffff', glowColor: 'rgba(253, 224, 71, 0.6)' },
        horizonY: 42,
        terrainStops: [[0, '#7f1d1d'], [1, '#450a0a']],
        clouds: [
          { x: 20, y: 36, r: 10, color: 'rgba(234, 88, 12, 0.7)' },
          { x: 76, y: 34, r: 12, color: 'rgba(234, 88, 12, 0.7)' },
        ],
        focal: (ctx) => {
          // Phoenix soaring upwards
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.moveTo(48, 14); // beak
          ctx.lineTo(44, 24);
          ctx.lineTo(52, 24);
          ctx.fill();
          // Fiery wings
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.moveTo(48, 22);
          ctx.quadraticCurveTo(24, 16, 16, 26);
          ctx.quadraticCurveTo(34, 28, 46, 26);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(48, 22);
          ctx.quadraticCurveTo(72, 16, 80, 26);
          ctx.quadraticCurveTo(62, 28, 50, 26);
          ctx.fill();
          // Trailing tail feathers
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(48, 26); ctx.lineTo(45, 38);
          ctx.moveTo(48, 26); ctx.lineTo(48, 40);
          ctx.moveTo(48, 26); ctx.lineTo(51, 38);
          ctx.stroke();
        }
      })
  },

  // 7. Dragon's Crystal Cave
  {
    id: 'art-007-dragons-crystal-cave',
    number: 7,
    name: "Dragon's Crystal Cave",
    description: 'A friendly dragon curled peacefully in a glittering underground cavern full of amethyst and gold.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#9333ea',
    palette: ['#0f051d', '#3b0764', '#7e22ce', '#c084fc', '#eab308', '#22d3ee'],
    clues: [
      { atPercentage: 25, clueText: '💎 Underground cavern walls glittering with gems...' },
      { atPercentage: 50, clueText: '🐉 Curled emerald scales and gentle breathing smoke...' },
      { atPercentage: 75, clueText: '✨ A friendly beast resting on treasure... Dragon Cave!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#05020a'], [0.5, '#1e0538'], [1, '#3b0764']],
        horizonY: 32,
        terrainStops: [[0, '#4c1d95'], [0.6, '#2e1065'], [1, '#0f051d']],
        structures: (ctx) => {
          // Cave stalactites & crystals
          ctx.fillStyle = '#a855f7';
          ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(13, 14); ctx.lineTo(16, 0); ctx.fill();
          ctx.beginPath(); ctx.moveTo(76, 0); ctx.lineTo(80, 16); ctx.lineTo(84, 0); ctx.fill();
        },
        focal: (ctx) => {
          // Curled dragon
          ctx.fillStyle = '#059669';
          ctx.beginPath(); ctx.arc(48, 38, 14, 0, Math.PI * 2); ctx.fill();
          // Dragon head
          ctx.fillStyle = '#10b981';
          ctx.beginPath(); ctx.arc(40, 32, 6, 0, Math.PI * 2); ctx.fill();
          // Snout & cute horn
          ctx.fillStyle = '#fde047';
          ctx.fillRect(38, 27, 2, 4);
          // Gold coin hoard
          ctx.fillStyle = '#eab308';
          for (let i = 0; i < 18; i++) {
            ctx.beginPath();
            ctx.arc(32 + (i % 6) * 6, 46 + Math.floor(i / 6) * 3, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      })
  },

  // 8. Sleeping Red Panda
  {
    id: 'art-008-sleeping-red-panda',
    number: 8,
    name: 'Sleeping Red Panda',
    description: 'A cute red panda napping peacefully on a tree limb under cascading cherry blossoms.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ea580c',
    imageUrl: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=1280&q=80',
    palette: ['#fbcfe8', '#f472b6', '#78350f', '#ea580c', '#ffffff', '#14532d'],
    clues: [
      { atPercentage: 25, clueText: '🌸 Drifting soft pink petals in the spring breeze...' },
      { atPercentage: 50, clueText: '💤 A warm striped tail wrapped around a branch...' },
      { atPercentage: 75, clueText: '🐾 Sweetly snoozing in cherry blossoms... Red Panda!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#fdf2f8'], [0.6, '#fce7f3'], [1, '#fbcfe8']],
        horizonY: 34,
        terrainStops: [[0, '#15803d'], [1, '#14532d']],
        focal: (ctx) => {
          // Large tree branch
          ctx.fillStyle = '#78350f';
          ctx.beginPath();
          ctx.moveTo(0, 36); ctx.lineTo(96, 26); ctx.lineTo(96, 31); ctx.lineTo(0, 42);
          ctx.fill();
          // Red panda body
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.ellipse(48, 27, 10, 6, -0.1, 0, Math.PI * 2); ctx.fill();
          // Head resting
          ctx.fillStyle = '#c2410c';
          ctx.beginPath(); ctx.arc(38, 28, 4.5, 0, Math.PI * 2); ctx.fill();
          // White ear tufts & face markings
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(36, 25, 2, 2); ctx.fillRect(40, 25, 2, 2);
          // Ringed fluffy tail hanging down
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.ellipse(60, 34, 5, 9, 0.4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(57, 32, 5, 2);
          ctx.fillRect(60, 37, 5, 2);
        },
        foreground: (ctx) => {
          // Falling cherry blossom petals
          ctx.fillStyle = '#f472b6';
          for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.ellipse((i * 19) % 96, (i * 11) % 54, 2, 1.2, 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      })
  },

  // 9. Aurora Owl
  {
    id: 'art-009-aurora-owl',
    number: 9,
    name: 'Aurora Owl',
    description: 'A majestic white owl soaring through shimmering emerald and purple northern lights.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#10b981',
    palette: ['#020617', '#064e3b', '#059669', '#10b981', '#a78bfa', '#f8fafc'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Shimmering green curtains in the arctic midnight...' },
      { atPercentage: 50, clueText: '🪶 Silent white feathers gliding across the sky...' },
      { atPercentage: 75, clueText: '🦉 Golden eyes under the northern lights... Aurora Owl!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.4, '#0f172a'], [1, '#064e3b']],
        aurora: ['rgba(16, 185, 129, 0.6)', 'rgba(168, 85, 247, 0.4)'],
        stars: true,
        horizonY: 36,
        terrainStops: [[0, '#e2e8f0'], [0.5, '#cbd5e1'], [1, '#94a3b8']],
        mountains: [{ x: 30, y: 22, w: 50, h: 16, color: '#0f172a', snow: true }],
        focal: (ctx) => {
          // Owl body
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath(); ctx.ellipse(50, 22, 5, 7, 0, 0, Math.PI * 2); ctx.fill();
          // Large wings
          ctx.beginPath();
          ctx.ellipse(36, 20, 10, 4, 0.2, 0, Math.PI * 2);
          ctx.ellipse(64, 20, 10, 4, -0.2, 0, Math.PI * 2);
          ctx.fill();
          // Glowing amber eyes
          ctx.fillStyle = '#fde047';
          ctx.fillRect(48, 19, 1.5, 1.5);
          ctx.fillRect(51, 19, 1.5, 1.5);
        }
      })
  },

  // 10. Mystic Black Cat
  {
    id: 'art-010-mystic-black-cat',
    number: 10,
    name: 'Mystic Black Cat',
    description: 'A sleek black cat surrounded by glowing candles, crystals, and mystical purple smoke.',
    category: 'magical-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#7c3aed',
    palette: ['#090514', '#1e0836', '#4c1d95', '#a855f7', '#fde047', '#10b981'],
    clues: [
      { atPercentage: 25, clueText: '🕯️ Warm candlelight flickering in a wizard sanctuary...' },
      { atPercentage: 50, clueText: '🔮 Swirling purple smoke and amethyst crystals...' },
      { atPercentage: 75, clueText: '🐈‍⬛ Glowing emerald eyes in the shadows... Mystic Black Cat!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.6, '#2e1065'], [1, '#4c1d95']],
        horizonY: 34,
        terrainStops: [[0, '#3b0764'], [1, '#1e0836']],
        focal: (ctx) => {
          // Books & table surface
          ctx.fillStyle = '#1e1b4b';
          ctx.fillRect(10, 40, 76, 14);
          // Black cat sitting upright
          ctx.fillStyle = '#05020a';
          ctx.beginPath(); ctx.ellipse(48, 32, 6, 9, 0, 0, Math.PI * 2); ctx.fill();
          // Head
          ctx.beginPath(); ctx.arc(48, 22, 5, 0, Math.PI * 2); ctx.fill();
          // Pointed ears
          ctx.moveTo(44, 19); ctx.lineTo(43, 14); ctx.lineTo(47, 18);
          ctx.moveTo(49, 18); ctx.lineTo(53, 14); ctx.lineTo(52, 19);
          ctx.fill();
          // Piercing green eyes
          ctx.fillStyle = '#10b981';
          ctx.fillRect(46, 21, 1.5, 1.5);
          ctx.fillRect(49, 21, 1.5, 1.5);
          // Candles on sides
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(25, 34, 3, 8); ctx.fillRect(70, 35, 3, 7);
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.arc(26.5, 32, 2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(71.5, 33, 2, 0, Math.PI * 2); ctx.fill();
        }
      })
  }
];
