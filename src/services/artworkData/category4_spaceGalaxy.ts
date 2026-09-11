/**
 * Category 4 — Space & Galaxy (Artworks 31 to 40)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category4Artworks: Artwork[] = [
  // 31. Fox in Space
  {
    id: 'art-031-fox-in-space',
    number: 31,
    name: 'Fox in Space',
    description: 'A cozy orange fox wearing a glass bubble astronaut helmet floating weightlessly among planets.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    palette: ['#030712', '#1e1b4b', '#4338ca', '#ea580c', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Deep space abyss sparkling with distant constellations...' },
      { atPercentage: 50, clueText: '🪐 A glowing blue orb and glass astronaut bubble helmet...' },
      { atPercentage: 75, clueText: '🦊 Weightless orange tail floating among stars... Fox in Space!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030014'], [0.6, '#0f051d'], [1, '#1e1035']],
        stars: true,
        celestial: { type: 'planet', x: 78, y: 16, r: 8, color: '#67e8f9', rings: true },
        horizonY: 54,
        terrainStops: [[0, '#0f051d'], [1, '#030014']],
        focal: (ctx) => {
          // Weightless fox body
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.ellipse(46, 28, 9, 6, 0.4, 0, Math.PI * 2); ctx.fill();
          // Fluffy tail
          ctx.beginPath(); ctx.ellipse(36, 34, 8, 4, -0.5, 0, Math.PI * 2); ctx.fill();
          // Head
          ctx.fillStyle = '#f97316';
          ctx.beginPath(); ctx.arc(54, 24, 5, 0, Math.PI * 2); ctx.fill();
          // Glass bubble helmet
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(54, 23, 7.5, 0, Math.PI * 2); ctx.stroke();
          // Helmet reflection
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(52, 18, 2, 2);
        }
      })
  },

  // 32. Astronaut Garden
  {
    id: 'art-032-astronaut-garden',
    number: 32,
    name: 'Astronaut Garden',
    description: 'An intrepid explorer watering strange luminescent alien flowers under multiple moons.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#10b981',
    palette: ['#090514', '#3b0764', '#10b981', '#f43f5e', '#ffffff', '#cbd5e1'],
    clues: [
      { atPercentage: 25, clueText: '🌕 Alien horizon beneath twin glowing moons...' },
      { atPercentage: 50, clueText: '🌸 Bioluminescent alien blooms unfurling on purple soil...' },
      { atPercentage: 75, clueText: '🧑‍🚀 White spacesuit tending planetary flora... Astronaut Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090514'], [0.5, '#1e0836'], [1, '#3b0764']],
        stars: true,
        celestial: { type: 'moon', x: 26, y: 14, r: 8, color: '#fef08a' },
        horizonY: 34,
        terrainStops: [[0, '#4c1d95'], [1, '#1e0836']],
        focal: (ctx) => {
          // Astronaut in white suit
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(44, 26, 8, 14);
          // Helmet
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(48, 22, 4.5, 0, Math.PI * 2); ctx.fill();
          // Golden visor
          ctx.fillStyle = '#fde047';
          ctx.fillRect(48, 21, 3, 2.5);
          // Alien glowing flowers
          ctx.fillStyle = '#10b981';
          ctx.fillRect(60, 36, 1.5, 6);
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath(); ctx.arc(61, 35, 3, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 33. Planetary Sunset
  {
    id: 'art-033-planetary-sunset',
    number: 33,
    name: 'Planetary Sunset',
    description: 'An alien horizon watching three ringed gas giants rise above amethyst crystal dunes.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#c026d3',
    palette: ['#3b0764', '#701a75', '#c026d3', '#f43f5e', '#fde047', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '🪐 Vast purple sky with colossal ringed planets rising...' },
      { atPercentage: 50, clueText: '✨ Crystalline dunes refracting vibrant triple shadows...' },
      { atPercentage: 75, clueText: '🌄 Majestic cosmic twilight... Planetary Sunset!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1e0538'], [0.4, '#701a75'], [0.8, '#c026d3'], [1, '#fde047']],
        celestial: { type: 'planet', x: 48, y: 18, r: 12, color: '#f43f5e', rings: true },
        horizonY: 36,
        terrainStops: [[0, '#581c87'], [1, '#2e1065']],
        focal: (ctx) => {
          // Smaller moon on side
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.arc(22, 14, 5, 0, Math.PI * 2); ctx.fill();
          // Dune ridgelines
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(0, 42); ctx.quadraticCurveTo(40, 34, 96, 46); ctx.stroke();
        }
      })
  },

  // 34. Cosmic Butterfly
  {
    id: 'art-034-cosmic-butterfly',
    number: 34,
    name: 'Cosmic Butterfly',
    description: 'A stellar butterfly whose wings contain whole galaxies, glittering star clusters, and nebulae.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#8b5cf6',
    palette: ['#020617', '#1e1035', '#7c3aed', '#ec4899', '#38bdf8', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '✨ Swirling violet spiral nebulae and star clusters...' },
      { atPercentage: 50, clueText: '🌌 Wings spreading across millions of light years...' },
      { atPercentage: 75, clueText: '🦋 A celestial lepidopteran in the void... Cosmic Butterfly!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.6, '#0f051d'], [1, '#1e0836']],
        stars: true,
        nebula: [{ x: 48, y: 24, r: 24, color: 'rgba(236, 72, 153, 0.35)' }],
        horizonY: 54,
        terrainStops: [[0, '#0f051d'], [1, '#020617']],
        focal: (ctx) => {
          // Giant nebula wings
          ctx.fillStyle = '#7c3aed';
          ctx.beginPath(); ctx.ellipse(36, 22, 14, 9, -0.3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(60, 22, 14, 9, 0.3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.ellipse(38, 34, 10, 6, 0.4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(58, 34, 10, 6, -0.4, 0, Math.PI * 2); ctx.fill();
          // Star core body
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.ellipse(48, 27, 2, 9, 0, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 35. Moon Garden
  {
    id: 'art-035-moon-garden',
    number: 35,
    name: 'Moon Garden',
    description: 'An enchanted glass biodome garden growing silver roses directly on the cratered lunar surface.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#cbd5e1',
    palette: ['#020617', '#0f172a', '#64748b', '#cbd5e1', '#38bdf8', '#f43f5e'],
    clues: [
      { atPercentage: 25, clueText: '🌑 Grey lunar craters looking back at bright Earth...' },
      { atPercentage: 50, clueText: '🌐 A shimmering glass geodesic greenhouse dome...' },
      { atPercentage: 75, clueText: '🌹 Vibrant roses blooming in space... Moon Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#000000'], [0.7, '#020617'], [1, '#0f172a']],
        stars: true,
        celestial: { type: 'planet', x: 74, y: 14, r: 9, color: '#38bdf8' },
        horizonY: 34,
        terrainStops: [[0, '#475569'], [0.5, '#334155'], [1, '#1e293b']],
        focal: (ctx) => {
          // Glass dome
          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(44, 34, 16, Math.PI, 0); ctx.stroke();
          // Rose bushes inside
          ctx.fillStyle = '#15803d';
          ctx.beginPath(); ctx.arc(44, 34, 10, Math.PI, 0); ctx.fill();
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(40, 27, 3, 3);
          ctx.fillRect(46, 28, 3, 3);
        }
      })
  },

  // 36. Floating Space Islands
  {
    id: 'art-036-floating-space-islands',
    number: 36,
    name: 'Floating Space Islands',
    description: 'Enchanted mossy rock islands floating among cosmic dust, with waterfalls falling into the void.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#6366f1',
    palette: ['#030712', '#1e1b4b', '#4338ca', '#10b981', '#38bdf8', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Cosmic void with purple stardust drifting...' },
      { atPercentage: 50, clueText: '⛰️ Giant inverted rock peaks floating weightlessly...' },
      { atPercentage: 75, clueText: '💧 Waterfalls spilling into eternity... Space Islands!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030014'], [0.5, '#0f0a2a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#0f0a2a'], [1, '#030014']],
        focal: (ctx) => {
          // Main floating island
          ctx.fillStyle = '#15803d';
          ctx.fillRect(36, 26, 26, 3);
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.moveTo(36, 29); ctx.lineTo(62, 29); ctx.lineTo(49, 44);
          ctx.fill();
          // Waterfall falling into space
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(44, 28, 3, 20);
        }
      })
  },

  // 37. Galaxy Dragon
  {
    id: 'art-037-galaxy-dragon',
    number: 37,
    name: 'Galaxy Dragon',
    description: 'An immense starry dragon soaring between nebulas, crowned with a comet horn.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#a855f7',
    palette: ['#020617', '#1e1035', '#6b21a8', '#a855f7', '#38bdf8', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '✨ A river of stardust curving across cosmic clouds...' },
      { atPercentage: 50, clueText: '🐉 Winged celestial claws and a blazing comet crest...' },
      { atPercentage: 75, clueText: '🌌 Giant serpentine guardian of galaxies... Galaxy Dragon!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f051d'], [1, '#2e1065']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#0f051d'], [1, '#020617']],
        focal: (ctx) => {
          // Curving dragon body
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(18, 38);
          ctx.bezierCurveTo(34, 18, 56, 42, 76, 22);
          ctx.stroke();
          // Wings
          ctx.fillStyle = '#67e8f9';
          ctx.beginPath();
          ctx.moveTo(52, 26); ctx.lineTo(44, 10); ctx.lineTo(60, 18);
          ctx.fill();
          // Horn & glowing eye
          ctx.fillStyle = '#fde047';
          ctx.fillRect(76, 18, 2, 2);
        }
      })
  },

  // 38. Saturn Window
  {
    id: 'art-038-saturn-window',
    number: 38,
    name: 'Saturn Window',
    description: 'A warm cozy bedroom view overlooking the majestic golden rings of Saturn.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#020617', '#1e1b4b', '#eab308', '#fef08a', '#78350f', '#f43f5e'],
    clues: [
      { atPercentage: 25, clueText: '🪐 Giant golden gas rings spanning across the void...' },
      { atPercentage: 50, clueText: '🪟 Wooden window framing a breathtaking cosmic view...' },
      { atPercentage: 75, clueText: '☕ Cozy room observing the ringed giant... Saturn Window!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#000000'], [0.6, '#08061a'], [1, '#1e1233']],
        stars: true,
        celestial: { type: 'planet', x: 48, y: 22, r: 11, color: '#fef08a', rings: true },
        horizonY: 38,
        terrainStops: [[0, '#3f210d'], [1, '#1c0f06']],
        focal: (ctx) => {
          // Window ledge & warm mug
          ctx.fillStyle = '#78350f';
          ctx.fillRect(0, 38, 96, 16);
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(44, 34, 6, 5);
        }
      })
  },

  // 39. Space Cat
  {
    id: 'art-039-space-cat',
    number: 39,
    name: 'Space Cat',
    description: 'A cute tabby cat floating in a miniature astronaut suit chasing celestial laser stars.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#030712', '#1e1b4b', '#f59e0b', '#ffffff', '#38bdf8', '#f43f5e'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Distant galaxies and twinkling laser star-bursts...' },
      { atPercentage: 50, clueText: '🐾 Paws in tiny white astronaut mittens...' },
      { atPercentage: 75, clueText: '🐱 Bubble helmet and swishing tail... Space Cat!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030712'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        horizonY: 54,
        terrainStops: [[0, '#0f172a'], [1, '#030712']],
        focal: (ctx) => {
          // White spacesuit body
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.ellipse(48, 28, 8, 10, 0.2, 0, Math.PI * 2); ctx.fill();
          // Cat face inside bubble
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(47, 21, 4.5, 0, Math.PI * 2); ctx.fill();
          // Bubble helmet
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(47, 21, 7, 0, Math.PI * 2); ctx.stroke();
        }
      })
  },

  // 40. Shooting Star Mountain
  {
    id: 'art-040-shooting-star-mountain',
    number: 40,
    name: 'Shooting Star Mountain',
    description: 'A dramatic alpine peak bathed in the light of a radiant meteor shower and shooting stars.',
    category: 'space-galaxy',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#020617', '#0c4a6e', '#0284c7', '#38bdf8', '#fde047', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌠 Brilliant silver trails slicing across the cosmos...' },
      { atPercentage: 50, clueText: '🏔️ Jagged snowy alpine peaks reflecting meteors...' },
      { atPercentage: 75, clueText: '✨ A shower of wishes from the peak... Shooting Star Mountain!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#082f49'], [1, '#0e7490']],
        stars: true,
        horizonY: 34,
        terrainStops: [[0, '#0f172a'], [0.6, '#020617'], [1, '#000000']],
        mountains: [{ x: 48, y: 16, w: 56, h: 22, color: '#1e293b', snow: true }],
        focal: (ctx) => {
          // Shooting star streaks
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          [[20, 8, 38, 18], [60, 6, 78, 16], [40, 4, 55, 14]].forEach(([x1, y1, x2, y2]) => {
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          });
        }
      })
  }
];
