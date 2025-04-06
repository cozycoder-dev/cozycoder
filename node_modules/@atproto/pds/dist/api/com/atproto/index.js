"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const admin_1 = __importDefault(require("./admin"));
const identity_1 = __importDefault(require("./identity"));
const moderation_1 = __importDefault(require("./moderation"));
const repo_1 = __importDefault(require("./repo"));
const server_1 = __importDefault(require("./server"));
const sync_1 = __importDefault(require("./sync"));
const temp_1 = __importDefault(require("./temp"));
function default_1(server, ctx) {
    (0, admin_1.default)(server, ctx);
    (0, identity_1.default)(server, ctx);
    (0, moderation_1.default)(server, ctx);
    (0, repo_1.default)(server, ctx);
    (0, server_1.default)(server, ctx);
    (0, sync_1.default)(server, ctx);
    (0, temp_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map