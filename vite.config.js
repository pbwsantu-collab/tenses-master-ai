import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/tenses-master-ai/',   // ← important for project site
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: { port: 5173, open: true }
});
