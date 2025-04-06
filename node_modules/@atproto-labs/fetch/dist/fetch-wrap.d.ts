import { Fetch, FetchContext } from './fetch.js';
type LogFn<Args extends unknown[]> = (...args: Args) => void | PromiseLike<void>;
export declare function loggedFetch<C = FetchContext>({ fetch, logRequest, logResponse, logError, }: {
    fetch?: Fetch<C> | undefined;
    logRequest?: boolean | LogFn<[request: Request]> | undefined;
    logResponse?: boolean | LogFn<[response: Response, request: Request]> | undefined;
    logError?: boolean | LogFn<[error: unknown, request: Request]> | undefined;
}): Fetch<C>;
export declare const timedFetch: <C = FetchContext>(timeout?: number, fetch?: Fetch<C>) => Fetch<C>;
/**
 * Wraps a fetch function to bind it to a specific context, and wrap any thrown
 * errors into a FetchRequestError.
 *
 * @example
 *
 * ```ts
 * class MyClient {
 *   constructor(private fetch = globalThis.fetch) {}
 *
 *   async get(url: string) {
 *     // This will generate an error, because the context used is not a
 *     // FetchContext (it's a MyClient instance).
 *     return this.fetch(url)
 *   }
 * }
 * ```
 *
 * @example
 *
 * ```ts
 * class MyClient {
 *   private fetch: Fetch<unknown>
 *
 *   constructor(fetch = globalThis.fetch) {
 *     this.fetch = bindFetch(fetch)
 *   }
 *
 *   async get(url: string) {
 *     return this.fetch(url) // no more error
 *   }
 * }
 * ```
 */
export declare function bindFetch<C = FetchContext>(fetch?: Fetch<C>, context?: C): ((this: unknown, input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>) & {
    bind(context: unknown): (input: string | Request | URL, init?: RequestInit | undefined) => Promise<Response>;
};
export {};
//# sourceMappingURL=fetch-wrap.d.ts.map