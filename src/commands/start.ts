import { Command, Flags } from '@oclif/core'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'

export default class Start extends Command {
  static description = '启动开发环境'
  static flags = {
    help: Flags.help(),
    port: Flags.integer({ description: '端口号', default: 8080 }),
    host: Flags.string({ description: '网址', default: '0.0.0.0' }),
    open: Flags.boolean({ description: '是否打开', default: false }),
  }

  public async run() {
    const webpackConfigFactory = require('../../config/webpack/webpack.config.js')
    const webpackDevServerConfigFactory = require('../../config/webpack/webpack.devserver.config.js')
    const { flags } = await this.parse(Start)
    const port = await choosePort('0.0.0.0', flags.port)

    if (port == null) {
      // We have not found a port.
      return
    }

    const webpackConfig = webpackConfigFactory('development')
    const webpackDevServerConfig = webpackDevServerConfigFactory({
      host: flags.host,
      open: flags.open,
    })
    const compiler = webpack(webpackConfig)
    const webpackServer = new WebpackDevServer(compiler, webpackDevServerConfig)

    webpackServer.listen(port)
  }
}
