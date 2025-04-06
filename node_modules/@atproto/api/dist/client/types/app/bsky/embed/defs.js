"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAspectRatio = isAspectRatio;
exports.validateAspectRatio = validateAspectRatio;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.embed.defs';
const hashAspectRatio = 'aspectRatio';
function isAspectRatio(v) {
    return is$typed(v, id, hashAspectRatio);
}
function validateAspectRatio(v) {
    return validate(v, id, hashAspectRatio);
}
//# sourceMappingURL=defs.js.map