"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommitMeta = isCommitMeta;
exports.validateCommitMeta = validateCommitMeta;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.repo.defs';
const hashCommitMeta = 'commitMeta';
function isCommitMeta(v) {
    return is$typed(v, id, hashCommitMeta);
}
function validateCommitMeta(v) {
    return validate(v, id, hashCommitMeta);
}
//# sourceMappingURL=defs.js.map