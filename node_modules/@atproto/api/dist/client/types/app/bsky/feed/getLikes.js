"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isLike = isLike;
exports.validateLike = validateLike;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.feed.getLikes';
function toKnownErr(e) {
    return e;
}
const hashLike = 'like';
function isLike(v) {
    return is$typed(v, id, hashLike);
}
function validateLike(v) {
    return validate(v, id, hashLike);
}
//# sourceMappingURL=getLikes.js.map