"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secp256k1Plugin = void 0;
const const_1 = require("../const");
const encoding_1 = require("./encoding");
const operations_1 = require("./operations");
exports.secp256k1Plugin = {
    prefix: const_1.SECP256K1_DID_PREFIX,
    jwtAlg: const_1.SECP256K1_JWT_ALG,
    verifySignature: operations_1.verifyDidSig,
    compressPubkey: encoding_1.compressPubkey,
    decompressPubkey: encoding_1.decompressPubkey,
};
//# sourceMappingURL=plugin.js.map