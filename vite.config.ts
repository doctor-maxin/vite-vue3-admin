import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'https://backend.garage.kixbox.ru'
    }
  },
  build: {
    outDir: './dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
      '@ui': resolve(__dirname, './src/components/ui'),
      '@domains': resolve(__dirname, './src/domains'),
      '@components': resolve(__dirname, './src/components'),
      '@composables': resolve(__dirname, './src/composables'),
    }
  }
})
