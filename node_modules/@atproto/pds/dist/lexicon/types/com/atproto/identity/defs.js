"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdentityInfo = isIdentityInfo;
exports.validateIdentityInfo = validateIdentityInfo;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.identity.defs';
const hashIdentityInfo = 'identityInfo';
function isIdentityInfo(v) {
    return is$typed(v, id, hashIdentityInfo);
}
function validateIdentityInfo(v) {
    return validate(v, id, hashIdentityInfo);
}
//# sourceMappingURL=defs.js.map