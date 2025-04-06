"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJobStatus = isJobStatus;
exports.validateJobStatus = validateJobStatus;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.video.defs';
const hashJobStatus = 'jobStatus';
function isJobStatus(v) {
    return is$typed(v, id, hashJobStatus);
}
function validateJobStatus(v) {
    return validate(v, id, hashJobStatus);
}
//# sourceMappingURL=defs.js.map