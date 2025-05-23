import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    allowedHosts: ['pickout.onrender.com'],
    proxy: {
      // '/api': 'http://localhost:3000',  // Proxy requests to backend
      '/api': 'https://mern-ecommerce-production-7b91.up.railway.app/',  // Proxy requests to backend
    },
  }

})
