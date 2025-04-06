"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameIfExists = exports.rmIfExists = exports.readIfExists = exports.fileExists = void 0;
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const common_web_1 = require("@atproto/common-web");
const fileExists = async (location) => {
    try {
        await promises_1.default.access(location, node_fs_1.constants.F_OK);
        return true;
    }
    catch (err) {
        if ((0, common_web_1.isErrnoException)(err) && err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};
exports.fileExists = fileExists;
const readIfExists = async (filepath) => {
    try {
        return await promises_1.default.readFile(filepath);
    }
    catch (err) {
        if ((0, common_web_1.isErrnoException)(err) && err.code === 'ENOENT') {
            return;
        }
        throw err;
    }
};
exports.readIfExists = readIfExists;
const rmIfExists = async (filepath, recursive = false) => {
    try {
        await promises_1.default.rm(filepath, { recursive });
    }
    catch (err) {
        if ((0, common_web_1.isErrnoException)(err) && err.code === 'ENOENT') {
            return;
        }
        throw err;
    }
};
exports.rmIfExists = rmIfExists;
const renameIfExists = async (oldPath, newPath) => {
    try {
        await promises_1.default.rename(oldPath, newPath);
    }
    catch (err) {
        if ((0, common_web_1.isErrnoException)(err) && err.code === 'ENOENT') {
            return;
        }
        throw err;
    }
};
exports.renameIfExists = renameIfExists;
//# sourceMappingURL=fs.js.map