/**
 * Category 2 — Cute Animal Surprises (Artworks 11 to 20)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category2Artworks: Artwork[] = [
  // 11. Puppy in a Flower Field
  {
    id: 'art-011-puppy-flower-field',
    number: 11,
    name: 'Puppy in a Flower Field',
    description: 'A happy golden puppy frolicking through a sunlit field of colorful daisies and wildflowers.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f59e0b',
    palette: ['#38bdf8', '#bae6fd', '#16a34a', '#f59e0b', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌼 Sunny blue skies over bright yellow daisies...' },
      { atPercentage: 50, clueText: '🐾 Floppy ears bouncing through the green grass...' },
      { atPercentage: 75, clueText: '🐶 Wagging tail with joyful eyes... Puppy in flowers!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.7, '#bae6fd'], [1, '#fef08a']],
        celestial: { type: 'sun', x: 80, y: 12, r: 8, color: '#fde047', glowColor: 'rgba(253, 224, 71, 0.4)' },
        horizonY: 26,
        terrainStops: [[0, '#22c55e'], [0.5, '#16a34a'], [1, '#15803d']],
        focal: (ctx) => {
          // Puppy body
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.ellipse(48, 36, 9, 6, -0.1, 0, Math.PI * 2); ctx.fill();
          // Head & floppy ears
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath(); ctx.arc(40, 31, 5.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#b45309';
          ctx.beginPath(); ctx.ellipse(36, 32, 2.5, 5, 0.3, 0, Math.PI * 2); ctx.fill();
          // Snout & tongue
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(38, 33, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(38, 34, 1.5, 2.5);
          // Wagging tail
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.moveTo(56, 35); ctx.lineTo(62, 28); ctx.stroke();
        },
        foreground: (ctx, w) => {
          // Daisies
          for (let x = 6; x < w; x += 8) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.arc(x, 46 + ((x * 5) % 5), 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(x, 46 + ((x * 5) % 5), 1, 0, Math.PI * 2); ctx.fill();
          }
        }
      })
  },

  // 12. Curious Kitten and Butterflies
  {
    id: 'art-012-curious-kitten',
    number: 12,
    name: 'Curious Kitten and Butterflies',
    description: 'A playful kitten reaching up with tiny paws toward colorful fluttering butterflies.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#bae6fd', '#fbcfe8', '#86efac', '#f43f5e', '#fed7aa', '#1e293b'],
    clues: [
      { atPercentage: 25, clueText: '🌷 Soft pastel garden with sunny green hedges...' },
      { atPercentage: 50, clueText: '🦋 Fluttering pink and azure butterflies...' },
      { atPercentage: 75, clueText: '🐱 Reaching with tiny playful paws... Curious kitten!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#bae6fd'], [0.8, '#fbcfe8'], [1, '#fed7aa']],
        horizonY: 28,
        terrainStops: [[0, '#4ade80'], [1, '#16a34a']],
        focal: (ctx) => {
          // Kitten body
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath(); ctx.ellipse(50, 38, 7, 8, 0.2, 0, Math.PI * 2); ctx.fill();
          // Head looking up
          ctx.beginPath(); ctx.arc(46, 28, 5, 0, Math.PI * 2); ctx.fill();
          ctx.moveTo(42, 25); ctx.lineTo(41, 20); ctx.lineTo(45, 24);
          ctx.moveTo(47, 24); ctx.lineTo(50, 20); ctx.lineTo(50, 25);
          ctx.fill();
          // Paws raised
          ctx.fillRect(41, 23, 2.5, 4);
          // Butterflies
          ctx.fillStyle = '#ec4899';
          ctx.beginPath(); ctx.ellipse(38, 16, 3, 2, -0.4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.ellipse(58, 14, 3, 2, 0.3, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 13. Baby Elephant Waterfall
  {
    id: 'art-013-baby-elephant-waterfall',
    number: 13,
    name: 'Baby Elephant Waterfall',
    description: 'An adorable baby elephant playing in a crystal pool beneath a cascading jungle waterfall.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#0f766e', '#14b8a6', '#06b6d4', '#64748b', '#cbd5e1', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌿 Tropical jungle vines and misty cliff spray...' },
      { atPercentage: 50, clueText: '🌊 A roaring waterfall splashing into a clear pool...' },
      { atPercentage: 75, clueText: '🐘 Cute trunk spraying water... Baby Elephant Waterfall!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#042f2e'], [0.5, '#0d9488'], [1, '#2dd4bf']],
        horizonY: 26,
        terrainStops: [[0, '#06b6d4'], [0.6, '#0284c7'], [1, '#0369a1']],
        structures: (ctx) => {
          // Waterfall vertical stream
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(44, 4, 8, 26);
          ctx.fillStyle = '#a5f3fc';
          ctx.fillRect(42, 24, 12, 4);
        },
        focal: (ctx) => {
          // Baby elephant body
          ctx.fillStyle = '#94a3b8';
          ctx.beginPath(); ctx.ellipse(48, 38, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
          // Head & big ears
          ctx.beginPath(); ctx.arc(40, 34, 5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#64748b';
          ctx.beginPath(); ctx.ellipse(38, 33, 4, 6, 0.2, 0, Math.PI * 2); ctx.fill();
          // Little trunk spraying up
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.moveTo(37, 36); ctx.quadraticCurveTo(30, 36, 32, 28); ctx.stroke();
          // Water droplets from trunk
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(32, 25, 2, 2); ctx.fillRect(35, 24, 2, 2);
        }
      })
  },

  // 14. Panda Bamboo Garden
  {
    id: 'art-014-panda-bamboo-garden',
    number: 14,
    name: 'Panda Bamboo Garden',
    description: 'A chubby giant panda sitting comfortably among lush stalks of green bamboo.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#15803d',
    imageUrl: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?auto=format&fit=crop&w=1280&q=80',
    palette: ['#14532d', '#22c55e', '#86efac', '#0f172a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🎋 Tall green stalks swaying in misty mountain air...' },
      { atPercentage: 50, clueText: '🐼 Round black and white ears and chubby paws...' },
      { atPercentage: 75, clueText: '🎋 Happily munching fresh leaves... Panda Bamboo Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#dcfce7'], [0.6, '#bbf7d0'], [1, '#86efac']],
        horizonY: 26,
        terrainStops: [[0, '#16a34a'], [1, '#14532d']],
        structures: (ctx, w) => {
          // Bamboo stalks
          ctx.fillStyle = '#15803d';
          for (let x = 12; x < w; x += 18) {
            ctx.fillRect(x, 0, 3.5, 54);
          }
        },
        focal: (ctx) => {
          // Panda white round body
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.ellipse(48, 38, 12, 10, 0, 0, Math.PI * 2); ctx.fill();
          // Black arms & legs
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.ellipse(40, 42, 4, 3, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(56, 42, 4, 3, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillRect(40, 34, 16, 5);
          // Head
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(48, 27, 8, 0, Math.PI * 2); ctx.fill();
          // Black ears & eye patches
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.arc(42, 20, 3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(54, 20, 3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(44, 26, 2.5, 1.8, -0.3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(52, 26, 2.5, 1.8, 0.3, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 15. Penguin Northern Lights
  {
    id: 'art-015-penguin-northern-lights',
    number: 15,
    name: 'Penguin Northern Lights',
    description: 'Adorable tuxedo penguins huddled on glistening sea ice under shimmering polar aurora.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0284c7',
    palette: ['#020617', '#082f49', '#06b6d4', '#22d3ee', '#cbd5e1', '#f97316'],
    clues: [
      { atPercentage: 25, clueText: '❄️ Vast fields of glistening arctic sea ice...' },
      { atPercentage: 50, clueText: '🌌 Shimmering cyan curtains across the night...' },
      { atPercentage: 75, clueText: '🐧 Little tuxedo flippers waddling... Penguin Aurora!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#082f49'], [1, '#0e7490']],
        aurora: ['rgba(34, 211, 238, 0.5)', 'rgba(52, 211, 153, 0.4)'],
        stars: true,
        horizonY: 32,
        terrainStops: [[0, '#e2e8f0'], [0.5, '#f8fafc'], [1, '#cbd5e1']],
        focal: (ctx) => {
          // Two penguins
          [42, 54].forEach((px, i) => {
            const h = i === 0 ? 12 : 9;
            ctx.fillStyle = '#0f172a';
            ctx.beginPath(); ctx.ellipse(px, 42 - h * 0.5, 4, h * 0.5, 0, 0, Math.PI * 2); ctx.fill();
            // White belly
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.ellipse(px, 42 - h * 0.45, 2.5, h * 0.38, 0, 0, Math.PI * 2); ctx.fill();
            // Orange beak & feet
            ctx.fillStyle = '#f97316';
            ctx.fillRect(px - 1, 42 - h + 1, 2, 1.5);
            ctx.fillRect(px - 2, 42, 4, 1);
          });
        }
      })
  },

  // 16. Bunny Mushroom Village
  {
    id: 'art-016-bunny-mushroom-village',
    number: 16,
    name: 'Bunny Mushroom Village',
    description: 'A fluffy white bunny standing outside whimsical mushroom houses with tiny glowing windows.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f43f5e',
    palette: ['#1e1b4b', '#4338ca', '#f43f5e', '#fde047', '#86efac', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🍄 Giant red speckled mushroom roofs with chimneys...' },
      { atPercentage: 50, clueText: '🪟 Tiny warm golden windows glowing softly...' },
      { atPercentage: 75, clueText: '🐰 Long soft ears and a cotton tail... Bunny Village!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#1e1b4b'], [0.6, '#312e81'], [1, '#4338ca']],
        stars: true,
        horizonY: 30,
        terrainStops: [[0, '#15803d'], [1, '#064e3b']],
        structures: (ctx) => {
          // Mushroom house
          ctx.fillStyle = '#fef3c7';
          ctx.fillRect(24, 30, 14, 16);
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath(); ctx.arc(31, 30, 11, Math.PI, 0); ctx.fill();
          // White dots on cap
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(28, 25, 2, 0, Math.PI * 2); ctx.arc(34, 24, 2, 0, Math.PI * 2); ctx.fill();
          // Glowing window
          ctx.fillStyle = '#fde047';
          ctx.fillRect(28, 36, 4, 4);
        },
        focal: (ctx) => {
          // White bunny
          ctx.fillStyle = '#f8fafc';
          ctx.beginPath(); ctx.ellipse(54, 40, 5, 7, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(54, 31, 4, 0, Math.PI * 2); ctx.fill();
          // Long ears
          ctx.fillRect(52, 22, 1.8, 8);
          ctx.fillRect(55, 22, 1.8, 8);
          // Pink inner ear & nose
          ctx.fillStyle = '#f472b6';
          ctx.fillRect(54, 32, 1, 1);
        }
      })
  },

  // 17. Sea Turtle Reef
  {
    id: 'art-017-sea-turtle-reef',
    number: 17,
    name: 'Sea Turtle Reef',
    description: 'A gentle sea turtle gliding effortlessly above sunlit brain corals, sea fans, and schools of fish.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0d9488',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1280&q=80',
    palette: ['#0284c7', '#0d9488', '#14b8a6', '#f43f5e', '#ca8a04', '#064e3b'],
    clues: [
      { atPercentage: 25, clueText: '🌊 Sunbeams refracting through turquoise shallows...' },
      { atPercentage: 50, clueText: '🪸 Vibrant pink and orange coral formations...' },
      { atPercentage: 75, clueText: '🐢 Gliding with wide peaceful flippers... Sea Turtle Reef!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0369a1'], [0.5, '#0284c7'], [1, '#38bdf8']],
        horizonY: 18,
        terrainStops: [[0, '#0f766e'], [0.5, '#115e59'], [1, '#042f2e']],
        structures: (ctx, w, h) => {
          // Colorful corals along bottom
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath(); ctx.arc(16, 50, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#eab308';
          ctx.beginPath(); ctx.arc(80, 48, 7, 0, Math.PI * 2); ctx.fill();
        },
        focal: (ctx) => {
          // Sea turtle shell
          ctx.fillStyle = '#854d0e';
          ctx.beginPath(); ctx.ellipse(48, 28, 12, 8, 0.1, 0, Math.PI * 2); ctx.fill();
          // Head
          ctx.fillStyle = '#15803d';
          ctx.beginPath(); ctx.arc(36, 27, 4, 0, Math.PI * 2); ctx.fill();
          // Front flippers
          ctx.beginPath();
          ctx.ellipse(42, 22, 9, 3, -0.6, 0, Math.PI * 2);
          ctx.ellipse(54, 22, 9, 3, 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      })
  },

  // 18. Otter Floating in a River
  {
    id: 'art-018-otter-floating-river',
    number: 18,
    name: 'Otter Floating in a River',
    description: 'A cute river otter floating peacefully on its back with floating river lilies and water ripples.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0284c7',
    palette: ['#047857', '#0284c7', '#38bdf8', '#78350f', '#fef08a', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '💧 Gentle ripples across a quiet forest stream...' },
      { atPercentage: 50, clueText: '🪷 Floating river lily pads and white blossoms...' },
      { atPercentage: 75, clueText: '🦦 Floating on its back holding a sea stone... Cute Otter!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#065f46'], [0.7, '#047857'], [1, '#10b981']],
        horizonY: 18,
        terrainStops: [[0, '#0284c7'], [0.5, '#0369a1'], [1, '#0c4a6e']],
        focal: (ctx) => {
          // Water ripple rings
          ctx.strokeStyle = '#bae6fd';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(48, 34, 24, 8, 0, 0, Math.PI * 2); ctx.stroke();
          // Floating otter body
          ctx.fillStyle = '#78350f';
          ctx.beginPath(); ctx.ellipse(48, 34, 12, 5, 0.05, 0, Math.PI * 2); ctx.fill();
          // Cream belly & head
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath(); ctx.ellipse(46, 33, 8, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(38, 32, 4, 0, Math.PI * 2); ctx.fill();
          // Tiny paws holding shell
          ctx.fillStyle = '#fef08a';
          ctx.beginPath(); ctx.arc(46, 31, 2, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 19. Hedgehog Tea Party
  {
    id: 'art-019-hedgehog-tea-party',
    number: 19,
    name: 'Hedgehog Tea Party',
    description: 'A tiny sweet hedgehog sitting at a miniature wooden spool table enjoying warm tea and berries.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#d97706',
    palette: ['#fef3c7', '#fde68a', '#92400e', '#d97706', '#f43f5e', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '☕ A tiny wooden table set with miniature cups...' },
      { atPercentage: 50, clueText: '🍓 Fresh sweet red berries on a mossy coaster...' },
      { atPercentage: 75, clueText: '🦔 Soft prickly quills and a button nose... Hedgehog Tea!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#fef3c7'], [0.7, '#fde68a'], [1, '#fed7aa']],
        horizonY: 28,
        terrainStops: [[0, '#15803d'], [1, '#166534']],
        focal: (ctx) => {
          // Wooden spool table
          ctx.fillStyle = '#92400e';
          ctx.fillRect(56, 36, 16, 4);
          ctx.fillRect(62, 40, 4, 10);
          // Tiny teacup with rising steam
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(60, 32, 4, 4);
          // Hedgehog
          ctx.fillStyle = '#78350f';
          ctx.beginPath(); ctx.arc(40, 39, 9, 0, Math.PI * 2); ctx.fill();
          // Soft nose & face
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath(); ctx.arc(46, 39, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(49, 38, 2, 2);
        }
      })
  },

  // 20. Raccoon Treasure Hunt
  {
    id: 'art-020-raccoon-treasure-hunt',
    number: 20,
    name: 'Raccoon Treasure Hunt',
    description: 'A curious masked raccoon admiring a glowing shiny antique compass in the moonlit forest.',
    category: 'cute-animals',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#475569',
    palette: ['#0f172a', '#1e293b', '#64748b', '#e2e8f0', '#eab308', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Ancient tree roots illuminated by moonlight...' },
      { atPercentage: 50, clueText: '✨ A shiny golden compass radiating warm sparks...' },
      { atPercentage: 75, clueText: '🦝 Masked eyes and a striped ringed tail... Raccoon Hunt!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#090d16'], [0.6, '#1e293b'], [1, '#334155']],
        stars: true,
        horizonY: 32,
        terrainStops: [[0, '#064e3b'], [1, '#022c22']],
        focal: (ctx) => {
          // Raccoon body
          ctx.fillStyle = '#475569';
          ctx.beginPath(); ctx.ellipse(42, 38, 9, 7, -0.2, 0, Math.PI * 2); ctx.fill();
          // Head & bandit mask
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath(); ctx.arc(35, 33, 5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(32, 32, 6, 2.5);
          // Ringed tail
          ctx.fillStyle = '#475569';
          ctx.beginPath(); ctx.ellipse(54, 40, 7, 4, 0.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(52, 38, 2, 4);
          ctx.fillRect(56, 39, 2, 4);
          // Glowing treasure compass
          ctx.fillStyle = '#fde047';
          ctx.beginPath(); ctx.arc(30, 42, 3.5, 0, Math.PI * 2); ctx.fill();
        }
      })
  }
];
