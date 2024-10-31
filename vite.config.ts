import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'public': path.resolve(__dirname, './public'),
      'img': path.resolve(__dirname, './public/img'),
      'manager': path.resolve(__dirname, './src/sections/active/manager'),
      'auth': path.resolve(__dirname, './src/sections/disabled/auth'),
      'portuguese': path.resolve(__dirname, './src/sections/disabled/portuguese'),
      'reasoning': path.resolve(__dirname, './src/sections/disabled/reasoning'),
      'teacher': path.resolve(__dirname, './src/sections/disabled/teacher'),
      'technology': path.resolve(__dirname, './src/sections/disabled/technology'),
      'user': path.resolve(__dirname, './src/sections/active/user'),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://idipibex.online/api/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
