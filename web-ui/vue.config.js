module.exports = {
  devServer: {
    port: 8080,
    open: true,
    host: 'localhost',
    historyApiFallback: true
  },
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: { chunks: 'all' }
    }
  }
}
