"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecord = isRecord;
exports.validateRecord = validateRecord;
exports.isDisableRule = isDisableRule;
exports.validateDisableRule = validateDisableRule;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.postgate';
const hashRecord = 'main';
function isRecord(v) {
    return is$typed(v, id, hashRecord);
}
function validateRecord(v) {
    return validate(v, id, hashRecord, true);
}
const hashDisableRule = 'disableRule';
function isDisableRule(v) {
    return is$typed(v, id, hashDisableRule);
}
function validateDisableRule(v) {
    return validate(v, id, hashDisableRule);
}
//# sourceMappingURL=postgate.js.map