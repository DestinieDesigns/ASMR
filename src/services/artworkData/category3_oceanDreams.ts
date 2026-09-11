/**
 * Category 3 — Ocean Dreams (Artworks 21 to 30)
 */

import { Artwork } from '../../types';
import { generateLayeredScene } from './sceneGenerators';

export const category3Artworks: Artwork[] = [
  // 21. Beach Sunrise
  {
    id: 'art-021-beach-sunrise',
    number: 21,
    name: 'Beach Sunrise',
    description: 'A glowing golden sunrise over ocean waves, silhouettes of palm trees, and radiant sea reflections.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#f97316',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    palette: ['#4c0519', '#9f1239', '#e11d48', '#f97316', '#fde047', '#0284c7', '#38bdf8'],
    clues: [
      { atPercentage: 25, clueText: '🌅 Golden pink dawn lighting up ocean clouds...' },
      { atPercentage: 50, clueText: '🌴 Silhouetted palm fronds swaying in the sea breeze...' },
      { atPercentage: 75, clueText: '🌊 Glowing sun path across breaking waves... Beach Sunrise!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#881337'], [0.4, '#e11d48'], [0.7, '#f97316'], [1, '#fef08a']],
        celestial: { type: 'sun', x: 48, y: 26, r: 10, color: '#ffffff', glowColor: 'rgba(253, 224, 71, 0.6)' },
        horizonY: 28,
        terrainStops: [[0, '#0284c7'], [0.4, '#0369a1'], [0.7, '#075985'], [1, '#fde68a']],
        waterReflect: true,
        focal: (ctx) => {
          // Curved palm trunk on left
          ctx.strokeStyle = '#1c1917';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(8, 54);
          ctx.quadraticCurveTo(14, 30, 26, 16);
          ctx.stroke();
          // Palm leaves
          ctx.beginPath();
          ctx.moveTo(26, 16); ctx.lineTo(12, 12);
          ctx.moveTo(26, 16); ctx.lineTo(28, 6);
          ctx.moveTo(26, 16); ctx.lineTo(40, 12);
          ctx.moveTo(26, 16); ctx.lineTo(34, 24);
          ctx.stroke();
        }
      })
  },

  // 22. Underwater Mermaid Castle
  {
    id: 'art-022-mermaid-castle',
    number: 22,
    name: 'Underwater Mermaid Castle',
    description: 'A magical sunken palace carved from pearlescent conch shells, surrounded by glowing sea flora.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#042f2e', '#0f766e', '#14b8a6', '#22d3ee', '#f472b6', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🫧 Rising bubbles in deep turquoise ocean waters...' },
      { atPercentage: 50, clueText: '🐚 Spires carved from giant shimmering pearlescent shells...' },
      { atPercentage: 75, clueText: '🧜‍♀️ Majestic sunken coral towers... Mermaid Castle!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#042f2e'], [0.6, '#0f766e'], [1, '#14b8a6']],
        horizonY: 22,
        terrainStops: [[0, '#0d9488'], [1, '#042f2e']],
        focal: (ctx) => {
          // Coral castle spires
          ctx.fillStyle = '#f472b6';
          ctx.fillRect(40, 20, 16, 26);
          ctx.fillStyle = '#fbcfe8';
          ctx.beginPath(); ctx.moveTo(38, 20); ctx.lineTo(48, 8); ctx.lineTo(58, 20); ctx.fill();
          // Flank spires
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(30, 26, 8, 20);
          ctx.fillRect(58, 26, 8, 20);
          ctx.beginPath(); ctx.moveTo(28, 26); ctx.lineTo(34, 16); ctx.lineTo(40, 26); ctx.fill();
          ctx.beginPath(); ctx.moveTo(56, 26); ctx.lineTo(62, 16); ctx.lineTo(68, 26); ctx.fill();
          // Glowing arched entrance
          ctx.fillStyle = '#fef08a';
          ctx.beginPath(); ctx.arc(48, 42, 4, Math.PI, 0); ctx.fill();
        }
      })
  },

  // 23. Dolphin Sunset
  {
    id: 'art-023-dolphin-sunset',
    number: 23,
    name: 'Dolphin Sunset',
    description: 'Playful dolphins leaping in graceful arches against a fiery magenta and gold sunset.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#ec4899',
    imageUrl: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1280&q=80',
    palette: ['#4a044e', '#86198f', '#c026d3', '#f43f5e', '#fbbf24', '#0284c7'],
    clues: [
      { atPercentage: 25, clueText: '🌅 Fiery purple and magenta sunset clouds...' },
      { atPercentage: 50, clueText: '🌊 Breaking sea spray leaping above the horizon...' },
      { atPercentage: 75, clueText: '🐬 Sleek bodies arcing through the golden sky... Dolphin Sunset!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#3b0764'], [0.4, '#a21caf'], [0.7, '#f43f5e'], [1, '#fde047']],
        celestial: { type: 'sun', x: 48, y: 30, r: 12, color: '#fef08a', glowColor: 'rgba(253, 224, 71, 0.5)' },
        horizonY: 34,
        terrainStops: [[0, '#0369a1'], [0.4, '#075985'], [1, '#0c4a6e']],
        waterReflect: true,
        focal: (ctx) => {
          // Dolphin 1 (Center leap)
          ctx.fillStyle = '#1e1b4b';
          ctx.beginPath();
          ctx.ellipse(44, 22, 11, 4.5, -0.4, 0, Math.PI * 2);
          ctx.fill();
          // Curved tail & dorsal fin
          ctx.beginPath();
          ctx.moveTo(43, 19); ctx.lineTo(41, 14); ctx.lineTo(46, 18);
          ctx.fill();
          // Dolphin 2 (Smaller leap on right)
          ctx.beginPath();
          ctx.ellipse(66, 26, 8, 3.5, -0.35, 0, Math.PI * 2);
          ctx.fill();
          // Water splashes
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(34, 33, 3, 2);
          ctx.fillRect(56, 33, 3, 2);
        }
      })
  },

  // 24. Jellyfish Galaxy
  {
    id: 'art-024-jellyfish-galaxy',
    number: 24,
    name: 'Jellyfish Galaxy',
    description: 'Bioluminescent jellyfish drifting through abyssal waters sparkling like a galaxy of stars.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#c084fc',
    palette: ['#030712', '#1e1035', '#581c87', '#c084fc', '#67e8f9', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Deep oceanic abyss filled with glowing star motes...' },
      { atPercentage: 50, clueText: '🪼 Translucent domes pulsing with violet energy...' },
      { atPercentage: 75, clueText: '✨ Trailing iridescent tentacles... Jellyfish Galaxy!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#030712'], [0.6, '#0f051d'], [1, '#1e1035']],
        stars: true,
        horizonY: 28,
        terrainStops: [[0, '#1e1035'], [1, '#05020a']],
        focal: (ctx) => {
          // Main Jellyfish bell
          ctx.fillStyle = '#c084fc';
          ctx.beginPath(); ctx.arc(48, 20, 12, Math.PI, 0); ctx.fill();
          // Glowing rim
          ctx.fillStyle = '#67e8f9';
          ctx.fillRect(36, 19, 24, 2);
          // Long flowing tentacles
          ctx.strokeStyle = '#e9d5ff';
          ctx.lineWidth = 1;
          for (let x = 38; x <= 58; x += 4) {
            ctx.beginPath();
            ctx.moveTo(x, 21);
            ctx.quadraticCurveTo(x + (x % 3 - 1) * 6, 35, x + 2, 48);
            ctx.stroke();
          }
          // Smaller glowing jellyfish on left
          ctx.fillStyle = '#67e8f9';
          ctx.beginPath(); ctx.arc(22, 32, 6, Math.PI, 0); ctx.fill();
        }
      })
  },

  // 25. Whale and the Stars
  {
    id: 'art-025-whale-and-stars',
    number: 25,
    name: 'Whale and the Stars',
    description: 'A colossal humpback whale gliding beneath a starry cosmic sky and silver moonlight.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#1d4ed8',
    palette: ['#020617', '#0f172a', '#1e3a8a', '#1d4ed8', '#38bdf8', '#f8fafc'],
    clues: [
      { atPercentage: 25, clueText: '✨ Deep midnight sea reflecting millions of stars...' },
      { atPercentage: 50, clueText: '🌊 A colossal majestic flipper breaking the surface...' },
      { atPercentage: 75, clueText: '🐋 Giant singing whale under the night sky... Whale and Stars!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e3a8a']],
        stars: true,
        celestial: { type: 'moon', x: 74, y: 12, r: 8, color: '#f8fafc', glowColor: 'rgba(255, 255, 255, 0.4)' },
        horizonY: 26,
        terrainStops: [[0, '#1e3a8a'], [0.5, '#172554'], [1, '#020617']],
        waterReflect: true,
        focal: (ctx) => {
          // Giant whale body
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.ellipse(46, 34, 22, 9, -0.1, 0, Math.PI * 2);
          ctx.fill();
          // White belly ridges
          ctx.fillStyle = '#94a3b8';
          ctx.beginPath();
          ctx.ellipse(44, 38, 16, 5, -0.1, 0, Math.PI * 2);
          ctx.fill();
          // Tail flukes breaking water
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.moveTo(66, 32); ctx.lineTo(76, 22); ctx.lineTo(78, 28);
          ctx.fill();
          // Blowhole spout with starlight
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(36, 18, 2, 7);
          ctx.fillRect(34, 16, 6, 2);
        }
      })
  },

  // 26. Tropical Coral Paradise
  {
    id: 'art-026-tropical-coral-paradise',
    number: 26,
    name: 'Tropical Coral Paradise',
    description: 'A dazzling sunlit coral reef bustling with clownfish, sea anemones, and blue tangs.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0ea5e9',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1280&q=80',
    palette: ['#0284c7', '#0ea5e9', '#38bdf8', '#f43f5e', '#ea580c', '#eab308', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🪸 Dense rainbow coral gardens bursting with life...' },
      { atPercentage: 50, clueText: '🐠 Bright orange clownfish darting between anemones...' },
      { atPercentage: 75, clueText: '🌊 Sunlit crystal blue reef... Tropical Coral Paradise!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#0284c7'], [0.6, '#0ea5e9'], [1, '#7dd3fc']],
        horizonY: 18,
        terrainStops: [[0, '#0891b2'], [1, '#065f46']],
        focal: (ctx, w, h) => {
          // Coral structures
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath(); ctx.arc(24, 46, 10, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#eab308';
          ctx.beginPath(); ctx.arc(72, 44, 9, 0, Math.PI * 2); ctx.fill();
          // Clownfish in center
          ctx.fillStyle = '#ea580c';
          ctx.beginPath(); ctx.ellipse(48, 28, 6, 3.5, 0, 0, Math.PI * 2); ctx.fill();
          // White stripes
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(46, 25, 1.5, 6);
          ctx.fillRect(50, 26, 1.5, 4);
          // Blue tang on right
          ctx.fillStyle = '#2563eb';
          ctx.beginPath(); ctx.ellipse(64, 22, 5, 3, -0.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fde047';
          ctx.fillRect(67, 21, 2, 2);
        }
      })
  },

  // 27. Pirate Ship Moonlight
  {
    id: 'art-027-pirate-ship-moonlight',
    number: 27,
    name: 'Pirate Ship Moonlight',
    description: 'A majestic galleon with full billowed sails cutting through misty, moonlit ocean swells.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#0f172a',
    palette: ['#020617', '#0f172a', '#1e293b', '#64748b', '#cbd5e1', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌙 Giant silvery full moon casting an icy ocean gleam...' },
      { atPercentage: 50, clueText: '⛵ Tall masts and billowing white canvas sails...' },
      { atPercentage: 75, clueText: '🏴‍☠️ Majestic galleon slicing through swells... Pirate Ship!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#0f172a'], [1, '#1e293b']],
        stars: true,
        celestial: { type: 'moon', x: 30, y: 14, r: 10, color: '#fef08a', glowColor: 'rgba(254, 240, 138, 0.4)' },
        horizonY: 28,
        terrainStops: [[0, '#1e293b'], [0.5, '#0f172a'], [1, '#020617']],
        waterReflect: true,
        focal: (ctx) => {
          // Wooden ship hull
          ctx.fillStyle = '#451a03';
          ctx.beginPath();
          ctx.moveTo(42, 34); ctx.lineTo(68, 34); ctx.lineTo(64, 40); ctx.lineTo(46, 40);
          ctx.fill();
          // Masts
          ctx.fillStyle = '#78350f';
          ctx.fillRect(50, 16, 2, 18);
          ctx.fillRect(58, 12, 2, 22);
          // Billowing white sails
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath(); ctx.ellipse(51, 22, 5, 4, 0, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.ellipse(59, 18, 6, 5, 0, 0, Math.PI * 2); ctx.fill();
          // Lantern glow at stern
          ctx.fillStyle = '#fde047';
          ctx.fillRect(43, 33, 2, 2);
        }
      })
  },

  // 28. Hidden Treasure Cove
  {
    id: 'art-028-hidden-treasure-cove',
    number: 28,
    name: 'Hidden Treasure Cove',
    description: 'An overflowing pirate treasure chest nestled under palm shade by turquoise sea cliffs.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#eab308',
    palette: ['#0284c7', '#38bdf8', '#eab308', '#78350f', '#fef08a', '#15803d'],
    clues: [
      { atPercentage: 25, clueText: '🏝️ Tropical limestone cliffs framing turquoise waters...' },
      { atPercentage: 50, clueText: '💎 Gold coins and ruby jewels overflowing on white sand...' },
      { atPercentage: 75, clueText: '🗝️ Wooden chest cracked open in paradise... Treasure Cove!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#38bdf8'], [0.7, '#bae6fd'], [1, '#fef08a']],
        horizonY: 24,
        terrainStops: [[0, '#06b6d4'], [0.4, '#0ea5e9'], [0.7, '#fef08a'], [1, '#fde68a']],
        mountains: [{ x: 80, y: 16, w: 32, h: 14, color: '#047857' }],
        focal: (ctx) => {
          // Open treasure chest
          ctx.fillStyle = '#78350f';
          ctx.fillRect(40, 36, 16, 10);
          // Chest open lid
          ctx.beginPath();
          ctx.moveTo(38, 36); ctx.lineTo(44, 28); ctx.lineTo(58, 28); ctx.lineTo(54, 36);
          ctx.fill();
          // Glowing gold coins & gems
          ctx.fillStyle = '#fde047';
          ctx.fillRect(42, 34, 12, 4);
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(44, 33, 2, 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(48, 33, 2, 2);
        }
      })
  },

  // 29. Sea Dragon
  {
    id: 'art-029-sea-dragon',
    number: 29,
    name: 'Sea Dragon',
    description: 'An ancient serpentine sea dragon weaving elegantly through sunlit underwater kelp arches.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#059669',
    palette: ['#022c22', '#065f46', '#059669', '#10b981', '#34d399', '#fef08a'],
    clues: [
      { atPercentage: 25, clueText: '🌿 Vast towering kelp forests reaching for surface light...' },
      { atPercentage: 50, clueText: '🐉 Long emerald serpentine coils weaving between pillars...' },
      { atPercentage: 75, clueText: '✨ Whisker frills and glowing crest... The Sea Dragon!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#022c22'], [0.5, '#064e3b'], [1, '#059669']],
        horizonY: 20,
        terrainStops: [[0, '#047857'], [1, '#022c22']],
        focal: (ctx) => {
          // Serpentine dragon body waves
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(20, 38);
          ctx.bezierCurveTo(34, 20, 46, 44, 60, 24);
          ctx.lineTo(74, 20);
          ctx.stroke();
          // Dragon head
          ctx.fillStyle = '#34d399';
          ctx.beginPath(); ctx.ellipse(74, 20, 5, 3.5, -0.2, 0, Math.PI * 2); ctx.fill();
          // Glowing whiskers & eye
          ctx.fillStyle = '#fde047';
          ctx.fillRect(73, 19, 1.5, 1.5);
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(76, 21); ctx.lineTo(82, 17); ctx.stroke();
        }
      })
  },

  // 30. Bioluminescent Beach
  {
    id: 'art-030-bioluminescent-beach',
    number: 30,
    name: 'Bioluminescent Beach',
    description: 'Electric neon-blue waves washing onto black midnight sand beneath a canopy of stars.',
    category: 'ocean-dreams',
    aspectRatio: '16:9',
    width: 96,
    height: 54,
    thumbnailColor: '#06b6d4',
    palette: ['#030712', '#082f49', '#0284c7', '#06b6d4', '#67e8f9', '#ffffff'],
    clues: [
      { atPercentage: 25, clueText: '🌌 Inky black midnight beach under a starry sky...' },
      { atPercentage: 50, clueText: '⚡ Glowing neon cyan crests cresting upon the tide...' },
      { atPercentage: 75, clueText: '🌊 Glowing plankton in the surf... Bioluminescent Beach!' },
    ],
    generateImageData: () =>
      generateLayeredScene({
        skyStops: [[0, '#020617'], [0.5, '#082f49'], [1, '#0c4a6e']],
        stars: true,
        horizonY: 28,
        terrainStops: [[0, '#082f49'], [0.5, '#030712'], [1, '#020617']],
        focal: (ctx, w) => {
          // Bioluminescent wave lines
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(0, 36);
          for (let x = 0; x <= w; x += 10) {
            ctx.lineTo(x, 36 + Math.sin(x * 0.1) * 3);
          }
          ctx.stroke();
          // Foamy shore glow
          ctx.strokeStyle = '#67e8f9';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 44);
          for (let x = 0; x <= w; x += 12) {
            ctx.lineTo(x, 44 + Math.cos(x * 0.08) * 2);
          }
          ctx.stroke();
        }
      })
  }
];
