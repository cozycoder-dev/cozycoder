"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatsToMimes = void 0;
exports.maybeGetInfo = maybeGetInfo;
exports.getInfo = getInfo;
const promises_1 = require("node:stream/promises");
const sharp_1 = __importDefault(require("sharp"));
const common_1 = require("@atproto/common");
async function maybeGetInfo(stream) {
    let metadata;
    try {
        const processor = (0, sharp_1.default)();
        const [result] = await Promise.all([
            processor.metadata(),
            (0, promises_1.pipeline)(stream, processor), // Handles error propagation
        ]);
        metadata = result;
    }
    catch (err) {
        if ((0, common_1.errHasMsg)(err, 'Input buffer contains unsupported image format')) {
            return null;
        }
        throw err;
    }
    const { size, height, width, format } = metadata;
    if (size === undefined ||
        height === undefined ||
        width === undefined ||
        format === undefined) {
        return null;
    }
    return {
        height,
        width,
        size,
        mime: exports.formatsToMimes[format] ?? 'unknown',
    };
}
async function getInfo(stream) {
    const maybeInfo = await maybeGetInfo(stream);
    if (!maybeInfo) {
        throw new Error('could not obtain all image metadata');
    }
    return maybeInfo;
}
exports.formatsToMimes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    webp: 'image/webp',
};
//# sourceMappingURL=index.js.map