"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidClientMetadataError = void 0;
const zod_1 = require("zod");
const fetch_1 = require("@atproto-labs/fetch");
const oauth_error_js_1 = require("./oauth-error.js");
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.2 | RFC7591 - Client Registration Error Response}
 *
 * The value of one of the client metadata fields is invalid and the server has
 * rejected this request.  Note that an authorization server MAY choose to
 * substitute a valid value for any requested parameter of a client's metadata.
 */
class InvalidClientMetadataError extends oauth_error_js_1.OAuthError {
    constructor(error_description, cause) {
        super('invalid_client_metadata', error_description, 400, cause);
    }
    static from(cause, message = 'Invalid client metadata') {
        if (cause instanceof oauth_error_js_1.OAuthError) {
            return cause;
        }
        if (cause instanceof fetch_1.FetchError) {
            throw new InvalidClientMetadataError(cause.expose ? `${message}: ${cause.message}` : message, cause);
        }
        if (cause instanceof zod_1.ZodError) {
            const causeMessage = cause.issues
                .map(({ path, message }) => `Validation${path.length ? ` of "${path.join('.')}"` : ''} failed with error: ${message}`)
                .join(' ') || cause.message;
            throw new InvalidClientMetadataError(causeMessage ? `${message}: ${causeMessage}` : message, cause);
        }
        if (cause instanceof Error &&
            'code' in cause &&
            cause.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
            throw new InvalidClientMetadataError(`${message}: Self-signed certificate`, cause);
        }
        if (cause instanceof TypeError) {
            // This method is meant to be used in the context of parsing & validating
            // a client client metadata. In that context, a TypeError would more
            // likely represent a problem with the data (e.g. invalid URL constructor
            // arg) and not a programming error.
            return new InvalidClientMetadataError(`${message}: ${cause.message}`, cause);
        }
        return new InvalidClientMetadataError(message, cause);
    }
}
exports.InvalidClientMetadataError = InvalidClientMetadataError;
//# sourceMappingURL=invalid-client-metadata-error.js.map