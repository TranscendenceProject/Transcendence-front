import { defineConfig } from "vite"
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig ({
  root: './src',
  envDir: '../',
  envPrefix: 'TS_',
  server: {
    port: 443,
    hot: true
  },
  resolve: {
    alias: {
      '@bootstrap': 'node_modules/bootstrap',
      '@jquery': 'node_modules/jquery'
    }
  },
  plugins: [
    basicSsl()
  ]
})
