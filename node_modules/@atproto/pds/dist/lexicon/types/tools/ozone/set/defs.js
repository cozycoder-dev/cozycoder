"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSet = isSet;
exports.validateSet = validateSet;
exports.isSetView = isSetView;
exports.validateSetView = validateSetView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.set.defs';
const hashSet = 'set';
function isSet(v) {
    return is$typed(v, id, hashSet);
}
function validateSet(v) {
    return validate(v, id, hashSet);
}
const hashSetView = 'setView';
function isSetView(v) {
    return is$typed(v, id, hashSetView);
}
function validateSetView(v) {
    return validate(v, id, hashSetView);
}
//# sourceMappingURL=defs.js.map