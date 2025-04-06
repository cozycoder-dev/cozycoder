"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabels = isLabels;
exports.validateLabels = validateLabels;
exports.isInfo = isInfo;
exports.validateInfo = validateInfo;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.label.subscribeLabels';
const hashLabels = 'labels';
function isLabels(v) {
    return is$typed(v, id, hashLabels);
}
function validateLabels(v) {
    return validate(v, id, hashLabels);
}
const hashInfo = 'info';
function isInfo(v) {
    return is$typed(v, id, hashInfo);
}
function validateInfo(v) {
    return validate(v, id, hashInfo);
}
//# sourceMappingURL=subscribeLabels.js.map