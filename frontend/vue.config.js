const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "url": false,
        "querystring": false,
        "util": false,
      } 
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3005',
      },
    }
  }
})
