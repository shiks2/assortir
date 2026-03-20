import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    host: true, // Allows external access
    port: 5173, // Or your desired port
    allowedHosts: [
      'rang.in',
      'www.rang.in',
      'rang.in.ngrok-free.dev',
      'www.rang.in.ngrok-free.dev',
      'b8b6-2405-201-2020-61-5ad-241b-972c-109c.ngrok-free.app'
    ]
  },
})