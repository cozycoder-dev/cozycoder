import { Key, SimpleStore, Value } from '@atproto-labs/simple-store';
export type SimpleStoreMemoryOptions<K extends Key, V extends Value> = {
    /**
     * The maximum number of entries in the cache.
     */
    max?: number;
    /**
     * The time-to-live of a cache entry, in milliseconds.
     */
    ttl?: number;
    /**
     * Whether to automatically prune expired entries.
     */
    ttlAutopurge?: boolean;
    /**
     * The maximum total size of the cache, in units defined by the sizeCalculation
     * function.
     *
     * @default No limit
     */
    maxSize?: number;
    /**
     * The maximum size of a single cache entry, in units defined by the
     * sizeCalculation function.
     *
     * @default No limit
     */
    maxEntrySize?: number;
    /**
     * A function that returns the size of a value. The size is used to determine
     * when the cache should be pruned, based on `maxSize`.
     *
     * @default The (rough) size in bytes used in memory.
     */
    sizeCalculation?: (value: V, key: K) => number;
} & ({
    max: number;
} | {
    maxSize: number;
} | {
    ttl: number;
    ttlAutopurge: boolean;
});
export declare class SimpleStoreMemory<K extends Key, V extends Value> implements SimpleStore<K, V> {
    #private;
    constructor({ sizeCalculation, ...options }: SimpleStoreMemoryOptions<K, V>);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    del(key: K): void;
    clear(): void;
}
//# sourceMappingURL=index.d.ts.map