"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envList = exports.envBool = exports.envStr = exports.envInt = void 0;
const common_web_1 = require("@atproto/common-web");
const envInt = (name) => {
    const str = process.env[name];
    return (0, common_web_1.parseIntWithFallback)(str, undefined);
};
exports.envInt = envInt;
const envStr = (name) => {
    const str = process.env[name];
    if (str === undefined || str.length === 0)
        return undefined;
    return str;
};
exports.envStr = envStr;
const envBool = (name) => {
    const str = process.env[name];
    if (str === 'true' || str === '1')
        return true;
    if (str === 'false' || str === '0')
        return false;
    return undefined;
};
exports.envBool = envBool;
const envList = (name) => {
    const str = process.env[name];
    if (str === undefined || str.length === 0)
        return [];
    return str.split(',');
};
exports.envList = envList;
//# sourceMappingURL=env.js.map