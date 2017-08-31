var args=parseArgs();
var config = require('./config')[args[0]];
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.env.NODE_ENV);
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var port = process.env.PORT || config.port
var proxyTable = config.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})

function parseArgs()
{
  var i = 0;
  var args = process.argv.concat();
  args.splice(0, 2);
  return args;
}
