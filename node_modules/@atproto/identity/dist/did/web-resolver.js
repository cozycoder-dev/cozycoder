"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidWebResolver = exports.DOC_PATH = void 0;
const errors_1 = require("../errors");
const base_resolver_1 = require("./base-resolver");
const util_1 = require("./util");
exports.DOC_PATH = '/.well-known/did.json';
class DidWebResolver extends base_resolver_1.BaseResolver {
    constructor(timeout, cache) {
        super(cache);
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: timeout
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cache
        });
    }
    async resolveNoCheck(did) {
        const parsedId = did.split(':').slice(2).join(':');
        const parts = parsedId.split(':').map(decodeURIComponent);
        let path;
        if (parts.length < 1) {
            throw new errors_1.PoorlyFormattedDidError(did);
        }
        else if (parts.length === 1) {
            path = parts[0] + exports.DOC_PATH;
        }
        else {
            // how we *would* resolve a did:web with path, if atproto supported it
            //path = parts.join('/') + '/did.json'
            throw new errors_1.UnsupportedDidWebPathError(did);
        }
        const url = new URL(`https://${path}`);
        if (url.hostname === 'localhost') {
            url.protocol = 'http';
        }
        return (0, util_1.timed)(this.timeout, async (signal) => {
            const res = await fetch(url, {
                signal,
                redirect: 'error',
                headers: { accept: 'application/did+ld+json,application/json' },
            });
            // Positively not found, versus due to e.g. network error
            if (!res.ok)
                return null;
            return res.json();
        });
    }
}
exports.DidWebResolver = DidWebResolver;
//# sourceMappingURL=web-resolver.js.map