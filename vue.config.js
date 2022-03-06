// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://elm.cangdu.org/',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
