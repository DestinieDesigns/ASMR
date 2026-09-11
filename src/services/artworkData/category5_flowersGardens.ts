/**
 * Category 5 — Flowers & Gardens (Artworks 41 to 50)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category5Artworks: Artwork[] = [
  // 41. Secret Rose Garden
  {
    id: 'art-041-secret-rose-garden',
    number: 41,
    name: 'Secret Rose Garden',
    description: 'An overgrown stone archway dripping with velvety red and crimson roses into a secluded glade.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#e11d48',
    palette: ['#064e3b', '#15803d', '#9f1239', '#e11d48', '#fb7185', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌿 Weathered stone archway tangled in rich briars...' },
      { atPercentage: 50, clueText: '🌹 Velvety crimson petals opening to morning dew...' },
      { atPercentage: 75, clueText: '🗝️ A hidden sanctuary of blooms... Secret Rose Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#dbeafe'], [0.7, '#fef3c7'], [1, '#ffedd5']],
        horizonY: 26,
        terrainStops: [[0, '#16a34a'], [1, '#14532d']],
        focal: (ctx) => {
          // Stone arch
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 6;
          ctx.beginPath(); ctx.arc(48, 32, 18, Math.PI, 0); ctx.stroke();
          // Rose clusters
          const rPos = [[32, 28], [36, 18], [48, 14], [60, 18], [64, 28]];
          rPos.forEach(([rx, ry]) => {
            ctx.fillStyle = '#e11d48';
            ctx.beginPath(); ctx.arc(rx, ry, 3.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fb7185';
            ctx.beginPath(); ctx.arc(rx, ry, 1.5, 0, Math.PI * 2); ctx.fill();
          });
        }
      })
  },

  // 42. Cherry Blossom Lake
  {
    id: 'art-042-cherry-blossom-lake',
    number: 42,
    name: 'Cherry Blossom Lake',
    description: 'Ancient sakura trees in full pink bloom leaning over a tranquil mountain lake reflecting Mt. Fuji.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f472b6',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1280&q=80',
    palette: ['#e0f2fe', '#fbcfe8', '#f472b6', '#db2777', '#0284c7', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🏔️ Snow-capped mountain peak reflecting in still waters...' },
      { atPercentage: 50, clueText: '🌸 Canopies of soft pink blossoms swaying gracefully...' },
      { atPercentage: 75, clueText: '🛶 Petals floating on glassy water... Cherry Blossom Lake!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#bae6fd'], [0.6, '#fbcfe8'], [1, '#fce7f3']],
        horizonY: 26,
        terrainStops: [[0, '#38bdf8'], [0.5, '#0284c7'], [1, '#0369a1']],
        mountains: [{ x: 48, y: 12, w: 44, h: 16, color: '#64748b', snow: true }],
        waterReflect: true,
        focal: (ctx) => {
          // Sakura tree trunk on left
          ctx.strokeStyle = '#451a03';
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(10, 54); ctx.quadraticCurveTo(16, 32, 28, 20); ctx.stroke();
          // Sakura blossom cloud
          ctx.fillStyle = '#f472b6';
          ctx.beginPath();
          ctx.arc(28, 16, 12, 0, Math.PI * 2);
          ctx.arc(36, 14, 10, 0, Math.PI * 2);
          ctx.arc(22, 18, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      })
  },

  // 43. Giant Sunflower Field
  {
    id: 'art-043-giant-sunflower-field',
    number: 43,
    name: 'Giant Sunflower Field',
    description: 'An endless golden sea of smiling sunflowers reaching up towards a vivid azure summer sky.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#0284c7', '#38bdf8', '#15803d', '#eab308', '#fef08a', '#78350f'],
    clues: [
      { atPercentage: 25, clueText: '☀️ Warm brilliant blue summer sky with light breeze...' },
      { atPercentage: 50, clueText: '🌻 Broad emerald leaves and tall green stalks...' },
      { atPercentage: 75, clueText: '💛 Golden petals turning to the sun... Sunflower Field!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0284c7'], [0.7, '#38bdf8'], [1, '#bae6fd']],
        celestial: { type: 'sun', x: 78, y: 12, r: 9, color: '#fef08a' },
        horizonY: 24,
        terrainStops: [[0, '#15803d'], [1, '#166534']],
        focal: (ctx, w) => {
          // Sunflowers row
          for (let x = 8; x < w; x += 10) {
            const h = 26 + ((x * 7) % 8);
            // Stalk
            ctx.fillStyle = '#15803d';
            ctx.fillRect(x - 0.5, 54 - h, 2, h);
            // Yellow petals
            ctx.fillStyle = '#fde047';
            ctx.beginPath(); ctx.arc(x, 54 - h, 5, 0, Math.PI * 2); ctx.fill();
            // Brown seed center
            ctx.fillStyle = '#78350f';
            ctx.beginPath(); ctx.arc(x, 54 - h, 2.5, 0, Math.PI * 2); ctx.fill();
          }
        }
      })
  },

  // 44. Magical Mushroom Forest
  {
    id: 'art-044-magical-mushroom-forest',
    number: 44,
    name: 'Magical Mushroom Forest',
    description: 'Bioluminescent mushrooms glowing in neon blues, violets, and teals under towering ancient trees.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#a855f7',
    palette: ['#05020a', '#1e0836', '#064e3b', '#a855f7', '#06b6d4', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🌲 Towering ancient tree trunks in twilight mist...' },
      { atPercentage: 50, clueText: '✨ Spores floating like miniature glowing fireflies...' },
      { atPercentage: 75, clueText: '🍄 Neon blue and purple caps... Mushroom Forest!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#05020a'], [0.5, '#1e0836'], [1, '#064e3b']],
        stars: true,
        horizonY: 28,
        terrainStops: [[0, '#022c22'], [1, '#05020a']],
        focal: (ctx) => {
          // Giant mushroom center
          ctx.fillStyle = '#fdf4ff';
          ctx.fillRect(45, 26, 6, 20);
          ctx.fillStyle = '#a855f7';
          ctx.beginPath(); ctx.arc(48, 26, 14, Math.PI, 0); ctx.fill();
          // Glowing spots
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(43, 21, 2, 0, Math.PI * 2); ctx.arc(52, 20, 2, 0, Math.PI * 2); ctx.fill();
          // Smaller cyan mushroom on left
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(26, 38, 7, Math.PI, 0); ctx.fill();
        }
      })
  },

  // 45. Butterfly Meadow
  {
    id: 'art-045-butterfly-meadow',
    number: 45,
    name: 'Butterfly Meadow',
    description: 'A breezy hillside meadow alive with hundreds of colorful butterflies swirling around wildflowers.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f43f5e',
    palette: ['#38bdf8', '#86efac', '#22c55e', '#f43f5e', '#a855f7', '#fde047'],
    clues: [
      { atPercentage: 25, clueText: '🌾 Rolling green hills dancing in warm sunbeams...' },
      { atPercentage: 50, clueText: '🌷 Wild poppies and lupines swaying in chorus...' },
      { atPercentage: 75, clueText: '🦋 Swarms of fluttering wings... Butterfly Meadow!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.7, '#bae6fd'], [1, '#dcfce7']],
        horizonY: 26,
        terrainStops: [[0, '#22c55e'], [0.6, '#16a34a'], [1, '#15803d']],
        focal: (ctx) => {
          // Butterflies fluttering
          const bColors = ['#f43f5e', '#a855f7', '#eab308', '#06b6d4'];
          [[24, 18], [42, 14], [58, 20], [74, 16]].forEach(([bx, by], i) => {
            ctx.fillStyle = bColors[i % bColors.length];
            ctx.beginPath();
            ctx.ellipse(bx - 2, by, 3, 2, -0.3, 0, Math.PI * 2);
            ctx.ellipse(bx + 2, by, 3, 2, 0.3, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      })
  },

  // 46. Lavender Cottage
  {
    id: 'art-046-lavender-cottage',
    number: 46,
    name: 'Lavender Cottage',
    description: 'A stone fairy-tale cottage with chimney smoke nestled amid rolling purple lavender fields.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#8b5cf6',
    palette: ['#bae6fd', '#fed7aa', '#8b5cf6', '#6d28d9', '#78350f', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🪻 Endless striped purple rows of fragrant lavender...' },
      { atPercentage: 50, clueText: '🏡 A rustic stone cottage with curl of chimney smoke...' },
      { atPercentage: 75, clueText: '✨ Sunset Provence countryside... Lavender Cottage!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#bae6fd'], [0.6, '#fde68a'], [1, '#fed7aa']],
        horizonY: 24,
        terrainStops: [[0, '#7c3aed'], [0.5, '#6d28d9'], [1, '#581c87']],
        focal: (ctx) => {
          // Stone cottage
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(40, 20, 16, 12);
          // Red-brown roof
          ctx.fillStyle = '#78350f';
          ctx.beginPath(); ctx.moveTo(38, 20); ctx.lineTo(48, 12); ctx.lineTo(58, 20); ctx.fill();
          // Chimney
          ctx.fillRect(52, 11, 3, 5);
          // Door
          ctx.fillStyle = '#451a03';
          ctx.fillRect(46, 26, 4, 6);
        }
      })
  },

  // 47. Secret Garden Gate
  {
    id: 'art-047-secret-garden-gate',
    number: 47,
    name: 'Secret Garden Gate',
    description: 'An ornate wrought-iron gate cracked slightly open into an overgrown world of wonder.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#10b981',
    palette: ['#0f172a', '#1e293b', '#10b981', '#f43f5e', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🧱 High brick wall draped with ivy creepers...' },
      { atPercentage: 50, clueText: '🗝️ Ornate black wrought-iron scrollwork slightly ajar...' },
      { atPercentage: 75, clueText: '✨ Golden light spilling through... Secret Garden Gate!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#064e3b'], [0.6, '#047857'], [1, '#10b981']],
        horizonY: 28,
        terrainStops: [[0, '#065f46'], [1, '#022c22']],
        focal: (ctx) => {
          // Brick walls on sides
          ctx.fillStyle = '#7f1d1d';
          ctx.fillRect(0, 10, 36, 44);
          ctx.fillRect(60, 10, 36, 44);
          // Glowing light opening in gate
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(36, 16, 24, 38);
          // Wrought iron gate bars
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.5;
          for (let x = 38; x < 60; x += 4) {
            ctx.beginPath(); ctx.moveTo(x, 16); ctx.lineTo(x, 54); ctx.stroke();
          }
        }
      })
  },

  // 48. Lotus Pond
  {
    id: 'art-048-lotus-pond',
    number: 48,
    name: 'Lotus Pond',
    description: 'Elegant pink lotus flowers floating among round jade lily pads on a tranquil zen pond.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    palette: ['#022c22', '#0f766e', '#14b8a6', '#f472b6', '#fbcfe8', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '💧 Glassy mirror water in a peaceful bamboo grove...' },
      { atPercentage: 50, clueText: '🍃 Round jade-green lily pads with water droplets...' },
      { atPercentage: 75, clueText: '🪷 Pink petals opening with golden centers... Lotus Pond!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#042f2e'], [0.6, '#0f766e'], [1, '#14b8a6']],
        horizonY: 20,
        terrainStops: [[0, '#0f766e'], [0.5, '#0d9488'], [1, '#042f2e']],
        focal: (ctx) => {
          // Lily pads
          ctx.fillStyle = '#10b981';
          ctx.beginPath(); ctx.ellipse(34, 34, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(62, 38, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
          // Lotus flower
          ctx.fillStyle = '#f472b6';
          ctx.beginPath();
          ctx.ellipse(34, 30, 6, 8, -0.2, 0, Math.PI * 2);
          ctx.ellipse(34, 30, 6, 8, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fef08a';
          ctx.beginPath(); ctx.arc(34, 30, 2, 0, Math.PI * 2); ctx.fill();
        }
      })
  },

  // 49. Rainbow Flower Garden
  {
    id: 'art-049-rainbow-flower-garden',
    number: 49,
    name: 'Rainbow Flower Garden',
    description: 'Vibrant concentric bands of red, orange, yellow, green, blue, and purple blooming blossoms.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f43f5e',
    palette: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'],
    clues: [
      { atPercentage: 25, clueText: '🌈 Prismatic spectrum arches in a terraced field...' },
      { atPercentage: 50, clueText: '🌻 Dense parallel ribbons of bright blooming colors...' },
      { atPercentage: 75, clueText: '🎨 A living spectrum of blossoms... Rainbow Flower Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.7, '#bae6fd'], [1, '#ffffff']],
        horizonY: 22,
        terrainStops: [[0, '#15803d'], [1, '#166534']],
        focal: (ctx, w) => {
          // Curved rainbow stripes of flowers
          const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
          colors.forEach((col, i) => {
            ctx.fillStyle = col;
            ctx.fillRect(0, 24 + i * 5, w, 4);
          });
        }
      })
  },

  // 50. Night Blooming Garden
  {
    id: 'art-050-night-blooming-garden',
    number: 50,
    name: 'Night Blooming Garden',
    description: 'Mystical moonflowers that unfold only beneath starlight, emitting a soft blue aura.',
    category: 'flowers-gardens',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#38bdf8',
    palette: ['#020617', '#1e1b4b', '#38bdf8', '#a5f3fc', '#ffffff', '#064e3b'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Deep midnight shadows bathed in silver luminescence...' },
      { atPercentage: 50, clueText: '✨ Petals that only open when the moon reaches its peak...' },
      { atPercentage: 75, clueText: '🌸 Ethereal glowing blossoms... Night Blooming Garden!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e1b4b']],
        stars: true,
        celestial: { type: 'moon', x: 70, y: 14, r: 8, color: '#f8fafc' },
        horizonY: 30,
        terrainStops: [[0, '#064e3b'], [1, '#022c22']],
        focal: (ctx) => {
          // Night blooming petals
          [36, 52].forEach((fx) => {
            ctx.fillStyle = '#67e8f9';
            ctx.beginPath(); ctx.arc(fx, 38, 7, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.arc(fx, 38, 3, 0, Math.PI * 2); ctx.fill();
          });
        }
      })
  }
];
