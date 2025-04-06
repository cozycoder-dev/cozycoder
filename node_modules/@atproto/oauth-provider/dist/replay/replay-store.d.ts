import { Awaitable } from '../lib/util/type.js';
export type { Awaitable };
export interface ReplayStore {
    /**
     * Returns true if the nonce is unique within the given time frame. While not
     * strictly necessary for security purposes, the namespace should be used to
     * mitigate denial of service attacks from one client to the other.
     *
     * @param timeFrame expressed in milliseconds.
     */
    unique(namespace: string, nonce: string, timeFrame: number): Awaitable<boolean>;
}
export declare function isReplayStore(implementation: Record<string, unknown> & Partial<ReplayStore>): implementation is Record<string, unknown> & ReplayStore;
export declare function ifReplayStore(implementation?: Record<string, unknown> & Partial<ReplayStore>): ReplayStore | undefined;
export declare function asReplayStore(implementation?: Record<string, unknown> & Partial<ReplayStore>): ReplayStore;
//# sourceMappingURL=replay-store.d.ts.map