import { Database, Migrator } from '../../db';
import { DidCacheSchema } from './schema';
export * from './schema';
export type DidCacheDb = Database<DidCacheSchema>;
export declare const getDb: (location: string, disableWalAutoCheckpoint?: boolean) => DidCacheDb;
export declare const getMigrator: (db: DidCacheDb) => Migrator<DidCacheSchema>;
//# sourceMappingURL=index.d.ts.map