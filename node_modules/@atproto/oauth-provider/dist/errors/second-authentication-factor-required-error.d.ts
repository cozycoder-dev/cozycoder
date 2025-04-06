import { OAuthError } from './oauth-error.js';
export declare class SecondAuthenticationFactorRequiredError extends OAuthError {
    type: 'emailOtp';
    hint: string;
    constructor(type: 'emailOtp', hint: string, cause?: unknown);
    toJSON(): {
        readonly type: "emailOtp";
        readonly hint: string;
        readonly error: string;
        readonly error_description: string;
    };
}
//# sourceMappingURL=second-authentication-factor-required-error.d.ts.map