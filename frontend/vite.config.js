import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  /** Preserve console in dev so E2E can assert [AUTH_*] logs (production build still strips). */
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
}))
