import { ExportableKeypair, Keypair } from '@atproto/crypto';
import { ActorStoreConfig } from '../config';
import { ActorStoreReader } from './actor-store-reader';
import { ActorStoreResources } from './actor-store-resources';
import { ActorStoreTransactor } from './actor-store-transactor';
import { ActorStoreWriter } from './actor-store-writer';
import { ActorDb } from './db';
export declare class ActorStore {
    cfg: ActorStoreConfig;
    resources: ActorStoreResources;
    reservedKeyDir: string;
    constructor(cfg: ActorStoreConfig, resources: ActorStoreResources);
    getLocation(did: string): Promise<{
        directory: string;
        dbLocation: string;
        keyLocation: string;
    }>;
    exists(did: string): Promise<boolean>;
    keypair(did: string): Promise<Keypair>;
    openDb(did: string): Promise<ActorDb>;
    read<T>(did: string, fn: (fn: ActorStoreReader) => T | PromiseLike<T>): Promise<T>;
    transact<T>(did: string, fn: (fn: ActorStoreTransactor) => T | PromiseLike<T>): Promise<T>;
    writeNoTransaction<T>(did: string, fn: (fn: ActorStoreWriter) => T | PromiseLike<T>): Promise<T>;
    create(did: string, keypair: ExportableKeypair): Promise<void>;
    destroy(did: string): Promise<void>;
    reserveKeypair(did?: string): Promise<string>;
    getReservedKeypair(signingKeyOrDid: string): Promise<ExportableKeypair | undefined>;
    clearReservedKeypair(keyDid: string, did?: string): Promise<void>;
    storePlcOp(did: string, op: Uint8Array): Promise<void>;
    getPlcOp(did: string): Promise<Uint8Array>;
    clearPlcOp(did: string): Promise<void>;
}
//# sourceMappingURL=actor-store.d.ts.map