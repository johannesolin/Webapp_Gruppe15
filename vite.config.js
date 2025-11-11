import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787', // backend Worker
        changeOrigin: true
      },
      '/rw': {
        target: 'http://localhost:8787', // Redwood routes
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'rwsdk': 'rwsdk'
    }
  }
});

