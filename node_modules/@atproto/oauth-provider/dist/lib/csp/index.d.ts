import { CombinedTuple, Simplify } from '../util/type.js';
export type CspValue = `data:` | `http:${string}` | `https:${string}` | `'none'` | `'self'` | `'sha256-${string}'` | `'nonce-${string}'` | `'unsafe-inline'` | `'unsafe-eval'` | `'strict-dynamic'` | `'report-sample'` | `'unsafe-hashes'`;
declare const STRING_DIRECTIVES: readonly ["base-uri"];
declare const BOOLEAN_DIRECTIVES: readonly ["upgrade-insecure-requests", "block-all-mixed-content"];
declare const ARRAY_DIRECTIVES: readonly ["connect-src", "default-src", "form-action", "frame-ancestors", "frame-src", "img-src", "script-src", "style-src"];
export type CspConfig = Simplify<{
    [K in (typeof BOOLEAN_DIRECTIVES)[number]]?: boolean;
} & {
    [K in (typeof STRING_DIRECTIVES)[number]]?: CspValue;
} & {
    [K in (typeof ARRAY_DIRECTIVES)[number]]?: Iterable<CspValue>;
}>;
export declare function buildCsp(config: CspConfig): string;
export declare function mergeCsp<C extends (CspConfig | null | undefined)[]>(...configs: C): CombinedTuple<C>;
export declare function combineCsp(a: CspConfig, b: CspConfig): CspConfig;
export {};
//# sourceMappingURL=index.d.ts.map