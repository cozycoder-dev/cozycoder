import { Transformer } from '@atproto-labs/pipe';
import { FetchError } from './fetch-error.js';
import { Json } from './util.js';
export type ResponseTransformer = Transformer<Response>;
export type ResponseMessageGetter = Transformer<Response, string | undefined>;
export declare class FetchResponseError extends FetchError {
    readonly response: Response;
    constructor(response: Response, statusCode?: number, message?: string, options?: ErrorOptions);
    static from(response: Response, customMessage?: string | ResponseMessageGetter, statusCode?: number, options?: ErrorOptions): Promise<FetchResponseError>;
}
export declare function peekJson(response: Response, maxSize?: number): Promise<undefined | Json>;
export declare function checkLength(response: Response, maxBytes: number): number | undefined;
export declare function extractLength(response: Response): number | undefined;
export declare function extractMime(response: Response): string | undefined;
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
export declare function cancelBodyOnError<T>(transformer: Transformer<Response, T>, onCancellationError?: null | ((err: unknown) => void)): (response: Response) => Promise<T>;
export declare function fetchOkProcessor(customMessage?: string | ResponseMessageGetter): ResponseTransformer;
export declare function fetchOkTransformer(response: Response, customMessage?: string | ResponseMessageGetter): Promise<Response>;
export declare function fetchMaxSizeProcessor(maxBytes: number): ResponseTransformer;
export declare function fetchResponseMaxSizeChecker(response: Response, maxBytes: number): Response;
export type MimeTypeCheckFn = (mimeType: string) => boolean;
export type MimeTypeCheck = string | RegExp | MimeTypeCheckFn;
export declare function fetchTypeProcessor(expectedMime: MimeTypeCheck, contentTypeRequired?: boolean): ResponseTransformer;
export declare function fetchResponseTypeChecker(response: Response, isExpectedMime: MimeTypeCheckFn, contentTypeRequired?: boolean): Promise<Response>;
export type ParsedJsonResponse<T = Json> = {
    response: Response;
    json: T;
};
export declare function fetchResponseJsonTransformer<T = Json>(response: Response): Promise<ParsedJsonResponse<T>>;
export declare function fetchJsonProcessor<T = Json>(expectedMime?: MimeTypeCheck, contentTypeRequired?: boolean): Transformer<Response, ParsedJsonResponse<T>>;
export type SyncValidationSchema<S, P = unknown> = {
    parse(value: unknown, params?: P): S;
};
export type AsyncValidationSchema<S, P = unknown> = {
    parseAsync(value: unknown, params?: P): Promise<S>;
};
export declare function fetchJsonValidatorProcessor<S, P = unknown>(schema: SyncValidationSchema<S, P> | AsyncValidationSchema<S, P>, params?: P): Transformer<ParsedJsonResponse, S>;
/** @note Use {@link fetchJsonValidatorProcessor} instead */
export declare const fetchJsonZodProcessor: typeof fetchJsonValidatorProcessor;
//# sourceMappingURL=fetch-response.d.ts.map