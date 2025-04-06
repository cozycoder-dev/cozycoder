import stream from 'node:stream';
import { CID } from 'multiformats/cid';
import { BlobRef } from '@atproto/lexicon';
import { BlobStore } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
import { BackgroundQueue } from '../../background';
import { StatusAttr } from '../../lexicon/types/com/atproto/admin/defs';
import { PreparedBlobRef, PreparedWrite } from '../../repo/types';
import { ActorDb } from '../db';
import { BlobReader } from './reader';
export type BlobMetadata = {
    tempKey: string;
    size: number;
    cid: CID;
    mimeType: string;
    width: number | null;
    height: number | null;
};
export declare class BlobTransactor extends BlobReader {
    db: ActorDb;
    blobstore: BlobStore;
    backgroundQueue: BackgroundQueue;
    constructor(db: ActorDb, blobstore: BlobStore, backgroundQueue: BackgroundQueue);
    insertBlobs(recordUri: string, blobs: Iterable<BlobRef>): Promise<void>;
    uploadBlobAndGetMetadata(userSuggestedMime: string, blobStream: stream.Readable): Promise<BlobMetadata>;
    trackUntetheredBlob(metadata: BlobMetadata): Promise<BlobRef>;
    processWriteBlobs(rev: string, writes: PreparedWrite[]): Promise<void>;
    updateBlobTakedownStatus(blob: CID, takedown: StatusAttr): Promise<void>;
    deleteDereferencedBlobs(writes: PreparedWrite[], skipBlobStore?: boolean): Promise<void>;
    verifyBlobAndMakePermanent(blob: PreparedBlobRef): Promise<void>;
    insertBlobMetadata(blob: PreparedBlobRef): Promise<void>;
    associateBlob(blob: PreparedBlobRef, recordUri: AtUri): Promise<void>;
}
export declare class CidNotFound extends Error {
    cid: CID;
    constructor(cid: CID);
}
//# sourceMappingURL=transactor.d.ts.map