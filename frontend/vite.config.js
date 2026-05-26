import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const functionsRoot = path.resolve(__dirname, 'functions')

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  /** Block dev server from serving Cloud Functions tree (prevents accidental client imports of Node CJS). */
  server: {
    fs: {
      deny: [functionsRoot],
    },
  },
  build: {
    manifest: true,
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
