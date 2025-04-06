"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isMetadata = isMetadata;
exports.validateMetadata = validateMetadata;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'chat.bsky.moderation.getActorMetadata';
function toKnownErr(e) {
    return e;
}
const hashMetadata = 'metadata';
function isMetadata(v) {
    return is$typed(v, id, hashMetadata);
}
function validateMetadata(v) {
    return validate(v, id, hashMetadata);
}
//# sourceMappingURL=getActorMetadata.js.map