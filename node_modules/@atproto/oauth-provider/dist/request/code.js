"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.isCode = exports.codeSchema = exports.CODE_LENGTH = void 0;
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const crypto_js_1 = require("../lib/util/crypto.js");
exports.CODE_LENGTH = constants_js_1.CODE_PREFIX.length + constants_js_1.CODE_BYTES_LENGTH * 2; // hex encoding
exports.codeSchema = zod_1.z
    .string()
    .length(exports.CODE_LENGTH) // hex encoding
    .refine((v) => v.startsWith(constants_js_1.CODE_PREFIX), {
    message: `Invalid code format`,
});
const isCode = (data) => exports.codeSchema.safeParse(data).success;
exports.isCode = isCode;
const generateCode = async () => {
    return `${constants_js_1.CODE_PREFIX}${await (0, crypto_js_1.randomHexId)(constants_js_1.CODE_BYTES_LENGTH)}`;
};
exports.generateCode = generateCode;
//# sourceMappingURL=code.js.map