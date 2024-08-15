"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseDir = void 0;
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.baseDir = node_path_1.default.join(__dirname, '../../');
