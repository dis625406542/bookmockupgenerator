const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const isProd = process.env.NODE_ENV === 'production'

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
  configureWebpack: config => {
    config.optimization = {
      splitChunks: { chunks: 'all' }
    }
    if (isProd) {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/free-book-mockup-generator',
            '/book-cover-mockup-generator',
            '/ebook-mockup-generator',
            '/hardcover-book-mockup',
            '/3d-book-mockup-generator',
            '/paperback-book-mockup',
            '/about',
            '/privacy',
            '/terms',
            '/contact',
          ],
          renderer: new Renderer({
            headless: true,
            renderAfterTime: 3000,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
          }),
        })
      )
    }
  }
}
