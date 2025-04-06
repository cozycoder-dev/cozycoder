"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSigDetail = isSigDetail;
exports.validateSigDetail = validateSigDetail;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.signature.defs';
const hashSigDetail = 'sigDetail';
function isSigDetail(v) {
    return is$typed(v, id, hashSigDetail);
}
function validateSigDetail(v) {
    return validate(v, id, hashSigDetail);
}
//# sourceMappingURL=defs.js.map