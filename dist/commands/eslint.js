"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const eslint_1 = require("eslint");
const ora_1 = tslib_1.__importDefault(require("ora"));
class EslintCommand extends core_1.Command {
    async run() {
        const spinner = ora_1.default({
            text: '正在检查文件',
            spinner: 'aesthetic',
        }).start();
        try {
            const { flags } = await this.parse(EslintCommand);
            const eslint = new eslint_1.ESLint({ fix: flags.fix });
            const source_pattern = 'src/**/*.{js,jsx,ts,tsx}';
            const results = await eslint.lintFiles([source_pattern]);
            await eslint_1.ESLint.outputFixes(results);
            const formatter = await eslint.loadFormatter();
            const resultText = await formatter.format(results);
            this.log(resultText);
            const fixCount = results.filter(item => !!item.output).length;
            spinner.succeed(`完成 ${results.length} 个文件检查，自动修复 ${fixCount} 个文件`);
        }
        catch (error) {
            spinner.fail(`文件检查报错\n ${error}`);
        }
    }
}
exports.default = EslintCommand;
EslintCommand.description = '代码检查';
EslintCommand.examples = ['<%= config.bin %> <%= command.id %>'];
EslintCommand.flags = {
    help: core_1.Flags.help(),
    fix: core_1.Flags.boolean({ description: '是否自动修复' }),
};
EslintCommand.args = [];
