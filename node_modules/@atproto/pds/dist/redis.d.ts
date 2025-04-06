import { Redis } from 'ioredis';
export declare const getRedisClient: (host: string, password?: string) => Redis;
export declare const redisAddressParts: (addr: string, defaultPort?: number) => {
    host: string;
    port: number;
};
//# sourceMappingURL=redis.d.ts.map