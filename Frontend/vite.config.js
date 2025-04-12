import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    allowedHosts: ['*'],
    proxy: {
      // '/api': 'http://localhost:3000',  // Proxy requests to backend
      '/api': 'https://mern-ecommerce-backend-hpp7.onrender.com',  // Proxy requests to backend
    },
  }

})
