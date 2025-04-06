"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseDpopNonceError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
const www_authenticate_error_js_1 = require("./www-authenticate-error.js");
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc9449#section-8 | RFC9449 - Section 8. Authorization Server-Provided Nonce}
 */
class UseDpopNonceError extends oauth_error_js_1.OAuthError {
    constructor(error_description = 'Authorization server requires nonce in DPoP proof', cause) {
        super('use_dpop_nonce', error_description, 400, cause);
    }
    /**
     * Convert this error into an error meant to be used as "Resource
     * Server-Provided Nonce" error.
     *
     * @see
     * {@link https://datatracker.ietf.org/doc/html/rfc9449#section-9 | RFC9449 - Section 9. Resource Server-Provided Nonce}
     */
    toWwwAuthenticateError() {
        const { error, error_description } = this;
        return new www_authenticate_error_js_1.WWWAuthenticateError(error, error_description, { DPoP: { error, error_description } }, this);
    }
}
exports.UseDpopNonceError = UseDpopNonceError;
//# sourceMappingURL=use-dpop-nonce-error.js.map