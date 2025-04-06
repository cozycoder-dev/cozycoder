"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isCaption = isCaption;
exports.validateCaption = validateCaption;
exports.isView = isView;
exports.validateView = validateView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.video';
const hashMain = 'main';
function isMain(v) {
    return is$typed(v, id, hashMain);
}
function validateMain(v) {
    return validate(v, id, hashMain);
}
const hashCaption = 'caption';
function isCaption(v) {
    return is$typed(v, id, hashCaption);
}
function validateCaption(v) {
    return validate(v, id, hashCaption);
}
const hashView = 'view';
function isView(v) {
    return is$typed(v, id, hashView);
}
function validateView(v) {
    return validate(v, id, hashView);
}
//# sourceMappingURL=video.js.map