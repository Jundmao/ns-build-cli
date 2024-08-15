import { Command } from '@oclif/core'
import webpack from 'webpack'
import chalk from 'chalk'

export default class Vendor extends Command {
  static description = '构建vendor文件'

  static examples = ['<%= config.bin %> <%= command.id %>']

  public async run(): Promise<void> {
    const webpackConfig = require('../../config/webpack/webpack.vendor.config.js')
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) {
        console.log(chalk.red(err.stack || err))
        return
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        }),
      )
    })
  }
}
