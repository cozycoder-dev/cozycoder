import { Database, Migrator } from '../../db';
import { SequencerDbSchema } from './schema';
export * from './schema';
export type SequencerDb = Database<SequencerDbSchema>;
export declare const getDb: (location: string, disableWalAutoCheckpoint?: boolean) => SequencerDb;
export declare const getMigrator: (db: Database<SequencerDbSchema>) => Migrator<SequencerDbSchema>;
//# sourceMappingURL=index.d.ts.map