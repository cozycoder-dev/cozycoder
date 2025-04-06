import { Redis, type RedisOptions } from 'ioredis';
export type { Redis, RedisOptions };
export type CreateRedisOptions = Redis | RedisOptions | string;
export declare function createRedis(options: CreateRedisOptions): Redis;
//# sourceMappingURL=redis.d.ts.map