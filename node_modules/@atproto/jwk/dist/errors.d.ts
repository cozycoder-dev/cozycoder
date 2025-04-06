export type ErrorOptions = {
    cause?: unknown;
};
export declare const ERR_JWKS_NO_MATCHING_KEY = "ERR_JWKS_NO_MATCHING_KEY";
export declare const ERR_JWK_INVALID = "ERR_JWK_INVALID";
export declare const ERR_JWK_NOT_FOUND = "ERR_JWK_NOT_FOUND";
export declare const ERR_JWT_INVALID = "ERR_JWT_INVALID";
export declare const ERR_JWT_CREATE = "ERR_JWT_CREATE";
export declare const ERR_JWT_VERIFY = "ERR_JWT_VERIFY";
export declare class JwkError extends TypeError {
    readonly code: string;
    constructor(message?: string, code?: string, options?: ErrorOptions);
}
export declare class JwtCreateError extends Error {
    readonly code: string;
    constructor(message?: string, code?: string, options?: ErrorOptions);
    static from(cause: unknown, code?: string, message?: string): JwtCreateError;
}
export declare class JwtVerifyError extends Error {
    readonly code: string;
    constructor(message?: string, code?: string, options?: ErrorOptions);
    static from(cause: unknown, code?: string, message?: string): JwtVerifyError;
}
//# sourceMappingURL=errors.d.ts.map