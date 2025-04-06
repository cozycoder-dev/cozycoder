import type { Redis } from 'ioredis';
import { CreateRedisOptions } from '../lib/redis.js';
import type { ReplayStore } from './replay-store.js';
export type { CreateRedisOptions, Redis };
export type ReplayStoreRedisOptions = {
    redis: CreateRedisOptions;
};
export declare class ReplayStoreRedis implements ReplayStore {
    private readonly redis;
    constructor(options: ReplayStoreRedisOptions);
    /**
     * Returns true if the nonce is unique within the given time frame.
     */
    unique(namespace: string, nonce: string, timeFrame: number): Promise<boolean>;
}
//# sourceMappingURL=replay-store-redis.d.ts.map