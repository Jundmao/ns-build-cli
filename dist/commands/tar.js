"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const core_1 = require("@oclif/core");
const ora_1 = tslib_1.__importDefault(require("ora"));
const cross_spawn_1 = tslib_1.__importDefault(require("cross-spawn"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class Tar extends core_1.Command {
    async run() {
        var _a, _b;
        const tarFilename = 'build.tar.gz';
        const tarDir = 'build';
        const spinner = ora_1.default({
            text: '正在打包中',
            spinner: 'aesthetic',
        }).start();
        const dirPath = node_path_1.default.join(process.cwd(), tarDir);
        if (!node_fs_1.default.existsSync(dirPath)) {
            node_fs_1.default.mkdirSync(dirPath);
        }
        const child = cross_spawn_1.default('tar', ['-zcvf', tarFilename, tarDir]);
        (_a = child.stderr) === null || _a === void 0 ? void 0 : _a.setEncoding('utf8');
        (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            data
                .toString()
                .split('\n')
                .forEach((line) => {
                spinner.text = line;
            });
        });
        child.on('close', () => {
            spinner.succeed(`🎉 ${chalk_1.default.yellow(tarFilename)} 打包完成`);
        });
    }
}
exports.default = Tar;
Tar.description = '为子应用生成tar包';
