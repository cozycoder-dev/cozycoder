"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompactFormat = exports.verifySig = exports.verifyDidSig = void 0;
const p256_1 = require("@noble/curves/p256");
const sha256_1 = require("@noble/hashes/sha256");
const uint8arrays_1 = require("uint8arrays");
const const_1 = require("../const");
const utils_1 = require("../utils");
const verifyDidSig = async (did, data, sig, opts) => {
    const prefixedBytes = (0, utils_1.extractPrefixedBytes)((0, utils_1.extractMultikey)(did));
    if (!(0, utils_1.hasPrefix)(prefixedBytes, const_1.P256_DID_PREFIX)) {
        throw new Error(`Not a P-256 did:key: ${did}`);
    }
    const keyBytes = prefixedBytes.slice(const_1.P256_DID_PREFIX.length);
    return (0, exports.verifySig)(keyBytes, data, sig, opts);
};
exports.verifyDidSig = verifyDidSig;
const verifySig = async (publicKey, data, sig, opts) => {
    const allowMalleable = opts?.allowMalleableSig ?? false;
    const msgHash = await (0, sha256_1.sha256)(data);
    return p256_1.p256.verify(sig, msgHash, publicKey, {
        format: allowMalleable ? undefined : 'compact', // prevent DER-encoded signatures
        lowS: !allowMalleable,
    });
};
exports.verifySig = verifySig;
const isCompactFormat = (sig) => {
    try {
        const parsed = p256_1.p256.Signature.fromCompact(sig);
        return (0, uint8arrays_1.equals)(parsed.toCompactRawBytes(), sig);
    }
    catch {
        return false;
    }
};
exports.isCompactFormat = isCompactFormat;
//# sourceMappingURL=operations.js.map