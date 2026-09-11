import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    base: './',
    plugins: [
      {
        name: 'html-dev-transform',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html
              .replace(
                /<link rel="stylesheet"[^>]*href=["']\.\/style\.css["'][^>]*>/g,
                ''
              )
              .replace(
                /<script[^>]*src=["']\.\/app\.js["'][^>]*><\/script>/g,
                '<script type="module" src="/src/main.tsx"></script>'
              );
          },
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'app.js',
          chunkFileNames: '[name].js',
          assetFileNames: 'style.[ext]',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
