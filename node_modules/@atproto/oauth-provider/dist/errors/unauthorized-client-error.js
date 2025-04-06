"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedClientError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 | RFC6749 - Issuing an Access Token }
 *
 * The authenticated client is not authorized to use this authorization grant
 * type.
 *
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1 | RFC6749 - Authorization Code Grant, Authorization Request}
 *
 * The client is not authorized to request an authorization code using this
 * method.
 */
class UnauthorizedClientError extends oauth_error_js_1.OAuthError {
    constructor(error_description, cause) {
        super('unauthorized_client', error_description, 400, cause);
    }
}
exports.UnauthorizedClientError = UnauthorizedClientError;
//# sourceMappingURL=unauthorized-client-error.js.map