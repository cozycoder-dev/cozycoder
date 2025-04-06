"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecord = isRecord;
exports.validateRecord = validateRecord;
exports.isMentionRule = isMentionRule;
exports.validateMentionRule = validateMentionRule;
exports.isFollowerRule = isFollowerRule;
exports.validateFollowerRule = validateFollowerRule;
exports.isFollowingRule = isFollowingRule;
exports.validateFollowingRule = validateFollowingRule;
exports.isListRule = isListRule;
exports.validateListRule = validateListRule;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.threadgate';
const hashRecord = 'main';
function isRecord(v) {
    return is$typed(v, id, hashRecord);
}
function validateRecord(v) {
    return validate(v, id, hashRecord, true);
}
const hashMentionRule = 'mentionRule';
function isMentionRule(v) {
    return is$typed(v, id, hashMentionRule);
}
function validateMentionRule(v) {
    return validate(v, id, hashMentionRule);
}
const hashFollowerRule = 'followerRule';
function isFollowerRule(v) {
    return is$typed(v, id, hashFollowerRule);
}
function validateFollowerRule(v) {
    return validate(v, id, hashFollowerRule);
}
const hashFollowingRule = 'followingRule';
function isFollowingRule(v) {
    return is$typed(v, id, hashFollowingRule);
}
function validateFollowingRule(v) {
    return validate(v, id, hashFollowingRule);
}
const hashListRule = 'listRule';
function isListRule(v) {
    return is$typed(v, id, hashListRule);
}
function validateListRule(v) {
    return validate(v, id, hashListRule);
}
//# sourceMappingURL=threadgate.js.map