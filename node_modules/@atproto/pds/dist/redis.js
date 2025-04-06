"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisAddressParts = exports.getRedisClient = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const ioredis_1 = require("ioredis");
const logger_1 = require("./logger");
const getRedisClient = (host, password) => {
    const redisAddr = (0, exports.redisAddressParts)(host);
    const redis = new ioredis_1.Redis({
        ...redisAddr,
        password,
    });
    redis.on('error', (err) => {
        logger_1.redisLogger.error({ host, err }, 'redis error');
    });
    return redis;
};
exports.getRedisClient = getRedisClient;
const redisAddressParts = (addr, defaultPort = 6379) => {
    const [host, portStr, ...others] = addr.split(':');
    const port = portStr ? parseInt(portStr, 10) : defaultPort;
    (0, node_assert_1.default)(host && !isNaN(port) && !others.length, `invalid address: ${addr}`);
    return { host, port };
};
exports.redisAddressParts = redisAddressParts;
//# sourceMappingURL=redis.js.map