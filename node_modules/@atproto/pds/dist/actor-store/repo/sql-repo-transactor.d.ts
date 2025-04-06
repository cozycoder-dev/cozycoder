import { CID } from 'multiformats/cid';
import { BlockMap, CommitData, RepoStorage } from '@atproto/repo';
import { ActorDb } from '../db';
import { SqlRepoReader } from './sql-repo-reader';
export declare class SqlRepoTransactor extends SqlRepoReader implements RepoStorage {
    db: ActorDb;
    did: string;
    cache: BlockMap;
    now: string;
    constructor(db: ActorDb, did: string, now?: string);
    cacheRev(rev: string): Promise<void>;
    putBlock(cid: CID, block: Uint8Array, rev: string): Promise<void>;
    putMany(toPut: BlockMap, rev: string): Promise<void>;
    deleteMany(cids: CID[]): Promise<void>;
    applyCommit(commit: CommitData, isCreate?: boolean): Promise<void>;
    updateRoot(cid: CID, rev: string, isCreate?: boolean): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=sql-repo-transactor.d.ts.map