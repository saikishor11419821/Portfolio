import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^three$/,
        replacement: `${projectRoot}src/lib/three-timer-compat.js`,
      },
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
