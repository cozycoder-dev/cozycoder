"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlMatch = urlMatch;
function urlMatch(url, reference) {
    if (reference.origin !== undefined) {
        if (url.origin !== reference.origin)
            return false;
    }
    if (reference.pathname !== undefined) {
        if (url.pathname !== reference.pathname)
            return false;
    }
    if (reference.searchParams !== undefined) {
        for (const [key, value] of reference.searchParams) {
            if (url.searchParams.get(key) !== value)
                return false;
        }
    }
    return true;
}
//# sourceMappingURL=url.js.map