export default {
  root: './src',
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
}