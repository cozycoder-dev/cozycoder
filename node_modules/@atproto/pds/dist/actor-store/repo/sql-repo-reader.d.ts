import { CID } from 'multiformats/cid';
import { BlockMap, CarBlock, ReadableBlockstore } from '@atproto/repo';
import { ActorDb } from '../db';
export declare class SqlRepoReader extends ReadableBlockstore {
    db: ActorDb;
    cache: BlockMap;
    constructor(db: ActorDb);
    getRoot(): Promise<CID>;
    getRootDetailed(): Promise<{
        cid: CID;
        rev: string;
    }>;
    getBytes(cid: CID): Promise<Uint8Array | null>;
    has(cid: CID): Promise<boolean>;
    getBlocks(cids: CID[]): Promise<{
        blocks: BlockMap;
        missing: CID[];
    }>;
    getCarStream(since?: string): Promise<AsyncIterable<Uint8Array>>;
    iterateCarBlocks(since?: string): AsyncIterable<CarBlock>;
    getBlockRange(since?: string, cursor?: RevCursor): Promise<import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "repo_block">, "repo_block", "content" | "cid" | "repoRev">[]>;
    countBlocks(): Promise<number>;
    destroy(): Promise<void>;
}
type RevCursor = {
    cid: CID;
    rev: string;
};
export declare class RepoRootNotFoundError extends Error {
}
export {};
//# sourceMappingURL=sql-repo-reader.d.ts.map