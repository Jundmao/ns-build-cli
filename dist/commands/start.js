"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const webpack_dev_server_1 = tslib_1.__importDefault(require("webpack-dev-server"));
const WebpackDevServerUtils_1 = require("react-dev-utils/WebpackDevServerUtils");
class Start extends core_1.Command {
    async run() {
        const webpackConfigFactory = require('../../config/webpack/webpack.config.js');
        const webpackDevServerConfigFactory = require('../../config/webpack/webpack.devserver.config.js');
        const { flags } = await this.parse(Start);
        const port = await WebpackDevServerUtils_1.choosePort('0.0.0.0', flags.port);
        if (port == null) {
            // We have not found a port.
            return;
        }
        const webpackConfig = webpackConfigFactory('development');
        const webpackDevServerConfig = webpackDevServerConfigFactory({
            host: flags.host,
            open: flags.open,
        });
        const compiler = webpack_1.default(webpackConfig);
        const webpackServer = new webpack_dev_server_1.default(compiler, webpackDevServerConfig);
        webpackServer.listen(port);
    }
}
exports.default = Start;
Start.description = '启动开发环境';
Start.flags = {
    help: core_1.Flags.help(),
    port: core_1.Flags.integer({ description: '端口号', default: 8080 }),
    host: core_1.Flags.string({ description: '网址', default: '0.0.0.0' }),
    open: core_1.Flags.boolean({ description: '是否打开', default: false }),
};
