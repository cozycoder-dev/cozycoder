import { WWWAuthenticateError } from './www-authenticate-error.js';
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc6750#section-3.1 | RFC6750 - The WWW-Authenticate Response Header Field}
 *
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc9449#name-the-dpop-authentication-sch | RFC9449 - The DPoP Authentication Scheme}
 */
export declare class InvalidDpopKeyBindingError extends WWWAuthenticateError {
    constructor(cause?: unknown);
}
//# sourceMappingURL=invalid-dpop-key-binding-error.d.ts.map