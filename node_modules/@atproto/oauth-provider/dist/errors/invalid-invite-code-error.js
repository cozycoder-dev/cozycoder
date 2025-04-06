"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInviteCodeError = void 0;
const invalid_request_error_1 = require("./invalid-request-error");
class InvalidInviteCodeError extends invalid_request_error_1.InvalidRequestError {
    constructor(details, cause) {
        super('This invite code is invalid.' + (details ? ` ${details}` : ''), cause);
    }
}
exports.InvalidInviteCodeError = InvalidInviteCodeError;
//# sourceMappingURL=invalid-invite-code-error.js.map