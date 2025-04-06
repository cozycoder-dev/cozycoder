"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.isRefreshToken = exports.refreshTokenSchema = exports.REFRESH_TOKEN_LENGTH = void 0;
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const crypto_js_1 = require("../lib/util/crypto.js");
exports.REFRESH_TOKEN_LENGTH = constants_js_1.REFRESH_TOKEN_PREFIX.length + constants_js_1.REFRESH_TOKEN_BYTES_LENGTH * 2; // hex encoding
exports.refreshTokenSchema = zod_1.z
    .string()
    .length(exports.REFRESH_TOKEN_LENGTH)
    .refine((v) => v.startsWith(constants_js_1.REFRESH_TOKEN_PREFIX), {
    message: `Invalid refresh token format`,
});
const isRefreshToken = (data) => exports.refreshTokenSchema.safeParse(data).success;
exports.isRefreshToken = isRefreshToken;
const generateRefreshToken = async () => {
    return `${constants_js_1.REFRESH_TOKEN_PREFIX}${await (0, crypto_js_1.randomHexId)(constants_js_1.REFRESH_TOKEN_BYTES_LENGTH)}`;
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=refresh-token.js.map