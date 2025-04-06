"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidPlcResolver = void 0;
const base_resolver_1 = require("./base-resolver");
const util_1 = require("./util");
class DidPlcResolver extends base_resolver_1.BaseResolver {
    constructor(plcUrl, timeout, cache) {
        super(cache);
        Object.defineProperty(this, "plcUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: plcUrl
        });
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
        return (0, util_1.timed)(this.timeout, async (signal) => {
            const url = new URL(`/${encodeURIComponent(did)}`, this.plcUrl);
            const res = await fetch(url, {
                redirect: 'error',
                headers: { accept: 'application/did+ld+json,application/json' },
                signal,
            });
            // Positively not found, versus due to e.g. network error
            if (res.status === 404)
                return null;
            if (!res.ok) {
                throw Object.assign(new Error(res.statusText), { status: res.status });
            }
            return res.json();
        });
    }
}
exports.DidPlcResolver = DidPlcResolver;
//# sourceMappingURL=plc-resolver.js.map