import { Database } from '../../db';
export interface NewAccount {
    did: string;
    published: 0 | 1;
}
export interface Failed {
    did: string;
    error: string | null;
    fixed: 0 | 1;
}
export type RecoveryDbSchema = {
    new_account: NewAccount;
    failed: Failed;
};
export type RecoveryDb = Database<RecoveryDbSchema>;
export declare const getRecoveryDbFromSequencerLoc: (sequencerLoc: string) => Promise<RecoveryDb>;
export declare const getAndMigrateRecoveryDb: (location: string, disableWalAutoCheckpoint?: boolean) => Promise<RecoveryDb>;
//# sourceMappingURL=recovery-db.d.ts.map