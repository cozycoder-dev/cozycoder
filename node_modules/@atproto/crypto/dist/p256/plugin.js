"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.p256Plugin = void 0;
const const_1 = require("../const");
const encoding_1 = require("./encoding");
const operations_1 = require("./operations");
exports.p256Plugin = {
    prefix: const_1.P256_DID_PREFIX,
    jwtAlg: const_1.P256_JWT_ALG,
    verifySignature: operations_1.verifyDidSig,
    compressPubkey: encoding_1.compressPubkey,
    decompressPubkey: encoding_1.decompressPubkey,
};
//# sourceMappingURL=plugin.js.map