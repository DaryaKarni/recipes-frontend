/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
<<<<<<< HEAD
  const apiUrl = env.VITE_API_URL || 'http://localhost:4000/'
=======
  const apiUrl = env.VITE_API_URL || 'http://localhost:3000/'
>>>>>>> 7dc5961f667e017a22553f1303a380e973f90311

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
<<<<<<< HEAD
      },
    },
=======
        '/uploads': {
          target: apiUrl,
          changeOrigin: true,
          secure,
        },
      },
    },

>>>>>>> 7dc5961f667e017a22553f1303a380e973f90311
  })
}
