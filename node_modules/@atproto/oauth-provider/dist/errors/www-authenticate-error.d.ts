import { OAuthError } from './oauth-error.js';
export type WWWAuthenticateParams = Record<string, string | undefined>;
export type WWWAuthenticate = Record<string, undefined | WWWAuthenticateParams>;
export declare class WWWAuthenticateError extends OAuthError {
    readonly wwwAuthenticate: WWWAuthenticate;
    constructor(error: string, error_description: string, wwwAuthenticate: WWWAuthenticate, cause?: unknown);
    get wwwAuthenticateHeader(): string;
}
//# sourceMappingURL=www-authenticate-error.d.ts.map