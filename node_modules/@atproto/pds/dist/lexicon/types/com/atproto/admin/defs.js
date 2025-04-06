"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStatusAttr = isStatusAttr;
exports.validateStatusAttr = validateStatusAttr;
exports.isAccountView = isAccountView;
exports.validateAccountView = validateAccountView;
exports.isRepoRef = isRepoRef;
exports.validateRepoRef = validateRepoRef;
exports.isRepoBlobRef = isRepoBlobRef;
exports.validateRepoBlobRef = validateRepoBlobRef;
exports.isThreatSignature = isThreatSignature;
exports.validateThreatSignature = validateThreatSignature;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.admin.defs';
const hashStatusAttr = 'statusAttr';
function isStatusAttr(v) {
    return is$typed(v, id, hashStatusAttr);
}
function validateStatusAttr(v) {
    return validate(v, id, hashStatusAttr);
}
const hashAccountView = 'accountView';
function isAccountView(v) {
    return is$typed(v, id, hashAccountView);
}
function validateAccountView(v) {
    return validate(v, id, hashAccountView);
}
const hashRepoRef = 'repoRef';
function isRepoRef(v) {
    return is$typed(v, id, hashRepoRef);
}
function validateRepoRef(v) {
    return validate(v, id, hashRepoRef);
}
const hashRepoBlobRef = 'repoBlobRef';
function isRepoBlobRef(v) {
    return is$typed(v, id, hashRepoBlobRef);
}
function validateRepoBlobRef(v) {
    return validate(v, id, hashRepoBlobRef);
}
const hashThreatSignature = 'threatSignature';
function isThreatSignature(v) {
    return is$typed(v, id, hashThreatSignature);
}
function validateThreatSignature(v) {
    return validate(v, id, hashThreatSignature);
}
//# sourceMappingURL=defs.js.map