"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxSizeChecker = exports.bytesToStream = exports.byteIterableToStream = exports.streamToNodeBuffer = exports.streamToBytes = exports.streamSize = exports.cloneStream = exports.forwardStreamErrors = void 0;
exports.decodeStream = decodeStream;
exports.createDecoders = createDecoders;
const node_stream_1 = require("node:stream");
const node_zlib_1 = require("node:zlib");
const forwardStreamErrors = (...streams) => {
    for (let i = 1; i < streams.length; ++i) {
        const prev = streams[i - 1];
        const next = streams[i];
        prev.once('error', (err) => next.emit('error', err));
    }
};
exports.forwardStreamErrors = forwardStreamErrors;
const cloneStream = (stream) => {
    const passthrough = new node_stream_1.PassThrough();
    (0, exports.forwardStreamErrors)(stream, passthrough);
    return stream.pipe(passthrough);
};
exports.cloneStream = cloneStream;
const streamSize = async (stream) => {
    let size = 0;
    for await (const chunk of stream) {
        size += Buffer.byteLength(chunk);
    }
    return size;
};
exports.streamSize = streamSize;
const streamToBytes = async (stream) => 
// @NOTE Though Buffer is a sub-class of Uint8Array, we have observed
// inconsistencies when using a Buffer in place of Uint8Array. For this
// reason, we convert the Buffer to a Uint8Array.
new Uint8Array(await (0, exports.streamToNodeBuffer)(stream));
exports.streamToBytes = streamToBytes;
// streamToBuffer identifier name already taken by @atproto/common-web
const streamToNodeBuffer = async (stream) => {
    const chunks = [];
    let totalLength = 0; // keep track of total length for Buffer.concat
    for await (const chunk of stream) {
        if (chunk instanceof Uint8Array) {
            chunks.push(chunk);
            totalLength += Buffer.byteLength(chunk);
        }
        else {
            throw new TypeError('expected Uint8Array');
        }
    }
    return Buffer.concat(chunks, totalLength);
};
exports.streamToNodeBuffer = streamToNodeBuffer;
const byteIterableToStream = (iter) => {
    return node_stream_1.Readable.from(iter, { objectMode: false });
};
exports.byteIterableToStream = byteIterableToStream;
const bytesToStream = (bytes) => {
    const stream = new node_stream_1.Readable();
    stream.push(bytes);
    stream.push(null);
    return stream;
};
exports.bytesToStream = bytesToStream;
class MaxSizeChecker extends node_stream_1.Transform {
    constructor(maxSize, createError) {
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: maxSize
        });
        Object.defineProperty(this, "createError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createError
        });
        Object.defineProperty(this, "totalSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    _transform(chunk, _enc, cb) {
        this.totalSize += chunk.length;
        if (this.totalSize > this.maxSize) {
            cb(this.createError());
        }
        else {
            cb(null, chunk);
        }
    }
}
exports.MaxSizeChecker = MaxSizeChecker;
function decodeStream(stream, contentEncoding) {
    const decoders = createDecoders(contentEncoding);
    if (decoders.length === 0)
        return stream;
    return (0, node_stream_1.pipeline)([stream, ...decoders], () => { });
}
/**
 * Create a series of decoding streams based on the content-encoding header. The
 * resulting streams should be piped together to decode the content.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9110#section-8.4.1}
 */
function createDecoders(contentEncoding) {
    const decoders = [];
    if (contentEncoding?.length) {
        const encodings = Array.isArray(contentEncoding)
            ? contentEncoding.flatMap(commaSplit)
            : contentEncoding.split(',');
        for (const encoding of encodings) {
            const normalizedEncoding = normalizeEncoding(encoding);
            // @NOTE
            // > The default (identity) encoding [...] is used only in the
            // > Accept-Encoding header, and SHOULD NOT be used in the
            // > Content-Encoding header.
            if (normalizedEncoding === 'identity')
                continue;
            decoders.push(createDecoder(normalizedEncoding));
        }
    }
    return decoders.reverse();
}
function commaSplit(header) {
    return header.split(',');
}
function normalizeEncoding(encoding) {
    // https://www.rfc-editor.org/rfc/rfc7231#section-3.1.2.1
    // > All content-coding values are case-insensitive...
    return encoding.trim().toLowerCase();
}
function createDecoder(normalizedEncoding) {
    switch (normalizedEncoding) {
        // https://www.rfc-editor.org/rfc/rfc9112.html#section-7.2
        case 'gzip':
        case 'x-gzip':
            return (0, node_zlib_1.createGunzip)();
        case 'deflate':
            return (0, node_zlib_1.createInflate)();
        case 'br':
            return (0, node_zlib_1.createBrotliDecompress)();
        case 'identity':
            return new node_stream_1.PassThrough();
        default:
            throw new TypeError(`Unsupported content-encoding: "${normalizedEncoding}"`);
    }
}
//# sourceMappingURL=streams.js.map