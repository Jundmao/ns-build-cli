/**
 * webpack dev server config
 */
const path = require('node:path')

const DEV_API = process.env.DEV_API || ''

const generateWebpackDevServerConfig = (config = {}) => ({
  // quiet: true,
  // stats: {
  //   colors: true,
  //   assets: true,
  //   errors: true,
  //   warnings: true,

  //   all: false,
  //   chunks: false,
  //   chunkModules: false,
  //   depth: false,
  //   entrypoints: false,
  //   env: false,
  //   errorDetails: false,
  //   hash: false,
  //   modules: false,
  //   moduleTrace: false,
  //   performance: false,
  //   providedExports: false,
  //   publicPath: false,
  //   reasons: false,
  //   source: false,
  //   timings: false,
  //   usedExports: false,
  //   version: false,
  //   cached: false,
  //   chunkGroups: false,
  // },
  contentBase: [
    path.join(process.cwd(), 'data'),
    path.join(process.cwd(), 'build'),
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  host: config.host,
  hot: true,
  open: config.open,
  compress: true,
  historyApiFallback: true,
  proxy: {
    '/dev': {
      target: DEV_API,
      pathRewrite: { '^/dev': '' },
    },
  },
})

module.exports = generateWebpackDevServerConfig
