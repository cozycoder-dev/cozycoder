"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isNotification = isNotification;
exports.validateNotification = validateNotification;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.notification.listNotifications';
function toKnownErr(e) {
    return e;
}
const hashNotification = 'notification';
function isNotification(v) {
    return is$typed(v, id, hashNotification);
}
function validateNotification(v) {
    return validate(v, id, hashNotification);
}
//# sourceMappingURL=listNotifications.js.map