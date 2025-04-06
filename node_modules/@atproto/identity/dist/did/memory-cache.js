"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCache = void 0;
const common_web_1 = require("@atproto/common-web");
class MemoryCache {
    constructor(staleTTL, maxTTL) {
        Object.defineProperty(this, "staleTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.staleTTL = staleTTL ?? common_web_1.HOUR;
        this.maxTTL = maxTTL ?? common_web_1.DAY;
    }
    async cacheDid(did, doc) {
        this.cache.set(did, { doc, updatedAt: Date.now() });
    }
    async refreshCache(did, getDoc) {
        const doc = await getDoc();
        if (doc) {
            await this.cacheDid(did, doc);
        }
    }
    async checkCache(did) {
        const val = this.cache.get(did);
        if (!val)
            return null;
        const now = Date.now();
        const expired = now > val.updatedAt + this.maxTTL;
        const stale = now > val.updatedAt + this.staleTTL;
        return {
            ...val,
            did,
            stale,
            expired,
        };
    }
    async clearEntry(did) {
        this.cache.delete(did);
    }
    async clear() {
        this.cache.clear();
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=memory-cache.js.map