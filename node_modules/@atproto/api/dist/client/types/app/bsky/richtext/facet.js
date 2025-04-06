"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isMention = isMention;
exports.validateMention = validateMention;
exports.isLink = isLink;
exports.validateLink = validateLink;
exports.isTag = isTag;
exports.validateTag = validateTag;
exports.isByteSlice = isByteSlice;
exports.validateByteSlice = validateByteSlice;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.richtext.facet';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain);
}
const hashMention = 'mention';
function isMention(v) {
    return is$typed(v, id, hashMention);
}
function validateMention(v) {
    return validate(v, id, hashMention);
}
const hashLink = 'link';
function isLink(v) {
    return is$typed(v, id, hashLink);
}
function validateLink(v) {
    return validate(v, id, hashLink);
}
const hashTag = 'tag';
function isTag(v) {
    return is$typed(v, id, hashTag);
}
function validateTag(v) {
    return validate(v, id, hashTag);
}
const hashByteSlice = 'byteSlice';
function isByteSlice(v) {
    return is$typed(v, id, hashByteSlice);
}
function validateByteSlice(v) {
    return validate(v, id, hashByteSlice);
}
//# sourceMappingURL=facet.js.map