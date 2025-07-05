import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // Thêm base path cho production
  base: '/',

  // Cho phep Vite su dung duoc process.env (dung khi deploy FE len Vercel)
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

  // Cấu hình build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Đảm bảo các route được handle đúng
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
