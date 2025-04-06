import { CID } from 'multiformats/cid';
import { RepoRecord } from '@atproto/lexicon';
import { CidSet } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
import { Record as ProfileRecord } from '../../lexicon/types/app/bsky/actor/profile';
import { StatusAttr } from '../../lexicon/types/com/atproto/admin/defs';
import { LocalRecords } from '../../read-after-write/types';
import { ActorDb, Backlink } from '../db';
export type RecordDescript = {
    uri: string;
    path: string;
    cid: CID;
};
export declare class RecordReader {
    db: ActorDb;
    constructor(db: ActorDb);
    recordCount(): Promise<number>;
    listAll(): Promise<RecordDescript[]>;
    listCollections(): Promise<string[]>;
    listRecordsForCollection(opts: {
        collection: string;
        limit: number;
        reverse: boolean;
        cursor?: string;
        rkeyStart?: string;
        rkeyEnd?: string;
        includeSoftDeleted?: boolean;
    }): Promise<{
        uri: string;
        cid: string;
        value: Record<string, unknown>;
    }[]>;
    getRecord(uri: AtUri, cid: string | null, includeSoftDeleted?: boolean): Promise<{
        uri: string;
        cid: string;
        value: Record<string, unknown>;
        indexedAt: string;
        takedownRef: string | null;
    } | null>;
    hasRecord(uri: AtUri, cid: string | null, includeSoftDeleted?: boolean): Promise<boolean>;
    getRecordTakedownStatus(uri: AtUri): Promise<StatusAttr | null>;
    getCurrentRecordCid(uri: AtUri): Promise<CID | null>;
    getRecordBacklinks(opts: {
        collection: string;
        path: string;
        linkTo: string;
    }): Promise<{
        takedownRef: string | null;
        indexedAt: string;
        cid: string;
        uri: string;
        collection: string;
        rkey: string;
        repoRev: string;
    }[]>;
    getBacklinkConflicts(uri: AtUri, record: RepoRecord): Promise<AtUri[]>;
    listExistingBlocks(): Promise<CidSet>;
    getProfileRecord(): Promise<ProfileRecord | null>;
    getRecordsSinceRev(rev: string): Promise<LocalRecords>;
}
export declare const getBacklinks: (uri: AtUri, record: RepoRecord) => Backlink[];
//# sourceMappingURL=reader.d.ts.map