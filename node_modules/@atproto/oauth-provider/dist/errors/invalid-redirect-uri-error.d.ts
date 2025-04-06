import { OAuthError } from './oauth-error.js';
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.2 | RFC7591}
 *
 * The value of one or more redirection URIs is invalid.
 */
export declare class InvalidRedirectUriError extends OAuthError {
    constructor(error_description: string, cause?: unknown);
    static from(cause?: unknown): InvalidRedirectUriError;
}
//# sourceMappingURL=invalid-redirect-uri-error.d.ts.map