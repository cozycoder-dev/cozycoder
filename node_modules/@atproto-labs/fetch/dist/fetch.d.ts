import { ThisParameterOverride } from './util.js';
export type FetchContext = void | null | typeof globalThis;
export type FetchBound = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
export type Fetch<C = FetchContext> = ThisParameterOverride<C, FetchBound>;
export type SimpleFetchBound = (input: Request) => Promise<Response>;
export type SimpleFetch<C = FetchContext> = ThisParameterOverride<C, SimpleFetchBound>;
export declare function toRequestTransformer<C, O>(requestTransformer: (this: C, input: Request) => O): ThisParameterOverride<C, (input: string | URL | Request, init?: RequestInit) => O>;
export declare function asRequest(input: string | URL | Request, init?: RequestInit): Request;
//# sourceMappingURL=fetch.d.ts.map