import stream from 'node:stream';
import { CID } from 'multiformats/cid';
import { BlobStore } from '@atproto/repo';
export declare class DiskBlobStore implements BlobStore {
    did: string;
    location: string;
    tmpLocation: string;
    quarantineLocation: string;
    constructor(did: string, location: string, tmpLocation: string, quarantineLocation: string);
    static creator(location: string, tmpLocation?: string, quarantineLocation?: string): (did: string) => DiskBlobStore;
    private ensureDir;
    private ensureTemp;
    private ensureQuarantine;
    private genKey;
    getTmpPath(key: string): string;
    getStoredPath(cid: CID): string;
    getQuarantinePath(cid: CID): string;
    hasTemp(key: string): Promise<boolean>;
    hasStored(cid: CID): Promise<boolean>;
    putTemp(bytes: Uint8Array | stream.Readable): Promise<string>;
    makePermanent(key: string, cid: CID): Promise<void>;
    putPermanent(cid: CID, bytes: Uint8Array | stream.Readable): Promise<void>;
    quarantine(cid: CID): Promise<void>;
    unquarantine(cid: CID): Promise<void>;
    getBytes(cid: CID): Promise<Uint8Array>;
    getStream(cid: CID): Promise<stream.Readable>;
    delete(cid: CID): Promise<void>;
    deleteMany(cids: CID[]): Promise<void>;
    deleteAll(): Promise<void>;
}
//# sourceMappingURL=disk-blobstore.d.ts.map