"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timedFetch = void 0;
exports.loggedFetch = loggedFetch;
exports.bindFetch = bindFetch;
const fetch_request_js_1 = require("./fetch-request.js");
const fetch_js_1 = require("./fetch.js");
const transformed_response_js_1 = require("./transformed-response.js");
const util_js_1 = require("./util.js");
function loggedFetch({ fetch = globalThis.fetch, logRequest = true, logResponse = true, logError = true, }) {
    const onRequest = logRequest === true
        ? async (request) => {
            const requestMessage = await (0, util_js_1.stringifyMessage)(request);
            console.info(`> ${request.method} ${request.url}\n${(0, util_js_1.padLines)(requestMessage, '  ')}`);
        }
        : logRequest || undefined;
    const onResponse = logResponse === true
        ? async (response) => {
            const responseMessage = await (0, util_js_1.stringifyMessage)(response.clone());
            console.info(`< HTTP/1.1 ${response.status} ${response.statusText}\n${(0, util_js_1.padLines)(responseMessage, '  ')}`);
        }
        : logResponse || undefined;
    const onError = logError === true
        ? async (error) => {
            console.error(`< Error:`, error);
        }
        : logError || undefined;
    if (!onRequest && !onResponse && !onError)
        return fetch;
    return (0, fetch_js_1.toRequestTransformer)(async function (request) {
        if (onRequest)
            await onRequest(request);
        try {
            const response = await fetch.call(this, request);
            if (onResponse)
                await onResponse(response, request);
            return response;
        }
        catch (error) {
            if (onError)
                await onError(error, request);
            throw error;
        }
    });
}
const timedFetch = (timeout = 60e3, fetch = globalThis.fetch) => {
    if (timeout === Infinity)
        return fetch;
    if (!Number.isFinite(timeout) || timeout <= 0) {
        throw new TypeError('Timeout must be positive');
    }
    return (0, fetch_js_1.toRequestTransformer)(async function (request) {
        const controller = new AbortController();
        const signal = controller.signal;
        const abort = () => {
            controller.abort();
        };
        const cleanup = () => {
            clearTimeout(timer);
            request.signal?.removeEventListener('abort', abort);
        };
        const timer = setTimeout(abort, timeout);
        if (typeof timer === 'object')
            timer.unref?.(); // only on node
        request.signal?.addEventListener('abort', abort);
        signal.addEventListener('abort', cleanup);
        const response = await fetch.call(this, request, { signal });
        if (!response.body) {
            cleanup();
            return response;
        }
        else {
            // Cleanup the timer & event listeners when the body stream is closed
            const transform = new TransformStream({ flush: cleanup });
            return new transformed_response_js_1.TransformedResponse(response, transform);
        }
    });
};
exports.timedFetch = timedFetch;
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
function bindFetch(fetch = globalThis.fetch, context = globalThis) {
    return (0, fetch_js_1.toRequestTransformer)(async (request) => {
        try {
            return await fetch.call(context, request);
        }
        catch (err) {
            throw fetch_request_js_1.FetchRequestError.from(request, err);
        }
    });
}
//# sourceMappingURL=fetch-wrap.js.map