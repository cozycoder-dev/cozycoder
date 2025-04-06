"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedByActorError = exports.BlockedActorError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.getAuthorFeed';
class BlockedActorError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.BlockedActorError = BlockedActorError;
class BlockedByActorError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.BlockedByActorError = BlockedByActorError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'BlockedActor')
            return new BlockedActorError(e);
        if (e.error === 'BlockedByActor')
            return new BlockedByActorError(e);
    }
    return e;
}
//# sourceMappingURL=getAuthorFeed.js.map