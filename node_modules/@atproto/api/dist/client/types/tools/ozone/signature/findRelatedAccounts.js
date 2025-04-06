"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isRelatedAccount = isRelatedAccount;
exports.validateRelatedAccount = validateRelatedAccount;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.signature.findRelatedAccounts';
function toKnownErr(e) {
    return e;
}
const hashRelatedAccount = 'relatedAccount';
function isRelatedAccount(v) {
    return is$typed(v, id, hashRelatedAccount);
}
function validateRelatedAccount(v) {
    return validate(v, id, hashRelatedAccount);
}
//# sourceMappingURL=findRelatedAccounts.js.map