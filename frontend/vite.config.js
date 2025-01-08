import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: "0.0.0.0"
    },
    preview: {
      port: 3000,
      host: "0.0.0.0"
    },
    define: {
      'process.env.VITE_BACKEND_API_URL': JSON.stringify(env.VITE_BACKEND_API_URL)
    }
  }
})