"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isFeed = isFeed;
exports.validateFeed = validateFeed;
exports.isLinks = isLinks;
exports.validateLinks = validateLinks;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.describeFeedGenerator';
function toKnownErr(e) {
    return e;
}
const hashFeed = 'feed';
function isFeed(v) {
    return is$typed(v, id, hashFeed);
}
function validateFeed(v) {
    return validate(v, id, hashFeed);
}
const hashLinks = 'links';
function isLinks(v) {
    return is$typed(v, id, hashLinks);
}
function validateLinks(v) {
    return validate(v, id, hashLinks);
}
//# sourceMappingURL=describeFeedGenerator.js.map