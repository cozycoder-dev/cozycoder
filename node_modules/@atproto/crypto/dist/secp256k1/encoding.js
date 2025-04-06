"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompressPubkey = exports.compressPubkey = void 0;
const secp256k1_1 = require("@noble/curves/secp256k1");
const compressPubkey = (pubkeyBytes) => {
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromHex(pubkeyBytes);
    return point.toRawBytes(true);
};
exports.compressPubkey = compressPubkey;
const decompressPubkey = (compressed) => {
    if (compressed.length !== 33) {
        throw new Error('Expected 33 byte compress pubkey');
    }
    const point = secp256k1_1.secp256k1.ProjectivePoint.fromHex(compressed);
    return point.toRawBytes(false);
};
exports.decompressPubkey = decompressPubkey;
//# sourceMappingURL=encoding.js.map