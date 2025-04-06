"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidDeactivatedError = exports.DidNotFoundError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.identity.resolveDid';
class DidNotFoundError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.DidNotFoundError = DidNotFoundError;
class DidDeactivatedError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.DidDeactivatedError = DidDeactivatedError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'DidNotFound')
            return new DidNotFoundError(e);
        if (e.error === 'DidDeactivated')
            return new DidDeactivatedError(e);
    }
    return e;
}
//# sourceMappingURL=resolveDid.js.map