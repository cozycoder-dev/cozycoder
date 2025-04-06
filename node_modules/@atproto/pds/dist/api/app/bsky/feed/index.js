"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const getActorLikes_1 = __importDefault(require("./getActorLikes"));
const getAuthorFeed_1 = __importDefault(require("./getAuthorFeed"));
const getFeed_1 = __importDefault(require("./getFeed"));
const getPostThread_1 = __importDefault(require("./getPostThread"));
const getTimeline_1 = __importDefault(require("./getTimeline"));
function default_1(server, ctx) {
    (0, getActorLikes_1.default)(server, ctx);
    (0, getAuthorFeed_1.default)(server, ctx);
    (0, getFeed_1.default)(server, ctx);
    (0, getPostThread_1.default)(server, ctx);
    (0, getTimeline_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map