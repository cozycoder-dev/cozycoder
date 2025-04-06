"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isAccountCodes = isAccountCodes;
exports.validateAccountCodes = validateAccountCodes;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.server.createInviteCodes';
function toKnownErr(e) {
    return e;
}
const hashAccountCodes = 'accountCodes';
function isAccountCodes(v) {
    return is$typed(v, id, hashAccountCodes);
}
function validateAccountCodes(v) {
    return validate(v, id, hashAccountCodes);
}
//# sourceMappingURL=createInviteCodes.js.map