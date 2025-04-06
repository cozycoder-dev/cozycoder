export type JsonScalar = string | number | boolean | null;
export type Json = JsonScalar | Json[] | {
    [key: string]: undefined | Json;
};
export type JsonObject = {
    [key: string]: Json;
};
export type JsonArray = Json[];
export type ThisParameterOverride<C, Fn extends (...a: any) => any> = Fn extends (...args: infer P) => infer R ? ((this: C, ...args: P) => R) & {
    bind(context: C): (...args: P) => R;
} : never;
export declare function isIp(hostname: string): boolean;
export declare const ifString: <V>(v: V) => (V & string) | undefined;
export declare class MaxBytesTransformStream extends TransformStream<Uint8Array, Uint8Array> {
    constructor(maxBytes: number);
}
export declare function padLines(input: string, pad: string): string;
/**
 * @param [onCancellationError] - Callback that will trigger to asynchronously
 * handle any error that occurs while cancelling the response body. Providing
 * this will speed up the process and avoid potential deadlocks. Defaults to
 * awaiting the cancellation operation. use `"log"` to log the error.
 * @see {@link https://undici.nodejs.org/#/?id=garbage-collection}
 * @note awaiting this function's result, when no `onCancellationError` is
 * provided, might result in a dead lock. Indeed, if the response was cloned(),
 * the response.body.cancel() method will not resolve until the other response's
 * body is consumed/cancelled.
 *
 * @example
 * ```ts
 * // Make sure response was not cloned, or that every cloned response was
 * // consumed/cancelled before awaiting this function's result.
 * await cancelBody(response)
 * ```
 * @example
 * ```ts
 * await cancelBody(response, (err) => {
 *   // No biggie, let's just log the error
 *   console.warn('Failed to cancel response body', err)
 * })
 * ```
 * @example
 * ```ts
 * // Will generate an "unhandledRejection" if an error occurs while cancelling
 * // the response body. This will likely crash the process.
 * await cancelBody(response, (err) => { throw err })
 * ```
 */
export declare function cancelBody(body: Body, onCancellationError?: 'log' | ((err: unknown) => void)): Promise<void>;
export declare function logCancellationError(err: unknown): void;
export declare function stringifyMessage(input: Body & {
    headers: Headers;
}): Promise<string>;
export declare const extractUrl: (input: Request | string | URL) => URL;
//# sourceMappingURL=util.d.ts.map