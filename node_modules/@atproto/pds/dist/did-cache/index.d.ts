import PQueue from 'p-queue';
import { CacheResult, DidCache, DidDocument } from '@atproto/identity';
import { DidCacheDb } from './db';
export declare class DidSqliteCache implements DidCache {
    staleTTL: number;
    maxTTL: number;
    db: DidCacheDb;
    pQueue: PQueue | null;
    constructor(dbLocation: string, staleTTL: number, maxTTL: number, disableWalAutoCheckpoint?: boolean);
    cacheDid(did: string, doc: DidDocument, prevResult?: CacheResult): Promise<void>;
    refreshCache(did: string, getDoc: () => Promise<DidDocument | null>, prevResult?: CacheResult): Promise<void>;
    checkCache(did: string): Promise<CacheResult | null>;
    checkCacheInternal(did: string): Promise<CacheResult | null>;
    clearEntry(did: string): Promise<void>;
    clear(): Promise<void>;
    processAll(): Promise<void>;
    migrateOrThrow(): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map