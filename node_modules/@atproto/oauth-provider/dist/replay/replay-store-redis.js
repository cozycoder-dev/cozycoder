"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayStoreRedis = void 0;
const redis_js_1 = require("../lib/redis.js");
class ReplayStoreRedis {
    redis;
    constructor(options) {
        this.redis = (0, redis_js_1.createRedis)(options.redis);
    }
    /**
     * Returns true if the nonce is unique within the given time frame.
     */
    async unique(namespace, nonce, timeFrame) {
        const key = `nonces:${namespace}:${nonce}`;
        const prev = await this.redis.set(key, '1', 'PX', timeFrame, 'GET');
        return prev == null;
    }
}
exports.ReplayStoreRedis = ReplayStoreRedis;
//# sourceMappingURL=replay-store-redis.js.map