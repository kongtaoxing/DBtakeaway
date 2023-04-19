import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs({
      include: /node_modules/
    })
  ],
  server: {
    host: '0.0.0.0',
  },
  build: {
    target: 'es2015',
    outDir: 'dist'
  },
  resolve: {
    alias: {
      event: 'eventemitter3',
    }
  }
})
