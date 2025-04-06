"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberNotFoundError = void 0;
exports.toKnownErr = toKnownErr;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_1 = require("@atproto/xrpc");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.team.updateMember';
class MemberNotFoundError extends xrpc_1.XRPCError {
    constructor(src) {
        super(src.status, src.error, src.message, src.headers, { cause: src });
    }
}
exports.MemberNotFoundError = MemberNotFoundError;
function toKnownErr(e) {
    if (e instanceof xrpc_1.XRPCError) {
        if (e.error === 'MemberNotFound')
            return new MemberNotFoundError(e);
    }
    return e;
}
//# sourceMappingURL=updateMember.js.map