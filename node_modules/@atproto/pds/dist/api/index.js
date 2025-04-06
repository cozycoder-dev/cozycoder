"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const bsky_1 = __importDefault(require("./app/bsky"));
const atproto_1 = __importDefault(require("./com/atproto"));
function default_1(server, ctx) {
    (0, atproto_1.default)(server, ctx);
    (0, bsky_1.default)(server, ctx);
    return server;
}
//# sourceMappingURL=index.js.map