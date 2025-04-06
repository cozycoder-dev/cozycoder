"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionInvalidValueError = exports.ReactionLimitReachedError = exports.ReactionMessageDeletedError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'chat.bsky.convo.addReaction';
class ReactionMessageDeletedError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.ReactionMessageDeletedError = ReactionMessageDeletedError;
class ReactionLimitReachedError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.ReactionLimitReachedError = ReactionLimitReachedError;
class ReactionInvalidValueError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.ReactionInvalidValueError = ReactionInvalidValueError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'ReactionMessageDeleted')
            return new ReactionMessageDeletedError(e);
        if (e.error === 'ReactionLimitReached')
            return new ReactionLimitReachedError(e);
        if (e.error === 'ReactionInvalidValue')
            return new ReactionInvalidValueError(e);
    }
    return e;
}
//# sourceMappingURL=addReaction.js.map