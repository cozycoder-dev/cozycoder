"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isView = isView;
exports.validateView = validateView;
exports.isViewRecord = isViewRecord;
exports.validateViewRecord = validateViewRecord;
exports.isViewNotFound = isViewNotFound;
exports.validateViewNotFound = validateViewNotFound;
exports.isViewBlocked = isViewBlocked;
exports.validateViewBlocked = validateViewBlocked;
exports.isViewDetached = isViewDetached;
exports.validateViewDetached = validateViewDetached;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.record';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain);
}
const hashView = 'view';
function isView(v) {
    return is$typed(v, id, hashView);
}
function validateView(v) {
    return validate(v, id, hashView);
}
const hashViewRecord = 'viewRecord';
function isViewRecord(v) {
    return is$typed(v, id, hashViewRecord);
}
function validateViewRecord(v) {
    return validate(v, id, hashViewRecord);
}
const hashViewNotFound = 'viewNotFound';
function isViewNotFound(v) {
    return is$typed(v, id, hashViewNotFound);
}
function validateViewNotFound(v) {
    return validate(v, id, hashViewNotFound);
}
const hashViewBlocked = 'viewBlocked';
function isViewBlocked(v) {
    return is$typed(v, id, hashViewBlocked);
}
function validateViewBlocked(v) {
    return validate(v, id, hashViewBlocked);
}
const hashViewDetached = 'viewDetached';
function isViewDetached(v) {
    return is$typed(v, id, hashViewDetached);
}
function validateViewDetached(v) {
    return validate(v, id, hashViewDetached);
}
//# sourceMappingURL=record.js.map