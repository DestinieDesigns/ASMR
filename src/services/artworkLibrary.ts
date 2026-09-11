/**
 * Shyfoxie's Dream Studio - Artwork Library
 * Ultra-realistic photographic artworks in 16:9 ratio featuring Beach, Animals, Scenery, and Nature.
 * High-definition preloading, robust CORS image caching, and realistic procedural fallbacks.
 */

import { Artwork } from '../types';
import { all100Artworks, artworkCategoryMap, artworkCategoriesList } from './artworkData';

export { all100Artworks, artworkCategoryMap, artworkCategoriesList };

// Helper to create an offscreen canvas
export function createOffscreenCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  return [canvas, ctx];
}

// Global in-memory caches for instant switching
export const imageDataCache = new Map<string, ImageData>();
export const imageElementCache = new Map<string, HTMLImageElement>();
const artworkLoadedListeners = new Set<(artId: string) => void>();

export function subscribeArtworkImageLoaded(listener: (artId: string) => void): () => void {
  artworkLoadedListeners.add(listener);
  return () => artworkLoadedListeners.delete(listener);
}

export function getImageElement(artId: string): HTMLImageElement | undefined {
  return imageElementCache.get(artId);
}

/**
 * Preload an artwork's realistic photographic image and extract 16:9 ImageData
 */
export function preloadArtworkImage(art: Artwork): Promise<ImageData | null> {
  if (imageDataCache.has(art.id)) {
    return Promise.resolve(imageDataCache.get(art.id)!);
  }

  if (!art.imageUrl) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const targetW = art.width || 96;
      const targetH = art.height || 54;
      const [canvas, ctx] = createOffscreenCanvas(targetW, targetH);

      // Crop and center to 16:9
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const targetAspect = targetW / targetH;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

      if (imgAspect > targetAspect) {
        sw = img.naturalHeight * targetAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / targetAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
      const imgData = ctx.getImageData(0, 0, targetW, targetH);

      imageDataCache.set(art.id, imgData);
      imageElementCache.set(art.id, img);

      // Notify any active canvas components
      artworkLoadedListeners.forEach((fn) => fn(art.id));
      resolve(imgData);
    };

    img.onerror = () => {
      console.warn(`[DreamStudio] Note: Could not load photo for ${art.name}, using high-res procedural rendering.`);
      resolve(null);
    };

    img.src = art.imageUrl;
  });
}

/**
 * Preload all default artworks in the background
 */
export function preloadAllArtworks(): void {
  defaultArtworks.forEach((art, idx) => {
    // Stagger slightly so browser network queue is smooth
    setTimeout(() => {
      preloadArtworkImage(art).catch(() => {});
    }, idx * 100);
  });
}

// Kick off initial preloading immediately in browser environment
if (typeof window !== 'undefined') {
  setTimeout(() => preloadAllArtworks(), 50);
}

// Procedural fallback helper that creates a realistic gradient & detail landscape
function createRealisticProceduralImage(
  w: number,
  h: number,
  skyColors: [number, string][],
  groundColors: [number, string][],
  horizonY: number,
  extras?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): ImageData {
  const [canvas, ctx] = createOffscreenCanvas(w, h);

  // Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyColors.forEach(([pos, col]) => skyGrad.addColorStop(pos, col));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, horizonY);

  // Ground / Water
  const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
  groundColors.forEach(([pos, col]) => groundGrad.addColorStop(pos, col));
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, horizonY, w, h - horizonY);

  // Extras
  if (extras) {
    extras(ctx, w, h);
  }

  return ctx.getImageData(0, 0, w, h);
}

export const defaultArtworks: Artwork[] = all100Artworks;

/**
 * Creates an Artwork from any user uploaded image file
 */
export async function createCustomArtworkFromFile(file: File): Promise<Artwork> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const targetW = 96;
        const targetH = 54;
        const [canvas, ctx] = createOffscreenCanvas(targetW, targetH);

        // Crop center 16:9
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const targetAspect = targetW / targetH;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

        if (imgAspect > targetAspect) {
          sw = img.naturalHeight * targetAspect;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / targetAspect;
          sy = (img.naturalHeight - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
        const imgData = ctx.getImageData(0, 0, targetW, targetH);

        const customArt: Artwork = {
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, '').slice(0, 24) || 'Custom Masterpiece',
          description: 'Custom artwork uploaded by streamer or community.',
          category: 'custom',
          aspectRatio: '16:9',
          width: targetW,
          height: targetH,
          thumbnailColor: '#ec4899',
          isCustom: true,
          imageUrl: e.target?.result as string,
          palette: ['#0f172a', '#ec4899', '#3b82f6', '#eab308', '#ffffff'],
          generateImageData: () => imgData
        };

        // Also seed imageElementCache so BubblePopCanvas gets the full resolution!
        imageElementCache.set(customArt.id, img);
        imageDataCache.set(customArt.id, imgData);

        resolve(customArt);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
