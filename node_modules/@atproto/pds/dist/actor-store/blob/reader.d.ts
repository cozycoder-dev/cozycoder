import stream from 'node:stream';
import { CID } from 'multiformats/cid';
import { BlobStore } from '@atproto/repo';
import { StatusAttr } from '../../lexicon/types/com/atproto/admin/defs';
import { ActorDb } from '../db';
export declare class BlobReader {
    db: ActorDb;
    blobstore: BlobStore;
    constructor(db: ActorDb, blobstore: BlobStore);
    getBlobMetadata(cid: CID): Promise<{
        size: number;
        mimeType?: string;
    }>;
    getBlob(cid: CID): Promise<{
        size: number;
        mimeType?: string;
        stream: stream.Readable;
    }>;
    listBlobs(opts: {
        since?: string;
        cursor?: string;
        limit: number;
    }): Promise<string[]>;
    getBlobTakedownStatus(cid: CID): Promise<StatusAttr | null>;
    getRecordsForBlob(cid: CID): Promise<string[]>;
    getBlobsForRecord(recordUri: string): Promise<string[]>;
    blobCount(): Promise<number>;
    recordBlobCount(): Promise<number>;
    listMissingBlobs(opts: {
        cursor?: string;
        limit: number;
    }): Promise<{
        cid: string;
        recordUri: string;
    }[]>;
    getBlobCids(): Promise<CID[]>;
}
//# sourceMappingURL=reader.d.ts.map