"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenId = exports.generateTokenId = exports.tokenIdSchema = exports.TOKEN_ID_LENGTH = void 0;
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const crypto_js_1 = require("../lib/util/crypto.js");
exports.TOKEN_ID_LENGTH = constants_js_1.TOKEN_ID_PREFIX.length + constants_js_1.TOKEN_ID_BYTES_LENGTH * 2; // hex encoding
exports.tokenIdSchema = zod_1.z
    .string()
    .length(exports.TOKEN_ID_LENGTH)
    .refine((v) => v.startsWith(constants_js_1.TOKEN_ID_PREFIX), {
    message: `Invalid token ID format`,
});
const generateTokenId = async () => {
    return `${constants_js_1.TOKEN_ID_PREFIX}${await (0, crypto_js_1.randomHexId)(constants_js_1.TOKEN_ID_BYTES_LENGTH)}`;
};
exports.generateTokenId = generateTokenId;
const isTokenId = (data) => exports.tokenIdSchema.safeParse(data).success;
exports.isTokenId = isTokenId;
//# sourceMappingURL=token-id.js.map