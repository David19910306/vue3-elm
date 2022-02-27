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
    host: '0.0.0.0',
    proxy: {
      '/v1': {
        target: 'https://elm.cangdu.org/v1',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
}
