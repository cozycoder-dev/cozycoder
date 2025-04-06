"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const getRecommendedDidCredentials_1 = __importDefault(require("./getRecommendedDidCredentials"));
const requestPlcOperationSignature_1 = __importDefault(require("./requestPlcOperationSignature"));
const resolveHandle_1 = __importDefault(require("./resolveHandle"));
const signPlcOperation_1 = __importDefault(require("./signPlcOperation"));
const submitPlcOperation_1 = __importDefault(require("./submitPlcOperation"));
const updateHandle_1 = __importDefault(require("./updateHandle"));
function default_1(server, ctx) {
    (0, resolveHandle_1.default)(server, ctx);
    (0, updateHandle_1.default)(server, ctx);
    (0, getRecommendedDidCredentials_1.default)(server, ctx);
    (0, requestPlcOperationSignature_1.default)(server, ctx);
    (0, signPlcOperation_1.default)(server, ctx);
    (0, submitPlcOperation_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map