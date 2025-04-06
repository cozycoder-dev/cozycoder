import { Database, Migrator } from '../../db';
import { DatabaseSchema } from './schema';
export * from './schema';
export type AccountDb = Database<DatabaseSchema>;
export declare const getDb: (location: string, disableWalAutoCheckpoint?: boolean) => AccountDb;
export declare const getMigrator: (db: AccountDb) => Migrator<DatabaseSchema>;
//# sourceMappingURL=index.d.ts.map