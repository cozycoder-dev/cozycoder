"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const jose_1 = require("jose");
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
const oauth_error_js_1 = require("./oauth-error.js");
const www_authenticate_error_js_1 = require("./www-authenticate-error.js");
const { JOSEError } = jose_1.errors;
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6750#section-3.1 | RFC6750 - The WWW-Authenticate Response Header Field }
 *
 * The access token provided is expired, revoked, malformed, or invalid for
 * other reasons.  The resource SHOULD respond with the HTTP 401 (Unauthorized)
 * status code.  The client MAY request a new access token and retry the
 * protected resource request.
 */
class InvalidTokenError extends www_authenticate_error_js_1.WWWAuthenticateError {
    tokenType;
    static from(err, tokenType, fallbackMessage = 'Invalid token') {
        if (err instanceof InvalidTokenError) {
            return err;
        }
        if (err instanceof oauth_error_js_1.OAuthError) {
            return new InvalidTokenError(tokenType, err.error_description, err);
        }
        if (err instanceof JOSEError) {
            return new InvalidTokenError(tokenType, err.message, err);
        }
        if (err instanceof jwk_1.JwtVerifyError) {
            return new InvalidTokenError(tokenType, err.message, err);
        }
        if (err instanceof zod_1.ZodError) {
            return new InvalidTokenError(tokenType, err.message, err);
        }
        return new InvalidTokenError(tokenType, fallbackMessage, err);
    }
    constructor(tokenType, error_description, cause) {
        const error = 'invalid_token';
        super(error, error_description, { [tokenType]: { error, error_description } }, cause);
        this.tokenType = tokenType;
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=invalid-token-error.js.map