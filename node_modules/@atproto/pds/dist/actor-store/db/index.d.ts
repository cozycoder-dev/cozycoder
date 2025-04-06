import { Database, Migrator } from '../../db';
import { DatabaseSchema } from './schema';
export * from './schema';
export type ActorDb = Database<DatabaseSchema>;
export declare const getDb: (location: string, disableWalAutoCheckpoint?: boolean) => ActorDb;
export declare const getMigrator: (db: Database<DatabaseSchema>) => Migrator<DatabaseSchema>;
//# sourceMappingURL=index.d.ts.map