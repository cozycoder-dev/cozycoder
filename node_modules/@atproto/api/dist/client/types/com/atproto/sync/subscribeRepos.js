"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommit = isCommit;
exports.validateCommit = validateCommit;
exports.isSync = isSync;
exports.validateSync = validateSync;
exports.isIdentity = isIdentity;
exports.validateIdentity = validateIdentity;
exports.isAccount = isAccount;
exports.validateAccount = validateAccount;
exports.isInfo = isInfo;
exports.validateInfo = validateInfo;
exports.isRepoOp = isRepoOp;
exports.validateRepoOp = validateRepoOp;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.sync.subscribeRepos';
const hashCommit = 'commit';
function isCommit(v) {
    return is$typed(v, id, hashCommit);
}
function validateCommit(v) {
    return validate(v, id, hashCommit);
}
const hashSync = 'sync';
function isSync(v) {
    return is$typed(v, id, hashSync);
}
function validateSync(v) {
    return validate(v, id, hashSync);
}
const hashIdentity = 'identity';
function isIdentity(v) {
    return is$typed(v, id, hashIdentity);
}
function validateIdentity(v) {
    return validate(v, id, hashIdentity);
}
const hashAccount = 'account';
function isAccount(v) {
    return is$typed(v, id, hashAccount);
}
function validateAccount(v) {
    return validate(v, id, hashAccount);
}
const hashInfo = 'info';
function isInfo(v) {
    return is$typed(v, id, hashInfo);
}
function validateInfo(v) {
    return validate(v, id, hashInfo);
}
const hashRepoOp = 'repoOp';
function isRepoOp(v) {
    return is$typed(v, id, hashRepoOp);
}
function validateRepoOp(v) {
    return validate(v, id, hashRepoOp);
}
//# sourceMappingURL=subscribeRepos.js.map