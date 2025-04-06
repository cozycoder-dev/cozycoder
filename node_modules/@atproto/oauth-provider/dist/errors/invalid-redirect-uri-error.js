"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRedirectUriError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.2 | RFC7591}
 *
 * The value of one or more redirection URIs is invalid.
 */
class InvalidRedirectUriError extends oauth_error_js_1.OAuthError {
    constructor(error_description, cause) {
        super('invalid_redirect_uri', error_description, 400, cause);
    }
    static from(cause) {
        if (cause instanceof InvalidRedirectUriError)
            return cause;
        return new InvalidRedirectUriError('Invalid redirect URI', cause);
    }
}
exports.InvalidRedirectUriError = InvalidRedirectUriError;
//# sourceMappingURL=invalid-redirect-uri-error.js.map