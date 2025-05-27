import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "8d09-181-237-232-90.ngrok-free.app" // Agrega la URL generada por Ngrok
    ]
  }
})
