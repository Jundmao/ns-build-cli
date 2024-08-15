"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const cross_spawn_1 = tslib_1.__importDefault(require("cross-spawn"));
class Tar extends core_1.Command {
    async run() {
        cross_spawn_1.default('npm', ['publish', '--registry', 'https://registry.dingxiang-inc.com'], {
            stdio: 'inherit',
        });
    }
}
exports.default = Tar;
Tar.description = '发布NPM包到顶象私有库';
Tar.examples = ['<%= config.bin %> <%= command.id %>'];
Tar.flags = {};
Tar.args = [];
