"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const node_process_1 = require("node:process");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const convert_units_1 = tslib_1.__importDefault(require("convert-units"));
const utils_1 = require("../utils");
class Build extends core_1.Command {
    async run() {
        const webpackConfigFactory = require('../../config/webpack/webpack.config.js');
        const webpackConfig = webpackConfigFactory('production');
        const compiler = webpack_1.default(webpackConfig);
        const spinner = ora_1.default({
            text: '正在构建中\n',
            spinner: 'aesthetic',
        }).start();
        const { flags } = await this.parse(Build);
        compiler.run((err, stats) => {
            if (err) {
                this.error(`构建编译报错:\n${err}`);
            }
            spinner.succeed('构建完成');
            if (flags.debug) {
                this.log(stats.toString({
                    colors: true,
                }));
                return;
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
            });
            if (flags.all) {
                utils_1.showTitle('all json');
                console.log(jsonStats);
            }
            // 显示错误
            if (jsonStats.errors.length > 0) {
                utils_1.showTitle('出错信息一览');
                jsonStats.errors.forEach((error, index) => {
                    const errors = error.split('\n');
                    this.log(`错误${index + 1}：`);
                    this.log(chalk_1.default.red.bold(errors[0]));
                    this.log(errors.slice(1).join('\n'));
                });
                node_process_1.exit(1);
            }
            // 显示构建产物
            if (jsonStats.assets && jsonStats.assets.length > 0) {
                utils_1.showTitle('构建产物一览');
                const table = new cli_table_1.default({
                    head: ['NAME', 'SIZE'],
                    colAligns: ['right', 'right'],
                });
                jsonStats.assets.forEach(asset => {
                    const size = convert_units_1.default(asset.size).from('b').toBest();
                    table.push([asset.name, `${size.val.toFixed(1)} ${size.unit}`]);
                });
                this.log(table.toString());
            }
        });
    }
}
exports.default = Build;
Build.description = '构建正式环境';
Build.flags = {
    help: core_1.Flags.help(),
    debug: core_1.Flags.boolean({ char: 'D', description: '开启调试模式' }),
    all: core_1.Flags.boolean({ char: 'A', description: '显示所有构建结果' }),
};
