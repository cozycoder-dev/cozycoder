import type { ReplayStore } from './replay-store.js';
export declare class ReplayStoreMemory implements ReplayStore {
    private lastCleanup;
    private nonces;
    /**
     * Returns true if the nonce is unique within the given time frame.
     */
    unique(namespace: string, nonce: string, timeFrame: number): Promise<boolean>;
    private cleanup;
}
//# sourceMappingURL=replay-store-memory.d.ts.map