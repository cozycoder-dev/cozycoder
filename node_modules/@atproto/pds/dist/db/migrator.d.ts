import { Kysely, Migration, Migrator as KyselyMigrator } from 'kysely';
export declare class Migrator<T> extends KyselyMigrator {
    db: Kysely<T>;
    constructor(db: Kysely<T>, migrations: Record<string, Migration>);
    migrateToOrThrow(migration: string): Promise<import("kysely").MigrationResult[]>;
    migrateToLatestOrThrow(): Promise<import("kysely").MigrationResult[]>;
}
//# sourceMappingURL=migrator.d.ts.map