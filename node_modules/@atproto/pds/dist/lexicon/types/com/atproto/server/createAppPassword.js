"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppPassword = isAppPassword;
exports.validateAppPassword = validateAppPassword;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.server.createAppPassword';
const hashAppPassword = 'appPassword';
function isAppPassword(v) {
    return is$typed(v, id, hashAppPassword);
}
function validateAppPassword(v) {
    return validate(v, id, hashAppPassword);
}
//# sourceMappingURL=createAppPassword.js.map