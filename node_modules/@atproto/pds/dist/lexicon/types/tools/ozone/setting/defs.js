"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOption = isOption;
exports.validateOption = validateOption;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.setting.defs';
const hashOption = 'option';
function isOption(v) {
    return is$typed(v, id, hashOption);
}
function validateOption(v) {
    return validate(v, id, hashOption);
}
//# sourceMappingURL=defs.js.map