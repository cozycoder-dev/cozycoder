"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfileViewBasic = isProfileViewBasic;
exports.validateProfileViewBasic = validateProfileViewBasic;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'chat.bsky.actor.defs';
const hashProfileViewBasic = 'profileViewBasic';
function isProfileViewBasic(v) {
    return is$typed(v, id, hashProfileViewBasic);
}
function validateProfileViewBasic(v) {
    return validate(v, id, hashProfileViewBasic);
}
//# sourceMappingURL=defs.js.map