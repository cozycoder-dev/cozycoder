"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionId = exports.sessionIdSchema = exports.SESSION_ID_LENGTH = void 0;
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const crypto_js_1 = require("../lib/util/crypto.js");
exports.SESSION_ID_LENGTH = constants_js_1.SESSION_ID_PREFIX.length + constants_js_1.SESSION_ID_BYTES_LENGTH * 2; // hex encoding
exports.sessionIdSchema = zod_1.z
    .string()
    .length(exports.SESSION_ID_LENGTH)
    .refine((v) => v.startsWith(constants_js_1.SESSION_ID_PREFIX), {
    message: `Invalid session ID format`,
});
const generateSessionId = async () => {
    return `${constants_js_1.SESSION_ID_PREFIX}${await (0, crypto_js_1.randomHexId)(constants_js_1.SESSION_ID_BYTES_LENGTH)}`;
};
exports.generateSessionId = generateSessionId;
//# sourceMappingURL=session-id.js.map