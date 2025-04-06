import { CacheResult, DidCache, DidDocument } from '../types';
type CacheVal = {
    doc: DidDocument;
    updatedAt: number;
};
export declare class MemoryCache implements DidCache {
    staleTTL: number;
    maxTTL: number;
    constructor(staleTTL?: number, maxTTL?: number);
    cache: Map<string, CacheVal>;
    cacheDid(did: string, doc: DidDocument): Promise<void>;
    refreshCache(did: string, getDoc: () => Promise<DidDocument | null>): Promise<void>;
    checkCache(did: string): Promise<CacheResult | null>;
    clearEntry(did: string): Promise<void>;
    clear(): Promise<void>;
}
export {};
//# sourceMappingURL=memory-cache.d.ts.map