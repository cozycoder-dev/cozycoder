"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isRecordBlob = isRecordBlob;
exports.validateRecordBlob = validateRecordBlob;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.repo.listMissingBlobs';
function toKnownErr(e) {
    return e;
}
const hashRecordBlob = 'recordBlob';
function isRecordBlob(v) {
    return is$typed(v, id, hashRecordBlob);
}
function validateRecordBlob(v) {
    return validate(v, id, hashRecordBlob);
}
//# sourceMappingURL=listMissingBlobs.js.map