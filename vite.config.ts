import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// HashRouter를 쓰므로 상대 경로 base('./')면 GitHub Pages 등 어느 하위 경로에서도 동작합니다.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: { port: 5173 },
})
