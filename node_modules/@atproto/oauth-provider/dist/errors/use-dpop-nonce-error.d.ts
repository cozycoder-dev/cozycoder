import { OAuthError } from './oauth-error.js';
import { WWWAuthenticateError } from './www-authenticate-error.js';
/**
 * @see
 * {@link https://datatracker.ietf.org/doc/html/rfc9449#section-8 | RFC9449 - Section 8. Authorization Server-Provided Nonce}
 */
export declare class UseDpopNonceError extends OAuthError {
    constructor(error_description?: string, cause?: unknown);
    /**
     * Convert this error into an error meant to be used as "Resource
     * Server-Provided Nonce" error.
     *
     * @see
     * {@link https://datatracker.ietf.org/doc/html/rfc9449#section-9 | RFC9449 - Section 9. Resource Server-Provided Nonce}
     */
    toWwwAuthenticateError(): WWWAuthenticateError;
}
//# sourceMappingURL=use-dpop-nonce-error.d.ts.map