import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access
    port: 5173, // Or your desired port
    allowedHosts: [
      'assortir.in',
      'www.assortir.in',
      'assortir.in.ngrok-free.dev',
      'www.assortir.in.ngrok-free.dev',
      'b8b6-2405-201-2020-61-5ad-241b-972c-109c.ngrok-free.app',
      '37dc-2409-40c1-640f-9960-a000-b896-ebf8-3b50.ngrok-free.app'
    ]
  },
})
