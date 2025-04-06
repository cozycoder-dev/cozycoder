import { CID } from 'multiformats/cid';
import * as crypto from '@atproto/crypto';
import { BlobStore, Repo } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
import { BackgroundQueue } from '../../background';
import { CommitDataWithOps, PreparedCreate, PreparedWrite } from '../../repo/types';
import { BlobTransactor } from '../blob/transactor';
import { ActorDb } from '../db';
import { RecordTransactor } from '../record/transactor';
import { RepoReader } from './reader';
import { SqlRepoTransactor } from './sql-repo-transactor';
export declare class RepoTransactor extends RepoReader {
    db: ActorDb;
    blobstore: BlobStore;
    did: string;
    signingKey: crypto.Keypair;
    backgroundQueue: BackgroundQueue;
    now: string;
    blob: BlobTransactor;
    record: RecordTransactor;
    storage: SqlRepoTransactor;
    constructor(db: ActorDb, blobstore: BlobStore, did: string, signingKey: crypto.Keypair, backgroundQueue: BackgroundQueue, now?: string);
    maybeLoadRepo(): Promise<Repo | null>;
    createRepo(writes: PreparedCreate[]): Promise<CommitDataWithOps>;
    processWrites(writes: PreparedWrite[], swapCommitCid?: CID): Promise<CommitDataWithOps>;
    formatCommit(writes: PreparedWrite[], swapCommit?: CID): Promise<CommitDataWithOps>;
    indexWrites(writes: PreparedWrite[], rev: string): Promise<void>;
    getDuplicateRecordCids(cids: CID[], touchedUris: AtUri[]): Promise<CID[]>;
}
//# sourceMappingURL=transactor.d.ts.map