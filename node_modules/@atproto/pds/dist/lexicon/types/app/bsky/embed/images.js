"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isImage = isImage;
exports.validateImage = validateImage;
exports.isView = isView;
exports.validateView = validateView;
exports.isViewImage = isViewImage;
exports.validateViewImage = validateViewImage;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.images';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain);
}
const hashImage = 'image';
function isImage(v) {
    return is$typed(v, id, hashImage);
}
function validateImage(v) {
    return validate(v, id, hashImage);
}
const hashView = 'view';
function isView(v) {
    return is$typed(v, id, hashView);
}
function validateView(v) {
    return validate(v, id, hashView);
}
const hashViewImage = 'viewImage';
function isViewImage(v) {
    return is$typed(v, id, hashViewImage);
}
function validateViewImage(v) {
    return validate(v, id, hashViewImage);
}
//# sourceMappingURL=images.js.map