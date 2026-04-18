import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ 
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          'icons': ['lucide-react']
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
})
