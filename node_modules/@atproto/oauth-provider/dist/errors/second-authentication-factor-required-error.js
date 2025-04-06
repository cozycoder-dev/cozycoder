"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondAuthenticationFactorRequiredError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
class SecondAuthenticationFactorRequiredError extends oauth_error_js_1.OAuthError {
    type;
    hint;
    constructor(type, hint, cause) {
        const error = 'second_authentication_factor_required';
        super(error, `${type} authentication factor required (hint: ${hint})`, 401, cause);
        this.type = type;
        this.hint = hint;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type,
            hint: this.hint,
        };
    }
}
exports.SecondAuthenticationFactorRequiredError = SecondAuthenticationFactorRequiredError;
//# sourceMappingURL=second-authentication-factor-required-error.js.map