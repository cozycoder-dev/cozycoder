"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const getCheckout_1 = __importDefault(require("./deprecated/getCheckout"));
const getHead_1 = __importDefault(require("./deprecated/getHead"));
const getBlob_1 = __importDefault(require("./getBlob"));
const getBlocks_1 = __importDefault(require("./getBlocks"));
const getLatestCommit_1 = __importDefault(require("./getLatestCommit"));
const getRecord_1 = __importDefault(require("./getRecord"));
const getRepo_1 = __importDefault(require("./getRepo"));
const getRepoStatus_1 = __importDefault(require("./getRepoStatus"));
const listBlobs_1 = __importDefault(require("./listBlobs"));
const listRepos_1 = __importDefault(require("./listRepos"));
const subscribeRepos_1 = __importDefault(require("./subscribeRepos"));
function default_1(server, ctx) {
    (0, getBlob_1.default)(server, ctx);
    (0, getBlocks_1.default)(server, ctx);
    (0, getLatestCommit_1.default)(server, ctx);
    (0, getRepoStatus_1.default)(server, ctx);
    (0, getRecord_1.default)(server, ctx);
    (0, getRepo_1.default)(server, ctx);
    (0, subscribeRepos_1.default)(server, ctx);
    (0, listBlobs_1.default)(server, ctx);
    (0, listRepos_1.default)(server, ctx);
    (0, getCheckout_1.default)(server, ctx);
    (0, getHead_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map