"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTitle = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const showTitle = (title) => {
    console.log(chalk_1.default.bgGreen.bold(`\n ◼︎ ${title} ◼︎ \n`));
};
exports.showTitle = showTitle;
