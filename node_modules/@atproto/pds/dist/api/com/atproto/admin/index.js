"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const deleteAccount_1 = __importDefault(require("./deleteAccount"));
const disableAccountInvites_1 = __importDefault(require("./disableAccountInvites"));
const disableInviteCodes_1 = __importDefault(require("./disableInviteCodes"));
const enableAccountInvites_1 = __importDefault(require("./enableAccountInvites"));
const getAccountInfo_1 = __importDefault(require("./getAccountInfo"));
const getAccountInfos_1 = __importDefault(require("./getAccountInfos"));
const getInviteCodes_1 = __importDefault(require("./getInviteCodes"));
const getSubjectStatus_1 = __importDefault(require("./getSubjectStatus"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
const updateAccountEmail_1 = __importDefault(require("./updateAccountEmail"));
const updateAccountHandle_1 = __importDefault(require("./updateAccountHandle"));
const updateAccountPassword_1 = __importDefault(require("./updateAccountPassword"));
const updateSubjectStatus_1 = __importDefault(require("./updateSubjectStatus"));
function default_1(server, ctx) {
    (0, updateSubjectStatus_1.default)(server, ctx);
    (0, getSubjectStatus_1.default)(server, ctx);
    (0, getAccountInfo_1.default)(server, ctx);
    (0, getAccountInfos_1.default)(server, ctx);
    (0, enableAccountInvites_1.default)(server, ctx);
    (0, disableAccountInvites_1.default)(server, ctx);
    (0, disableInviteCodes_1.default)(server, ctx);
    (0, getInviteCodes_1.default)(server, ctx);
    (0, updateAccountHandle_1.default)(server, ctx);
    (0, updateAccountEmail_1.default)(server, ctx);
    (0, updateAccountPassword_1.default)(server, ctx);
    (0, sendEmail_1.default)(server, ctx);
    (0, deleteAccount_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map