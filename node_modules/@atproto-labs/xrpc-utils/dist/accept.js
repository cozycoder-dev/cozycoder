"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPT_ENCODING_UNCOMPRESSED = exports.ACCEPT_ENCODING_COMPRESSED = void 0;
exports.buildProxiedContentEncoding = buildProxiedContentEncoding;
exports.negotiateContentEncoding = negotiateContentEncoding;
exports.formatAcceptHeader = formatAcceptHeader;
const xrpc_1 = require("@atproto/xrpc");
const xrpc_server_1 = require("@atproto/xrpc-server");
exports.ACCEPT_ENCODING_COMPRESSED = [
    ['gzip', { q: 1.0 }],
    ['deflate', { q: 0.9 }],
    ['br', { q: 0.8 }],
    ['identity', { q: 0.1 }],
];
exports.ACCEPT_ENCODING_UNCOMPRESSED = [
    ['identity', { q: 1.0 }],
    ['gzip', { q: 0.3 }],
    ['deflate', { q: 0.2 }],
    ['br', { q: 0.1 }],
];
// accept-encoding defaults to "identity with lowest priority"
const ACCEPT_ENC_DEFAULT = ['identity', { q: 0.001 }];
const ACCEPT_FORBID_STAR = ['*', { q: 0 }];
function buildProxiedContentEncoding(acceptHeader, preferCompressed) {
    return negotiateContentEncoding(acceptHeader, preferCompressed
        ? exports.ACCEPT_ENCODING_COMPRESSED
        : exports.ACCEPT_ENCODING_UNCOMPRESSED);
}
function negotiateContentEncoding(acceptHeader, preferences) {
    const acceptMap = Object.fromEntries(parseAcceptEncoding(acceptHeader));
    // Make sure the default (identity) is covered by the preferences
    if (!preferences.some(coversIdentityAccept)) {
        preferences = [...preferences, ACCEPT_ENC_DEFAULT];
    }
    const common = preferences.filter(([name]) => {
        const acceptQ = (acceptMap[name] ?? acceptMap['*'])?.q;
        // Per HTTP/1.1, "identity" is always acceptable unless explicitly rejected
        if (name === 'identity') {
            return acceptQ == null || acceptQ > 0;
        }
        else {
            return acceptQ != null && acceptQ > 0;
        }
    });
    // Since "identity" was present in the preferences, a missing "identity" in
    // the common array means that the client explicitly rejected it. Let's reflect
    // this by adding it to the common array.
    if (!common.some(coversIdentityAccept)) {
        common.push(ACCEPT_FORBID_STAR);
    }
    // If no common encodings are acceptable, throw a 406 Not Acceptable error
    if (!common.some(isAllowedAccept)) {
        throw new xrpc_server_1.XRPCError(xrpc_1.ResponseType.NotAcceptable, 'this service does not support any of the requested encodings');
    }
    return formatAcceptHeader(common);
}
function coversIdentityAccept([name]) {
    return name === 'identity' || name === '*';
}
function isAllowedAccept([, flags]) {
    return flags.q > 0;
}
/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Quality_values}
 */
function formatAcceptHeader(accept) {
    return accept.map(formatAcceptPart).join(',');
}
function formatAcceptPart([name, flags]) {
    return `${name};q=${flags.q}`;
}
function parseAcceptEncoding(acceptEncodings) {
    if (!acceptEncodings?.length)
        return [];
    return Array.isArray(acceptEncodings)
        ? acceptEncodings.flatMap(parseAcceptEncoding)
        : acceptEncodings.split(',').map(parseAcceptEncodingDefinition);
}
function parseAcceptEncodingDefinition(def) {
    const { length, 0: encoding, 1: params } = def.trim().split(';', 3);
    if (length > 2) {
        throw new xrpc_server_1.InvalidRequestError(`Invalid accept-encoding: "${def}"`);
    }
    if (!encoding || encoding.includes('=')) {
        throw new xrpc_server_1.InvalidRequestError(`Invalid accept-encoding: "${def}"`);
    }
    const flags = { q: 1 };
    if (length === 2) {
        const { length, 0: key, 1: value } = params.split('=', 3);
        if (length !== 2) {
            throw new xrpc_server_1.InvalidRequestError(`Invalid accept-encoding: "${def}"`);
        }
        if (key === 'q' || key === 'Q') {
            const q = parseFloat(value);
            if (q === 0 || (Number.isFinite(q) && q <= 1 && q >= 0.001)) {
                flags.q = q;
            }
            else {
                throw new xrpc_server_1.InvalidRequestError(`Invalid accept-encoding: "${def}"`);
            }
        }
        else {
            throw new xrpc_server_1.InvalidRequestError(`Invalid accept-encoding: "${def}"`);
        }
    }
    return [encoding.toLowerCase(), flags];
}
//# sourceMappingURL=accept.js.map