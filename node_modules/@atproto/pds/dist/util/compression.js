"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const compression_1 = __importDefault(require("compression"));
function default_1() {
    return (0, compression_1.default)({
        filter,
    });
}
function filter(_req, res) {
    const contentType = res.getHeader('Content-type');
    if (contentType === 'application/vnd.ipld.car') {
        return true;
    }
    return compression_1.default.filter(_req, res);
}
//# sourceMappingURL=compression.js.map