export type UrlReference = {
    origin?: string;
    pathname?: string;
    searchParams?: Iterable<readonly [string, string]>;
};
export declare function urlMatch(url: URL, reference: UrlReference): boolean;
//# sourceMappingURL=url.d.ts.map