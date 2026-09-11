/**
 * Category 8 — Epic & Dramatic (Artworks 71 to 80)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category8Artworks: Artwork[] = [
  // 71. Volcano Dragon
  {
    id: 'art-071-volcano-dragon',
    number: 71,
    name: 'Volcano Dragon',
    description: 'An immense crimson wyrm soaring above an erupting caldera spewing molten lava and ash.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ef4444',
    palette: ['#450a0a', '#7f1d1d', '#dc2626', '#f97316', '#fde047', '#1c1917'],
    clues: [
      { atPercentage: 25, clueText: '🌋 Dark billowing ash clouds streaked with fiery magma...' },
      { atPercentage: 50, clueText: '🔥 Rivers of incandescent molten rock cascading down...' },
      { atPercentage: 75, clueText: '🐉 Winged demon of flame circling the caldera... Volcano Dragon!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1c1917'], [0.4, '#450a0a'], [1, '#dc2626']],
        horizonY: 34,
        terrainStops: [[0, '#292524'], [1, '#1c1917']],
        mountains: [{ x: 48, y: 20, w: 70, h: 18, color: '#1c1917' }],
        focal: (ctx) => {
          // Volcano crater lava pool
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.ellipse(48, 28, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
          // Flying Dragon
          ctx.fillStyle = '#dc2626';
          ctx.beginPath(); ctx.ellipse(48, 14, 6, 3, -0.2, 0, Math.PI * 2); ctx.fill();
          // Wings
          ctx.beginPath();
          ctx.moveTo(48, 14); ctx.lineTo(38, 4); ctx.lineTo(46, 12);
          ctx.moveTo(48, 14); ctx.lineTo(58, 4); ctx.lineTo(50, 12);
          ctx.fill();
        }
      })
  },

  // 72. Storm Castle
  {
    id: 'art-072-storm-castle',
    number: 72,
    name: 'Storm Castle',
    description: 'A Gothic castle towering on a sea cliff while violent lightning cracks across tempestuous clouds.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#6366f1',
    palette: ['#030712', '#1e1b4b', '#4338ca', '#fde047', '#64748b', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '⚡ Ominous dark thunderheads illuminated by flashing forks...' },
      { atPercentage: 50, clueText: '🏰 High gothic spires standing defiant against gale winds...' },
      { atPercentage: 75, clueText: '⚡ Lightning strikes behind the fortress... Storm Castle!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        lightning: true,
        horizonY: 34,
        terrainStops: [[0, '#0f172a'], [1, '#020617']],
        focal: (ctx) => {
          // Castle cliff
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(36, 18, 24, 18);
          // High spires
          ctx.fillRect(38, 10, 4, 16);
          ctx.fillRect(54, 10, 4, 16);
        }
      })
  },

  // 73. Fire and Ice
  {
    id: 'art-073-fire-and-ice',
    number: 73,
    name: 'Fire and Ice',
    description: 'A mythic landscape split down the center between blazing fiery canyons and crystalline frozen glaciers.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#450a0a', '#ea580c', '#fde047', '#0284c7', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌓 A world torn in two by opposing cosmic elements...' },
      { atPercentage: 50, clueText: '🔥 Molten embers raging on the left, frost on the right...' },
      { atPercentage: 75, clueText: '❄️ Clashing glacier and volcano... Fire and Ice!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1c1917'], [0.5, '#7f1d1d'], [1, '#0369a1']],
        horizonY: 30,
        terrainStops: [[0, '#0f172a'], [1, '#020617']],
        focal: (ctx, w, h) => {
          // Left fire side
          ctx.fillStyle = '#ea580c';
          ctx.fillRect(0, 30, w * 0.5, h - 30);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(10, 38, 28, 4);
          // Right ice side
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(w * 0.5, 30, w * 0.5, h - 30);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(58, 38, 28, 4);
        }
      })
  },

  // 74. Thunder Wolf
  {
    id: 'art-074-thunder-wolf',
    number: 74,
    name: 'Thunder Wolf',
    description: 'An elemental wolf with crackling electrical fur standing tall as thunder shakes the mountain peak.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#fde047',
    palette: ['#020617', '#1e1b4b', '#fde047', '#ffffff', '#64748b'],
    clues: [
      { atPercentage: 25, clueText: '⚡ Stormy purple thunderheads crackling with static energy...' },
      { atPercentage: 50, clueText: '🐺 Jagged blue-white electrical arcs along a furry spine...' },
      { atPercentage: 75, clueText: '⚡ Howling with the voice of thunder... Thunder Wolf!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#1e1b4b'], [1, '#312e81']],
        lightning: true,
        horizonY: 32,
        terrainStops: [[0, '#1e293b'], [1, '#0f172a']],
        focal: (ctx) => {
          // Wolf body
          ctx.fillStyle = '#475569';
          ctx.beginPath(); ctx.ellipse(48, 28, 9, 6, -0.2, 0, Math.PI * 2); ctx.fill();
          // Head howling
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath(); ctx.arc(40, 22, 4.5, 0, Math.PI * 2); ctx.fill();
          // Electric lightning mane
          ctx.fillStyle = '#fde047';
          ctx.fillRect(44, 21, 3, 3);
          ctx.fillRect(48, 22, 3, 3);
        }
      })
  },

  // 75. Ocean Storm
  {
    id: 'art-075-ocean-storm',
    number: 75,
    name: 'Ocean Storm',
    description: 'A terrifying, awe-inspiring tidal wave crashing under black skies with frothing white crests.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0284c7',
    palette: ['#020617', '#0f172a', '#0369a1', '#0284c7', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌊 Massive towering wall of dark churning seawater...' },
      { atPercentage: 50, clueText: '💨 Roaring hurricane winds tearing spray from the crest...' },
      { atPercentage: 75, clueText: '🌊 A colossal tsunami curl... Ocean Storm!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e293b']],
        rain: true,
        horizonY: 34,
        terrainStops: [[0, '#0284c7'], [1, '#0369a1']],
        focal: (ctx) => {
          // Giant curl wave
          ctx.fillStyle = '#0369a1';
          ctx.beginPath();
          ctx.moveTo(10, 54);
          ctx.bezierCurveTo(30, 14, 70, 14, 80, 28);
          ctx.lineTo(84, 54);
          ctx.fill();
          // White foam crest
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(76, 22, 6, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 76. Solar Phoenix
  {
    id: 'art-076-solar-phoenix',
    number: 76,
    name: 'Solar Phoenix',
    description: 'The great immortal bird spreading gigantic wings directly in front of the blinding solar corona.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#450a0a', '#b91c1c', '#f97316', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '☀️ Blinding solar flares radiating from the center...' },
      { atPercentage: 50, clueText: '🪶 Vast incandescent plumage burning in the corona...' },
      { atPercentage: 75, clueText: '🔥 Reborn inside the star... Solar Phoenix!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#450a0a'], [0.5, '#991b1b'], [1, '#ea580c']],
        celestial: { type: 'sun', x: 48, y: 26, r: 16, color: '#ffffff', glowColor: 'rgba(253, 224, 71, 0.7)' },
        horizonY: 54,
        terrainStops: [[0, '#ea580c'], [1, '#450a0a']],
        focal: (ctx) => {
          // Phoenix silhouette directly over sun
          ctx.fillStyle = '#000000';
          ctx.beginPath(); ctx.ellipse(48, 26, 3, 8, 0, 0, Math.PI * 2); ctx.fill();
          // Wings
          ctx.beginPath();
          ctx.moveTo(48, 24); ctx.quadraticCurveTo(24, 14, 18, 28); ctx.lineTo(46, 27);
          ctx.moveTo(48, 24); ctx.quadraticCurveTo(72, 14, 78, 28); ctx.lineTo(50, 27);
          ctx.fill();
        }
      })
  },

  // 77. Crystal Warrior
  {
    id: 'art-077-crystal-warrior',
    number: 77,
    name: 'Crystal Warrior',
    description: 'A champion in gleaming diamond armor holding aloft a glowing broadsword on a mountain precipice.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#082f49', '#0284c7', '#38bdf8', '#f8fafc', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🏔️ High windswept crag overlooking an endless abyss...' },
      { atPercentage: 50, clueText: '🛡️ Gleaming plate armor catching prismatic blue highlights...' },
      { atPercentage: 75, clueText: '⚔️ Sword of light raised high... Crystal Warrior!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#082f49'], [1, '#0e7490']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#1e293b'], [1, '#0f172a']],
        focal: (ctx) => {
          // Warrior
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(45, 24, 6, 12);
          // Helmet
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(48, 20, 3, 0, Math.PI * 2); ctx.fill();
          // Raised glowing sword
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(52, 10, 2, 16);
          ctx.fillStyle = '#fde047';
          ctx.fillRect(50, 16, 6, 2);
        }
      })
  },

  // 78. Dragon Eclipse
  {
    id: 'art-078-dragon-eclipse',
    number: 78,
    name: 'Dragon Eclipse',
    description: 'A magnificent black wyvern silhouetted against a solar eclipse ring of fire in the twilight sky.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ea580c',
    palette: ['#030712', '#1c1917', '#ea580c', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌑 Golden ring of fire crowning a blackened sun...' },
      { atPercentage: 50, clueText: '🐉 Massive bat-like wings eclipsing the solar corona...' },
      { atPercentage: 75, clueText: '🔥 Horned wyvern against the eclipse... Dragon Eclipse!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#000000'], [0.5, '#180a04'], [1, '#431407']],
        celestial: { type: 'eclipse', x: 48, y: 22, r: 14, color: '#fde047', glowColor: 'rgba(234, 88, 12, 0.6)' },
        horizonY: 42,
        terrainStops: [[0, '#1c1917'], [1, '#0c0a09']],
        focal: (ctx) => {
          // Dragon in front of eclipse
          ctx.fillStyle = '#000000';
          ctx.beginPath(); ctx.ellipse(48, 22, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
          // Wings
          ctx.beginPath();
          ctx.moveTo(48, 20); ctx.lineTo(26, 12); ctx.lineTo(44, 24);
          ctx.moveTo(48, 20); ctx.lineTo(70, 12); ctx.lineTo(52, 24);
          ctx.fill();
        }
      })
  },

  // 79. Frozen Castle
  {
    id: 'art-079-frozen-castle',
    number: 79,
    name: 'Frozen Castle',
    description: 'An immense citadel carved from perpetual turquoise glacier ice surrounded by howling blizzards.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#082f49', '#0284c7', '#38bdf8', '#a5f3fc', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '❄️ Howling glacial winds carrying stinging ice crystals...' },
      { atPercentage: 50, clueText: '🏰 Spires sculpted from solid blue mountain ice...' },
      { atPercentage: 75, clueText: '👑 Imperial winter fortress... Frozen Castle!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#082f49'], [0.5, '#0284c7'], [1, '#38bdf8']],
        horizonY: 32,
        terrainStops: [[0, '#e2e8f0'], [1, '#94a3b8']],
        focal: (ctx) => {
          // Ice Castle
          ctx.fillStyle = '#a5f3fc';
          ctx.fillRect(36, 16, 24, 18);
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.moveTo(34, 16); ctx.lineTo(42, 6); ctx.lineTo(50, 16); ctx.fill();
          ctx.beginPath(); ctx.moveTo(46, 16); ctx.lineTo(54, 6); ctx.lineTo(62, 16); ctx.fill();
        }
      })
  },

  // 80. Firefly Storm
  {
    id: 'art-080-firefly-storm',
    number: 80,
    name: 'Firefly Storm',
    description: 'A swirling vortex of tens of thousands of golden fireflies illuminating the dark heart of a forest.',
    category: 'epic-dramatic',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#fde047',
    palette: ['#021812', '#064e3b', '#fde047', '#fef08a', '#10b981'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Deep dark midnight forest shrouded in silence...' },
      { atPercentage: 50, clueText: '✨ Thousands of golden sparks beginning to spiral...' },
      { atPercentage: 75, clueText: '🌪️ A swirling luminous tornado of light... Firefly Storm!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#021812'], [0.5, '#064e3b'], [1, '#022c22']],
        horizonY: 34,
        terrainStops: [[0, '#064e3b'], [1, '#021812']],
        focal: (ctx) => {
          // Spiral of fireflies
          ctx.fillStyle = '#fde047';
          for (let i = 0; i < 40; i++) {
            const angle = i * 0.4;
            const r = 4 + i * 0.7;
            const fx = 48 + Math.cos(angle) * r;
            const fy = 28 + Math.sin(angle) * (r * 0.6);
            ctx.beginPath(); ctx.arc(fx, fy, 1.2, 0, Math.PI * 2); ctx.fill();
          }
        }
      })
  }
];
