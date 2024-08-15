"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const pjson = require('../../../package.json');
const hook = async function () {
    await new Promise(resolve => {
        figlet_1.default('NS', {
            font: 'Standard',
            horizontalLayout: 'full',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
        }, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk_1.default.green(data), chalk_1.default.blue(`\n------ 🦅 NS ${pjson.version} 正在为您服务 ------\n\n`));
            resolve(true);
        });
    });
};
exports.default = hook;
