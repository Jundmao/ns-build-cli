import { Command, Flags } from '@oclif/core'
import { exit } from 'node:process'
import webpack from 'webpack'
import chalk from 'chalk'
import ora from 'ora'
import Table from 'cli-table'
import convert from 'convert-units'

import { showTitle } from '../utils'

export default class Build extends Command {
  static description = '构建正式环境'
  static flags = {
    help: Flags.help(),
    debug: Flags.boolean({ char: 'D', description: '开启调试模式' }),
    all: Flags.boolean({ char: 'A', description: '显示所有构建结果' }),
  }

  public async run() {
    const webpackConfigFactory = require('../../config/webpack/webpack.config.js')

    const webpackConfig = webpackConfigFactory('production')
    const compiler = webpack(webpackConfig)
    const spinner = ora({
      text: '正在构建中\n',
      spinner: 'aesthetic',
    }).start()
    const { flags } = await this.parse(Build)

    compiler.run((err, stats) => {
      if (err) {
        this.error(`构建编译报错:\n${err}`)
      }

      spinner.succeed('构建完成')

      if (flags.debug) {
        this.log(
          stats.toString({
            colors: true,
          }),
        )
        return
      }

      const jsonStats = stats.toJson({
        assets: true,
        errors: true,

        depth: false,
        entrypoints: false,
        env: false,
        errorDetails: false,
        hash: false,
        modules: false,
        moduleTrace: false,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        usedExports: false,
        version: false,
        warnings: false,
        all: false,
        cached: false,
        chunkGroups: false,
        // assetsSort: undefined,
        // chunksSort: undefined,
        // context: undefined,
        // excludeAssets: undefined,
        // excludeModules: undefined,
        // exclude: undefined,
        // maxModules: undefined,
        // modulesSort: undefined,
        // warningsFilter: undefined,
      })

      if (flags.all) {
        showTitle('all json')
        console.log(jsonStats)
      }

      // 显示错误
      if (jsonStats.errors.length > 0) {
        showTitle('出错信息一览')

        jsonStats.errors.forEach((error, index) => {
          const errors = error.split('\n')
          this.log(`错误${index + 1}：`)
          this.log(chalk.red.bold(errors[0]))
          this.log(errors.slice(1).join('\n'))
        })
        exit(1)
      }

      // 显示构建产物
      if (jsonStats.assets && jsonStats.assets.length > 0) {
        showTitle('构建产物一览')

        const table = new Table({
          head: ['NAME', 'SIZE'],
          colAligns: ['right', 'right'],
        })

        jsonStats.assets.forEach(asset => {
          const size = convert(asset.size).from('b').toBest()
          table.push([asset.name, `${size.val.toFixed(1)} ${size.unit}`])
        })

        this.log(table.toString())
      }
    })
  }
}
