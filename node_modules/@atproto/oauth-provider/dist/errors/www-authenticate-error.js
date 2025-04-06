"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WWWAuthenticateError = void 0;
const crypto_js_1 = require("../lib/util/crypto.js");
const oauth_error_js_1 = require("./oauth-error.js");
class WWWAuthenticateError extends oauth_error_js_1.OAuthError {
    wwwAuthenticate;
    constructor(error, error_description, wwwAuthenticate, cause) {
        super(error, error_description, 401, cause);
        this.wwwAuthenticate =
            wwwAuthenticate['DPoP'] != null
                ? {
                    ...wwwAuthenticate,
                    DPoP: { algs: crypto_js_1.VERIFY_ALGOS.join(' '), ...wwwAuthenticate['DPoP'] },
                }
                : wwwAuthenticate;
    }
    get wwwAuthenticateHeader() {
        return formatWWWAuthenticateHeader(this.wwwAuthenticate);
    }
}
exports.WWWAuthenticateError = WWWAuthenticateError;
function formatWWWAuthenticateHeader(wwwAuthenticate) {
    return Object.entries(wwwAuthenticate)
        .filter(isWWWAuthenticateEntry)
        .map(wwwAuthenticateEntryToString)
        .join(', ');
}
function isWWWAuthenticateEntry(entry) {
    const [, value] = entry;
    return value != null && typeof value === 'object';
}
function wwwAuthenticateEntryToString([type, params]) {
    const paramsEnc = Object.entries(params)
        .filter(isParamEntry)
        .map(paramEntryToString);
    return paramsEnc.length ? `${type} ${paramsEnc.join(', ')}` : type;
}
function isParamEntry(entry) {
    const [, value] = entry;
    return typeof value === 'string' && value !== '' && !value.includes('"');
}
function paramEntryToString([name, value]) {
    return `${name}="${value}"`;
}
//# sourceMappingURL=www-authenticate-error.js.map