"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUnavailableError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
class HandleUnavailableError extends oauth_error_js_1.OAuthError {
    reason;
    constructor(reason, details = 'That handle is not available', cause) {
        super('handle_unavailable', details, 400, cause);
        this.reason = reason;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            reason: this.reason,
        };
    }
}
exports.HandleUnavailableError = HandleUnavailableError;
//# sourceMappingURL=handle-unavailable-error.js.map