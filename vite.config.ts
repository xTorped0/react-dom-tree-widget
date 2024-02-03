import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    port: 8080,
    open: true,
    cors: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
})