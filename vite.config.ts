import { defineConfig } from 'vite'

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
})