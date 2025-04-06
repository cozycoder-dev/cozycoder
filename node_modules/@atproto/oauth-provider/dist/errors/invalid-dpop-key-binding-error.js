"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDpopKeyBindingError = void 0;
const www_authenticate_error_js_1 = require("./www-authenticate-error.js");
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6750#section-3.1 | RFC6750 - The WWW-Authenticate Response Header Field}
 *
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc9449#name-the-dpop-authentication-sch | RFC9449 - The DPoP Authentication Scheme}
 */
class InvalidDpopKeyBindingError extends www_authenticate_error_js_1.WWWAuthenticateError {
    constructor(cause) {
        const error = 'invalid_token';
        const error_description = 'Invalid DPoP key binding';
        super(error, error_description, { DPoP: { error, error_description } }, cause);
    }
}
exports.InvalidDpopKeyBindingError = InvalidDpopKeyBindingError;
//# sourceMappingURL=invalid-dpop-key-binding-error.js.map