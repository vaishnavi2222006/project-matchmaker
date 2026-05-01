import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Produce smaller, faster bundles
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    // Inline small assets to reduce requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: {
          // Core React libs in one chunk (rarely changes)
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI libraries
          ui: ['lucide-react', 'react-icons', 'react-spinners'],
          // Data/state management
          data: ['@tanstack/react-query', 'zustand', 'axios'],
          // Charts (large, rarely changes)
          charts: ['recharts'],
        },
      },
    },
  },
  // Optimize dev server
  server: {
    port: 5173,
  },
})
