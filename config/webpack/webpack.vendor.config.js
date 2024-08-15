const path = require('path')
const moment = require('moment')
const webpack = require('webpack')

const baseDir = path.join(__dirname, '../../')

module.exports = {
  mode: 'production',
  entry: {
    vendor: path.join(process.cwd(), 'src', 'vendor.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'data'),
    filename: 'vendor.js',
  },
  resolveLoader: {
    modules: ['node_modules', path.join(baseDir, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`),
  ],
}
