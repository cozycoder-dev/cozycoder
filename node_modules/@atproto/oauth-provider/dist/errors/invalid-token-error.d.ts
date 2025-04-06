import { WWWAuthenticateError } from './www-authenticate-error.js';
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6750#section-3.1 | RFC6750 - The WWW-Authenticate Response Header Field }
 *
 * The access token provided is expired, revoked, malformed, or invalid for
 * other reasons.  The resource SHOULD respond with the HTTP 401 (Unauthorized)
 * status code.  The client MAY request a new access token and retry the
 * protected resource request.
 */
export declare class InvalidTokenError extends WWWAuthenticateError {
    readonly tokenType: string;
    static from(err: unknown, tokenType: string, fallbackMessage?: string): InvalidTokenError;
    constructor(tokenType: string, error_description: string, cause?: unknown);
}
//# sourceMappingURL=invalid-token-error.d.ts.map