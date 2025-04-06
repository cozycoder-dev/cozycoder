export type AcceptFlags = {
    q: number;
};
export type Accept = [name: string, flags: AcceptFlags];
export declare const ACCEPT_ENCODING_COMPRESSED: readonly [Accept, ...Accept[]];
export declare const ACCEPT_ENCODING_UNCOMPRESSED: readonly [Accept, ...Accept[]];
export declare function buildProxiedContentEncoding(acceptHeader: undefined | string | string[], preferCompressed: boolean): string;
export declare function negotiateContentEncoding(acceptHeader: undefined | string | string[], preferences: readonly Accept[]): string;
/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Quality_values}
 */
export declare function formatAcceptHeader(accept: readonly [Accept, ...Accept[]]): string;
//# sourceMappingURL=accept.d.ts.map