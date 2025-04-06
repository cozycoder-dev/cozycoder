"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ui8ToBuffer = ui8ToBuffer;
exports.ui8ToArrayBuffer = ui8ToArrayBuffer;
function ui8ToBuffer(bytes) {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}
function ui8ToArrayBuffer(bytes) {
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteLength + bytes.byteOffset);
}
//# sourceMappingURL=buffers.js.map