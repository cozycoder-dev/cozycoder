"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isView = isView;
exports.validateView = validateView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.recordWithMedia';
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
//# sourceMappingURL=recordWithMedia.js.map