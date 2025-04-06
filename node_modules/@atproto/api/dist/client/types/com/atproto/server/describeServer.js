"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isLinks = isLinks;
exports.validateLinks = validateLinks;
exports.isContact = isContact;
exports.validateContact = validateContact;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.server.describeServer';
function toKnownErr(e) {
    return e;
}
const hashLinks = 'links';
function isLinks(v) {
    return is$typed(v, id, hashLinks);
}
function validateLinks(v) {
    return validate(v, id, hashLinks);
}
const hashContact = 'contact';
function isContact(v) {
    return is$typed(v, id, hashContact);
}
function validateContact(v) {
    return validate(v, id, hashContact);
}
//# sourceMappingURL=describeServer.js.map