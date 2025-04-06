import { AtprotoData, CacheResult, DidCache, DidDocument } from '../types';
export declare abstract class BaseResolver {
    cache?: DidCache | undefined;
    constructor(cache?: DidCache | undefined);
    abstract resolveNoCheck(did: string): Promise<unknown | null>;
    validateDidDoc(did: string, val: unknown): DidDocument;
    resolveNoCache(did: string): Promise<DidDocument | null>;
    refreshCache(did: string, prevResult?: CacheResult): Promise<void>;
    resolve(did: string, forceRefresh?: boolean): Promise<DidDocument | null>;
    ensureResolve(did: string, forceRefresh?: boolean): Promise<DidDocument>;
    resolveAtprotoData(did: string, forceRefresh?: boolean): Promise<AtprotoData>;
    resolveAtprotoKey(did: string, forceRefresh?: boolean): Promise<string>;
    verifySignature(did: string, data: Uint8Array, sig: Uint8Array, forceRefresh?: boolean): Promise<boolean>;
}
//# sourceMappingURL=base-resolver.d.ts.map