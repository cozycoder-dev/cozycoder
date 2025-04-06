"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamByteChunks = streamByteChunks;
exports.byFrame = byFrame;
exports.byMessage = byMessage;
exports.ensureChunkIsMessage = ensureChunkIsMessage;
const ws_1 = require("ws");
const xrpc_1 = require("@atproto/xrpc");
const frames_1 = require("./frames");
function streamByteChunks(ws, options) {
    return (0, ws_1.createWebSocketStream)(ws, {
        ...options,
        readableObjectMode: true, // Ensures frame bytes don't get buffered/combined together
    });
}
async function* byFrame(ws, options) {
    const wsStream = streamByteChunks(ws, options);
    for await (const chunk of wsStream) {
        yield frames_1.Frame.fromBytes(chunk);
    }
}
async function* byMessage(ws, options) {
    const wsStream = streamByteChunks(ws, options);
    for await (const chunk of wsStream) {
        const msg = ensureChunkIsMessage(chunk);
        yield msg;
    }
}
function ensureChunkIsMessage(chunk) {
    const frame = frames_1.Frame.fromBytes(chunk);
    if (frame.isMessage()) {
        return frame;
    }
    else if (frame.isError()) {
        // @TODO work -1 error code into XRPCError
        // @ts-ignore
        throw new xrpc_1.XRPCError(-1, frame.code, frame.message);
    }
    else {
        throw new xrpc_1.XRPCError(xrpc_1.ResponseType.Unknown, undefined, 'Unknown frame type');
    }
}
//# sourceMappingURL=stream.js.map