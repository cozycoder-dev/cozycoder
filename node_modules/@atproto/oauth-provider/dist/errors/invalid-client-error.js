"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidClientError = void 0;
const oauth_error_js_1 = require("./oauth-error.js");
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6749#section-5.2 | RFC6749 - Issuing an Access Token }
 *
 * Client authentication failed (e.g., unknown client, no client authentication
 * included, or unsupported authentication method). The authorization server MAY
 * return an HTTP 401 (Unauthorized) status code to indicate which HTTP
 * authentication schemes are supported.  If the client attempted to
 * authenticate via the "Authorization" request header field, the authorization
 * server MUST respond with an HTTP 401 (Unauthorized) status code and include
 * the "WWW-Authenticate" response header field matching the authentication
 * scheme used by the client.
 */
class InvalidClientError extends oauth_error_js_1.OAuthError {
    constructor(error_description, cause) {
        super('invalid_client', error_description, 400, cause);
    }
}
exports.InvalidClientError = InvalidClientError;
//# sourceMappingURL=invalid-client-error.js.map