module.exports = {
  devServer: {
    port: 8080,
    open: true,
    host: 'localhost',
    historyApiFallback: true
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
