"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecord = isRecord;
exports.validateRecord = validateRecord;
exports.isReplyRef = isReplyRef;
exports.validateReplyRef = validateReplyRef;
exports.isEntity = isEntity;
exports.validateEntity = validateEntity;
exports.isTextSlice = isTextSlice;
exports.validateTextSlice = validateTextSlice;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.post';
const hashRecord = 'main';
function isRecord(v) {
    return is$typed(v, id, hashRecord);
}
function validateRecord(v) {
    return validate(v, id, hashRecord, true);
}
const hashReplyRef = 'replyRef';
function isReplyRef(v) {
    return is$typed(v, id, hashReplyRef);
}
function validateReplyRef(v) {
    return validate(v, id, hashReplyRef);
}
const hashEntity = 'entity';
function isEntity(v) {
    return is$typed(v, id, hashEntity);
}
function validateEntity(v) {
    return validate(v, id, hashEntity);
}
const hashTextSlice = 'textSlice';
function isTextSlice(v) {
    return is$typed(v, id, hashTextSlice);
}
function validateTextSlice(v) {
    return validate(v, id, hashTextSlice);
}
//# sourceMappingURL=post.js.map