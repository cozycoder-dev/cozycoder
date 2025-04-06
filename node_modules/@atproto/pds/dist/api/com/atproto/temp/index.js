"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const checkSignupQueue_1 = __importDefault(require("./checkSignupQueue"));
function default_1(server, ctx) {
    (0, checkSignupQueue_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map