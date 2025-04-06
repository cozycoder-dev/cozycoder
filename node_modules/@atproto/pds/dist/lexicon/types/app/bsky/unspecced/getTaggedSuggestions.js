"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuggestion = isSuggestion;
exports.validateSuggestion = validateSuggestion;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.unspecced.getTaggedSuggestions';
const hashSuggestion = 'suggestion';
function isSuggestion(v) {
    return is$typed(v, id, hashSuggestion);
}
function validateSuggestion(v) {
    return validate(v, id, hashSuggestion);
}
//# sourceMappingURL=getTaggedSuggestions.js.map