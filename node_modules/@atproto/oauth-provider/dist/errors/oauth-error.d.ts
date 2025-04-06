export declare class OAuthError extends Error {
    readonly error: string;
    readonly error_description: string;
    readonly status: number;
    expose: boolean;
    constructor(error: string, error_description: string, status?: number, cause?: unknown);
    get statusCode(): number;
    toJSON(): {
        error: string;
        error_description: string;
    };
}
//# sourceMappingURL=oauth-error.d.ts.map