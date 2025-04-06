"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTemplateView = isTemplateView;
exports.validateTemplateView = validateTemplateView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.communication.defs';
const hashTemplateView = 'templateView';
function isTemplateView(v) {
    return is$typed(v, id, hashTemplateView);
}
function validateTemplateView(v) {
    return validate(v, id, hashTemplateView);
}
//# sourceMappingURL=defs.js.map