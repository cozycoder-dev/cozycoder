"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownFeedError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.getFeed';
class UnknownFeedError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.UnknownFeedError = UnknownFeedError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'UnknownFeed')
            return new UnknownFeedError(e);
    }
    return e;
}
//# sourceMappingURL=getFeed.js.map