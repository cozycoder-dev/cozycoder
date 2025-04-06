export declare abstract class FetchError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message?: string, options?: ErrorOptions);
    get expose(): boolean;
}
//# sourceMappingURL=fetch-error.d.ts.map