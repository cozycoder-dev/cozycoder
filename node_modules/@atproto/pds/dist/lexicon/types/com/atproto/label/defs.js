"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabel = isLabel;
exports.validateLabel = validateLabel;
exports.isSelfLabels = isSelfLabels;
exports.validateSelfLabels = validateSelfLabels;
exports.isSelfLabel = isSelfLabel;
exports.validateSelfLabel = validateSelfLabel;
exports.isLabelValueDefinition = isLabelValueDefinition;
exports.validateLabelValueDefinition = validateLabelValueDefinition;
exports.isLabelValueDefinitionStrings = isLabelValueDefinitionStrings;
exports.validateLabelValueDefinitionStrings = validateLabelValueDefinitionStrings;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.label.defs';
const hashLabel = 'label';
function isLabel(v) {
    return is$typed(v, id, hashLabel);
}
function validateLabel(v) {
    return validate(v, id, hashLabel);
}
const hashSelfLabels = 'selfLabels';
function isSelfLabels(v) {
    return is$typed(v, id, hashSelfLabels);
}
function validateSelfLabels(v) {
    return validate(v, id, hashSelfLabels);
}
const hashSelfLabel = 'selfLabel';
function isSelfLabel(v) {
    return is$typed(v, id, hashSelfLabel);
}
function validateSelfLabel(v) {
    return validate(v, id, hashSelfLabel);
}
const hashLabelValueDefinition = 'labelValueDefinition';
function isLabelValueDefinition(v) {
    return is$typed(v, id, hashLabelValueDefinition);
}
function validateLabelValueDefinition(v) {
    return validate(v, id, hashLabelValueDefinition);
}
const hashLabelValueDefinitionStrings = 'labelValueDefinitionStrings';
function isLabelValueDefinitionStrings(v) {
    return is$typed(v, id, hashLabelValueDefinitionStrings);
}
function validateLabelValueDefinitionStrings(v) {
    return validate(v, id, hashLabelValueDefinitionStrings);
}
//# sourceMappingURL=defs.js.map