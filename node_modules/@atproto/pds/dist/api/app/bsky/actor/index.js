"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const getPreferences_1 = __importDefault(require("./getPreferences"));
const getProfile_1 = __importDefault(require("./getProfile"));
const getProfiles_1 = __importDefault(require("./getProfiles"));
const putPreferences_1 = __importDefault(require("./putPreferences"));
function default_1(server, ctx) {
    (0, getPreferences_1.default)(server, ctx);
    (0, getProfile_1.default)(server, ctx);
    (0, getProfiles_1.default)(server, ctx);
    (0, putPreferences_1.default)(server, ctx);
}
//# sourceMappingURL=index.js.map