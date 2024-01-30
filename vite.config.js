import { defineConfig } from "vite"

export default defineConfig ({
  root: './src',
  envDir: '../',
  envPrefix: 'TS_',
  server: {
    port: 3000,
    hot: true
  },
  resolve: {
    alias: {
      '@bootstrap': 'node_modules/bootstrap',
      '@jquery': 'node_modules/jquery'
    }
  }
})
