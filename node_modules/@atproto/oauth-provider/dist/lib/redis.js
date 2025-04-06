"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedis = createRedis;
const ioredis_1 = require("ioredis");
function createRedis(options) {
    if (typeof options === 'string') {
        const url = new URL(options.startsWith('redis://') ? options : `redis://${options}`);
        return new ioredis_1.Redis({
            host: url.hostname,
            port: parseInt(url.port, 10),
            password: url.password,
        });
    }
    else if ('on' in options && 'call' in options && 'acl' in options) {
        // Not using "instanceof" here in case the options is an instance of another
        // version of ioredis (Redis is both a class and an interface).
        return options;
    }
    else {
        return new ioredis_1.Redis(options);
    }
}
//# sourceMappingURL=redis.js.map