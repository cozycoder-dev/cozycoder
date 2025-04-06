"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isBatchItem = isBatchItem;
exports.validateBatchItem = validateBatchItem;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'chat.bsky.convo.sendMessageBatch';
function toKnownErr(e) {
    return e;
}
const hashBatchItem = 'batchItem';
function isBatchItem(v) {
    return is$typed(v, id, hashBatchItem);
}
function validateBatchItem(v) {
    return validate(v, id, hashBatchItem);
}
//# sourceMappingURL=sendMessageBatch.js.map