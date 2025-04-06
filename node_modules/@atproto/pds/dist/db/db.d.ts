import { Kysely } from 'kysely';
export declare class Database<Schema> {
    db: Kysely<Schema>;
    destroyed: boolean;
    commitHooks: CommitHook[];
    constructor(db: Kysely<Schema>);
    static sqlite<T>(location: string, opts?: {
        pragmas?: Record<string, string>;
    }): Database<T>;
    ensureWal(): Promise<void>;
    transactionNoRetry<T>(fn: (db: Database<Schema>) => T | PromiseLike<T>): Promise<T>;
    transaction<T>(fn: (db: Database<Schema>) => T | PromiseLike<T>): Promise<T>;
    executeWithRetry<T>(query: {
        execute: () => Promise<T>;
    }): Promise<T>;
    onCommit(fn: () => void): void;
    get isTransaction(): boolean;
    assertTransaction(): void;
    assertNotTransaction(): void;
    close(): void;
}
type CommitHook = () => void;
export {};
//# sourceMappingURL=db.d.ts.map