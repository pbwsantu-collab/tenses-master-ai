import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/tenses-master-ai/',   // required for GitHub Pages project site
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: { port: 5173, open: true }
});
