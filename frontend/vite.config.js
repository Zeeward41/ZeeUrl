import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port: parseInt(process.env.VITE_FRONTEND_PORT), watch: {usePolling: true},
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:5000',
  //     changeOrigin: true
  //   }
  // }}
}
})
