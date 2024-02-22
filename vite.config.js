import { defineConfig } from "vite"
import fs from 'fs';

export default defineConfig ({
  root: './src',
  envDir: '../',
  envPrefix: 'TS_',
  server: {
    port: 443,
    hot: true,
    https: {
      key: fs.readFileSync('./tls/cert.key.pem'),
      cert: fs.readFileSync('./tls/cert.pem')
    }
  },
  resolve: {
    alias: {
      '@bootstrap': 'node_modules/bootstrap',
      '@jquery': 'node_modules/jquery'
    }
  }
})
