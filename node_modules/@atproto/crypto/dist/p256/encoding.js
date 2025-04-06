"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompressPubkey = exports.compressPubkey = void 0;
const p256_1 = require("@noble/curves/p256");
const compressPubkey = (pubkeyBytes) => {
    const point = p256_1.p256.ProjectivePoint.fromHex(pubkeyBytes);
    return point.toRawBytes(true);
};
exports.compressPubkey = compressPubkey;
const decompressPubkey = (compressed) => {
    if (compressed.length !== 33) {
        throw new Error('Expected 33 byte compress pubkey');
    }
    const point = p256_1.p256.ProjectivePoint.fromHex(compressed);
    return point.toRawBytes(false);
};
exports.decompressPubkey = decompressPubkey;
//# sourceMappingURL=encoding.js.map