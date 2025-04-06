"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toKnownErr = toKnownErr;
exports.isServiceConfig = isServiceConfig;
exports.validateServiceConfig = validateServiceConfig;
exports.isViewerConfig = isViewerConfig;
exports.validateViewerConfig = validateViewerConfig;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.server.getConfig';
function toKnownErr(e) {
    return e;
}
const hashServiceConfig = 'serviceConfig';
function isServiceConfig(v) {
    return is$typed(v, id, hashServiceConfig);
}
function validateServiceConfig(v) {
    return validate(v, id, hashServiceConfig);
}
const hashViewerConfig = 'viewerConfig';
function isViewerConfig(v) {
    return is$typed(v, id, hashViewerConfig);
}
function validateViewerConfig(v) {
    return validate(v, id, hashViewerConfig);
}
//# sourceMappingURL=getConfig.js.map