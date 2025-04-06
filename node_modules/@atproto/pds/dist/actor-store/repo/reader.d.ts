import { BlobStore } from '@atproto/repo';
import { SyncEvtData } from '../../repo';
import { BlobReader } from '../blob/reader';
import { ActorDb } from '../db';
import { RecordReader } from '../record/reader';
import { SqlRepoReader } from './sql-repo-reader';
export declare class RepoReader {
    db: ActorDb;
    blobstore: BlobStore;
    blob: BlobReader;
    record: RecordReader;
    storage: SqlRepoReader;
    constructor(db: ActorDb, blobstore: BlobStore);
    getSyncEventData(): Promise<SyncEvtData>;
}
//# sourceMappingURL=reader.d.ts.map