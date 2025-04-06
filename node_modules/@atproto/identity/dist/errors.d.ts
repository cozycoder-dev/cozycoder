export declare class DidNotFoundError extends Error {
    did: string;
    constructor(did: string);
}
export declare class PoorlyFormattedDidError extends Error {
    did: string;
    constructor(did: string);
}
export declare class UnsupportedDidMethodError extends Error {
    did: string;
    constructor(did: string);
}
export declare class PoorlyFormattedDidDocumentError extends Error {
    did: string;
    doc: unknown;
    constructor(did: string, doc: unknown);
}
export declare class UnsupportedDidWebPathError extends Error {
    did: string;
    constructor(did: string);
}
//# sourceMappingURL=errors.d.ts.map