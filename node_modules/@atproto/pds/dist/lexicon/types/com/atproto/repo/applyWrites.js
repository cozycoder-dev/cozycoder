"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreate = isCreate;
exports.validateCreate = validateCreate;
exports.isUpdate = isUpdate;
exports.validateUpdate = validateUpdate;
exports.isDelete = isDelete;
exports.validateDelete = validateDelete;
exports.isCreateResult = isCreateResult;
exports.validateCreateResult = validateCreateResult;
exports.isUpdateResult = isUpdateResult;
exports.validateUpdateResult = validateUpdateResult;
exports.isDeleteResult = isDeleteResult;
exports.validateDeleteResult = validateDeleteResult;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.repo.applyWrites';
const hashCreate = 'create';
function isCreate(v) {
    return is$typed(v, id, hashCreate);
}
function validateCreate(v) {
    return validate(v, id, hashCreate);
}
const hashUpdate = 'update';
function isUpdate(v) {
    return is$typed(v, id, hashUpdate);
}
function validateUpdate(v) {
    return validate(v, id, hashUpdate);
}
const hashDelete = 'delete';
function isDelete(v) {
    return is$typed(v, id, hashDelete);
}
function validateDelete(v) {
    return validate(v, id, hashDelete);
}
const hashCreateResult = 'createResult';
function isCreateResult(v) {
    return is$typed(v, id, hashCreateResult);
}
function validateCreateResult(v) {
    return validate(v, id, hashCreateResult);
}
const hashUpdateResult = 'updateResult';
function isUpdateResult(v) {
    return is$typed(v, id, hashUpdateResult);
}
function validateUpdateResult(v) {
    return validate(v, id, hashUpdateResult);
}
const hashDeleteResult = 'deleteResult';
function isDeleteResult(v) {
    return is$typed(v, id, hashDeleteResult);
}
function validateDeleteResult(v) {
    return validate(v, id, hashDeleteResult);
}
//# sourceMappingURL=applyWrites.js.map