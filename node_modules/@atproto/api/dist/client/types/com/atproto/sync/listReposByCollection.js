"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isRepo = isRepo;
exports.validateRepo = validateRepo;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.sync.listReposByCollection';
function toKnownErr(e) {
    return e;
}
const hashRepo = 'repo';
function isRepo(v) {
    return is$typed(v, id, hashRepo);
}
function validateRepo(v) {
    return validate(v, id, hashRepo);
}
//# sourceMappingURL=listReposByCollection.js.map