"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const applyWrites_1 = __importDefault(require("./applyWrites"));
const createRecord_1 = __importDefault(require("./createRecord"));
const deleteRecord_1 = __importDefault(require("./deleteRecord"));
const describeRepo_1 = __importDefault(require("./describeRepo"));
const getRecord_1 = __importDefault(require("./getRecord"));
const importRepo_1 = __importDefault(require("./importRepo"));
const listMissingBlobs_1 = __importDefault(require("./listMissingBlobs"));
const listRecords_1 = __importDefault(require("./listRecords"));
const putRecord_1 = __importDefault(require("./putRecord"));
const uploadBlob_1 = __importDefault(require("./uploadBlob"));
function default_1(server, ctx) {
    (0, applyWrites_1.default)(server, ctx);
    (0, createRecord_1.default)(server, ctx);
    (0, deleteRecord_1.default)(server, ctx);
    (0, describeRepo_1.default)(server, ctx);
    (0, getRecord_1.default)(server, ctx);
    (0, listRecords_1.default)(server, ctx);
    (0, putRecord_1.default)(server, ctx);
    (0, uploadBlob_1.default)(server, ctx);
    (0, listMissingBlobs_1.default)(server, ctx);
    (0, importRepo_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map