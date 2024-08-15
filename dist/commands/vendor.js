"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const webpack_1 = tslib_1.__importDefault(require("webpack"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class Vendor extends core_1.Command {
    async run() {
        const webpackConfig = require('../../config/webpack/webpack.vendor.config.js');
        const compiler = webpack_1.default(webpackConfig);
        compiler.run((err, stats) => {
            if (err) {
                console.log(chalk_1.default.red(err.stack || err));
                return;
            }
            console.log(stats.toString({
                chunks: false,
                colors: true,
            }));
        });
    }
}
exports.default = Vendor;
Vendor.description = '构建vendor文件';
Vendor.examples = ['<%= config.bin %> <%= command.id %>'];
