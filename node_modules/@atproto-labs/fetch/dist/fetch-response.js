"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchJsonZodProcessor = exports.FetchResponseError = void 0;
exports.peekJson = peekJson;
exports.checkLength = checkLength;
exports.extractLength = extractLength;
exports.extractMime = extractMime;
exports.cancelBodyOnError = cancelBodyOnError;
exports.fetchOkProcessor = fetchOkProcessor;
exports.fetchOkTransformer = fetchOkTransformer;
exports.fetchMaxSizeProcessor = fetchMaxSizeProcessor;
exports.fetchResponseMaxSizeChecker = fetchResponseMaxSizeChecker;
exports.fetchTypeProcessor = fetchTypeProcessor;
exports.fetchResponseTypeChecker = fetchResponseTypeChecker;
exports.fetchResponseJsonTransformer = fetchResponseJsonTransformer;
exports.fetchJsonProcessor = fetchJsonProcessor;
exports.fetchJsonValidatorProcessor = fetchJsonValidatorProcessor;
const pipe_1 = require("@atproto-labs/pipe");
const fetch_error_js_1 = require("./fetch-error.js");
const transformed_response_js_1 = require("./transformed-response.js");
const util_js_1 = require("./util.js");
/**
 * media-type     = type "/" subtype *( ";" parameter )
 * type           = token
 * subtype        = token
 * token          = 1*<any CHAR except CTLs or separators>
 * separators     = "(" | ")" | "<" | ">" | "@"
 *                | "," | ";" | ":" | "\" | <">
 *                | "/" | "[" | "]" | "?" | "="
 *                | "{" | "}" | SP | HT
 * CTL            = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
 * SP             = <US-ASCII SP, space (32)>
 * HT             = <US-ASCII HT, horizontal-tab (9)>
 * @note The type, subtype, and parameter attribute names are case-insensitive.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc2616#autoid-23}
 */
const JSON_MIME = /^application\/(?:[^()<>@,;:/[\]\\?={} \t]+\+)?json$/i;
class FetchResponseError extends fetch_error_js_1.FetchError {
    constructor(response, statusCode = response.status, message = response.statusText, options) {
        super(statusCode, message, options);
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: response
        });
    }
    static async from(response, customMessage = extractResponseMessage, statusCode = response.status, options) {
        const message = typeof customMessage === 'string'
            ? customMessage
            : typeof customMessage === 'function'
                ? await customMessage(response)
                : undefined;
        return new FetchResponseError(response, statusCode, message, options);
    }
}
exports.FetchResponseError = FetchResponseError;
const extractResponseMessage = async (response) => {
    const mimeType = extractMime(response);
    if (!mimeType)
        return undefined;
    try {
        if (mimeType === 'text/plain') {
            return await response.text();
        }
        else if (JSON_MIME.test(mimeType)) {
            const json = await response.json();
            if (typeof json === 'string')
                return json;
            if (typeof json === 'object' && json != null) {
                const errorDescription = (0, util_js_1.ifString)(json['error_description']);
                if (errorDescription)
                    return errorDescription;
                const error = (0, util_js_1.ifString)(json['error']);
                if (error)
                    return error;
                const message = (0, util_js_1.ifString)(json['message']);
                if (message)
                    return message;
            }
        }
    }
    catch {
        // noop
    }
    return undefined;
};
async function peekJson(response, maxSize = Infinity) {
    const type = extractMime(response);
    if (type !== 'application/json')
        return undefined;
    checkLength(response, maxSize);
    // 1) Clone the request so we can consume the body
    const clonedResponse = response.clone();
    // 2) Make sure the request's body is not too large
    const limitedResponse = response.body && maxSize < Infinity
        ? new transformed_response_js_1.TransformedResponse(clonedResponse, new util_js_1.MaxBytesTransformStream(maxSize))
        : // Note: some runtimes (e.g. react-native) don't expose a body property
            clonedResponse;
    // 3) Parse the JSON
    return limitedResponse.json();
}
function checkLength(response, maxBytes) {
    // Note: negation accounts for invalid value types (NaN, non numbers)
    if (!(maxBytes >= 0)) {
        throw new TypeError('maxBytes must be a non-negative number');
    }
    const length = extractLength(response);
    if (length != null && length > maxBytes) {
        throw new FetchResponseError(response, 502, 'Response too large');
    }
    return length;
}
function extractLength(response) {
    const contentLength = response.headers.get('Content-Length');
    if (contentLength == null)
        return undefined;
    if (!/^\d+$/.test(contentLength)) {
        throw new FetchResponseError(response, 502, 'Invalid Content-Length');
    }
    const length = Number(contentLength);
    if (!Number.isSafeInteger(length)) {
        throw new FetchResponseError(response, 502, 'Content-Length too large');
    }
    return length;
}
function extractMime(response) {
    const contentType = response.headers.get('Content-Type');
    if (contentType == null)
        return undefined;
    return contentType.split(';', 1)[0].trim();
}
/**
 * If the transformer results in an error, ensure that the response body is
 * consumed as, in some environments (Node 👀), the response will not
 * automatically be GC'd.
 *
 * @see {@link https://undici.nodejs.org/#/?id=garbage-collection}
 * @param [onCancellationError] - Callback to handle any async body cancelling
 * error. Defaults to logging the error. Do not use `null` if the request is
 * cloned.
 */
