"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isExternal = isExternal;
exports.validateExternal = validateExternal;
exports.isView = isView;
exports.validateView = validateView;
exports.isViewExternal = isViewExternal;
exports.validateViewExternal = validateViewExternal;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.external';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain);
}
const hashExternal = 'external';
function isExternal(v) {
    return is$typed(v, id, hashExternal);
}
function validateExternal(v) {
    return validate(v, id, hashExternal);
}
const hashView = 'view';
function isView(v) {
    return is$typed(v, id, hashView);
}
function validateView(v) {
    return validate(v, id, hashView);
}
const hashViewExternal = 'viewExternal';
function isViewExternal(v) {
    return is$typed(v, id, hashViewExternal);
}
function validateViewExternal(v) {
    return validate(v, id, hashViewExternal);
}
//# sourceMappingURL=external.js.map