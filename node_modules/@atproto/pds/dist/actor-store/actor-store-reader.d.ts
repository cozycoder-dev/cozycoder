import { Keypair } from '@atproto/crypto';
import { ActorStoreResources } from './actor-store-resources';
import { ActorStoreTransactor } from './actor-store-transactor';
import { ActorDb } from './db';
import { PreferenceReader } from './preference/reader';
import { RecordReader } from './record/reader';
import { RepoReader } from './repo/reader';
export declare class ActorStoreReader {
    readonly did: string;
    protected readonly db: ActorDb;
    protected readonly resources: ActorStoreResources;
    readonly keypair: () => Promise<Keypair>;
    readonly repo: RepoReader;
    readonly record: RecordReader;
    readonly pref: PreferenceReader;
    constructor(did: string, db: ActorDb, resources: ActorStoreResources, keypair: () => Promise<Keypair>);
    transact<T>(fn: (fn: ActorStoreTransactor) => T | PromiseLike<T>): Promise<T>;
}
//# sourceMappingURL=actor-store-reader.d.ts.map