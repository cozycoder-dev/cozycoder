"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInviteCode = isInviteCode;
exports.validateInviteCode = validateInviteCode;
exports.isInviteCodeUse = isInviteCodeUse;
exports.validateInviteCodeUse = validateInviteCodeUse;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.server.defs';
const hashInviteCode = 'inviteCode';
function isInviteCode(v) {
    return is$typed(v, id, hashInviteCode);
}
function validateInviteCode(v) {
    return validate(v, id, hashInviteCode);
}
const hashInviteCodeUse = 'inviteCodeUse';
function isInviteCodeUse(v) {
    return is$typed(v, id, hashInviteCodeUse);
}
function validateInviteCodeUse(v) {
    return validate(v, id, hashInviteCodeUse);
}
//# sourceMappingURL=defs.js.map