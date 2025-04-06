export type PathMatcher<P extends Params> = (pathname: string) => P | undefined;
type StringPath<P extends Params> = string extends keyof P ? `/${string}` : keyof P extends never ? `/${string}` | `` : {
    [K in keyof P]: K extends string ? `${`/:${K}` | `/${string}/:${K}`}${StringPath<Omit<P, K>>}` | `${StringPath<Omit<P, K>>}${`/:${K}` | `/:${K}/${string}`}` : never;
}[keyof P];
export type Path<P extends Params> = string | StringPath<P> | RegExp | PathMatcher<P>;
export type Params = Record<string, undefined | string>;
export declare function createPathMatcher<P extends Params = Params>(refPath: Path<P>): PathMatcher<P>;
export {};
//# sourceMappingURL=path.d.ts.map