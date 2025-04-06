"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const actor_1 = __importDefault(require("./actor"));
const feed_1 = __importDefault(require("./feed"));
const notification_1 = __importDefault(require("./notification"));
function default_1(server, ctx) {
    (0, actor_1.default)(server, ctx);
    (0, feed_1.default)(server, ctx);
    (0, notification_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map