function cancelBodyOnError(transformer, onCancellationError = util_js_1.logCancellationError) {
    return async (response) => {
        try {
            return await transformer(response);
        }
        catch (err) {
            await (0, util_js_1.cancelBody)(response, onCancellationError ?? undefined);
            throw err;
        }
    };
}
function fetchOkProcessor(customMessage) {
    return cancelBodyOnError((response) => {
        return fetchOkTransformer(response, customMessage);
    });
}
async function fetchOkTransformer(response, customMessage) {
    if (response.ok)
        return response;
    throw await FetchResponseError.from(response, customMessage);
}
function fetchMaxSizeProcessor(maxBytes) {
    if (maxBytes === Infinity)
        return (response) => response;
    if (!Number.isFinite(maxBytes) || maxBytes < 0) {
        throw new TypeError('maxBytes must be a 0, Infinity or a positive number');
    }
    return cancelBodyOnError((response) => {
        return fetchResponseMaxSizeChecker(response, maxBytes);
    });
}
function fetchResponseMaxSizeChecker(response, maxBytes) {
    if (maxBytes === Infinity)
        return response;
    checkLength(response, maxBytes);
    // Some engines (react-native 👀) don't expose a body property. In that case,
    // we will only rely on the Content-Length header.
    if (!response.body)
        return response;
    const transform = new util_js_1.MaxBytesTransformStream(maxBytes);
    return new transformed_response_js_1.TransformedResponse(response, transform);
}
function fetchTypeProcessor(expectedMime, contentTypeRequired = true) {
    const isExpected = typeof expectedMime === 'string'
        ? (mimeType) => mimeType === expectedMime
        : expectedMime instanceof RegExp
            ? (mimeType) => expectedMime.test(mimeType)
            : expectedMime;
    return cancelBodyOnError((response) => {
        return fetchResponseTypeChecker(response, isExpected, contentTypeRequired);
    });
}
async function fetchResponseTypeChecker(response, isExpectedMime, contentTypeRequired = true) {
    const mimeType = extractMime(response);
    if (mimeType) {
        if (!isExpectedMime(mimeType.toLowerCase())) {
            throw await FetchResponseError.from(response, `Unexpected response Content-Type (${mimeType})`, 502);
        }
    }
    else if (contentTypeRequired) {
        throw await FetchResponseError.from(response, 'Missing response Content-Type header', 502);
    }
    return response;
}
async function fetchResponseJsonTransformer(response) {
    try {
        const json = (await response.json());
        return { response, json };
    }
    catch (cause) {
        throw new FetchResponseError(response, 502, 'Unable to parse response as JSON', { cause });
    }
}
function fetchJsonProcessor(expectedMime = JSON_MIME, contentTypeRequired = true) {
    return (0, pipe_1.pipe)(fetchTypeProcessor(expectedMime, contentTypeRequired), cancelBodyOnError((fetchResponseJsonTransformer)));
}
function fetchJsonValidatorProcessor(schema, params) {
    if ('parseAsync' in schema && typeof schema.parseAsync === 'function') {
        return async (jsonResponse) => schema.parseAsync(jsonResponse.json, params);
    }
    if ('parse' in schema && typeof schema.parse === 'function') {
        return async (jsonResponse) => schema.parse(jsonResponse.json, params);
    }
    // Needed for type safety (and allows fool proofing the usage of this function)
    throw new TypeError('Invalid schema');
}
/** @note Use {@link fetchJsonValidatorProcessor} instead */
exports.fetchJsonZodProcessor = fetchJsonValidatorProcessor;
//# sourceMappingURL=fetch-response.js.map