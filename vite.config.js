import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // Override base path từ command line
  base: '/',

  define: {
    'process.env': process.env
  },

  plugins: [
    react(),
    svgr()
  ],

  resolve: {
    alias: {
      '@': '/src'
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
