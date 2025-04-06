"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabelerView = isLabelerView;
exports.validateLabelerView = validateLabelerView;
exports.isLabelerViewDetailed = isLabelerViewDetailed;
exports.validateLabelerViewDetailed = validateLabelerViewDetailed;
exports.isLabelerViewerState = isLabelerViewerState;
exports.validateLabelerViewerState = validateLabelerViewerState;
exports.isLabelerPolicies = isLabelerPolicies;
exports.validateLabelerPolicies = validateLabelerPolicies;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.labeler.defs';
const hashLabelerView = 'labelerView';
function isLabelerView(v) {
    return is$typed(v, id, hashLabelerView);
}
function validateLabelerView(v) {
    return validate(v, id, hashLabelerView);
}
const hashLabelerViewDetailed = 'labelerViewDetailed';
function isLabelerViewDetailed(v) {
    return is$typed(v, id, hashLabelerViewDetailed);
}
function validateLabelerViewDetailed(v) {
    return validate(v, id, hashLabelerViewDetailed);
}
const hashLabelerViewerState = 'labelerViewerState';
function isLabelerViewerState(v) {
    return is$typed(v, id, hashLabelerViewerState);
}
function validateLabelerViewerState(v) {
    return validate(v, id, hashLabelerViewerState);
}
const hashLabelerPolicies = 'labelerPolicies';
function isLabelerPolicies(v) {
    return is$typed(v, id, hashLabelerPolicies);
}
function validateLabelerPolicies(v) {
    return validate(v, id, hashLabelerPolicies);
}
//# sourceMappingURL=defs.js.map