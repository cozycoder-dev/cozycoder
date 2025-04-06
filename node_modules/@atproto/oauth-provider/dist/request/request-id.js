"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestId = exports.requestIdSchema = exports.REQUEST_ID_LENGTH = void 0;
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const crypto_js_1 = require("../lib/util/crypto.js");
exports.REQUEST_ID_LENGTH = constants_js_1.REQUEST_ID_PREFIX.length + constants_js_1.REQUEST_ID_BYTES_LENGTH * 2; // hex encoding
exports.requestIdSchema = zod_1.z
    .string()
    .length(exports.REQUEST_ID_LENGTH)
    .refine((v) => v.startsWith(constants_js_1.REQUEST_ID_PREFIX), {
    message: `Invalid request ID format`,
});
const generateRequestId = async () => {
    return `${constants_js_1.REQUEST_ID_PREFIX}${await (0, crypto_js_1.randomHexId)(constants_js_1.REQUEST_ID_BYTES_LENGTH)}`;
};
exports.generateRequestId = generateRequestId;
//# sourceMappingURL=request-id.js.map