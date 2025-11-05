/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const apiUrl = env.VITE_API_URL || 'http://localhost:3000/'

  const secure = apiUrl.startsWith('https://')

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure,
        },
        '/uploads': {
          target: apiUrl,
          changeOrigin: true,
          secure,
        },
      },
    },
  })
}
