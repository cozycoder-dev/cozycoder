import { Keypair } from '@atproto/crypto';
import { ActorStoreResources } from './actor-store-resources';
import { ActorDb } from './db';
import { PreferenceTransactor } from './preference/transactor';
import { RecordTransactor } from './record/transactor';
import { RepoTransactor } from './repo/transactor';
export declare class ActorStoreTransactor {
    readonly did: string;
    protected readonly db: ActorDb;
    protected readonly keypair: Keypair;
    protected readonly resources: ActorStoreResources;
    readonly record: RecordTransactor;
    readonly repo: RepoTransactor;
    readonly pref: PreferenceTransactor;
    constructor(did: string, db: ActorDb, keypair: Keypair, resources: ActorStoreResources);
}
//# sourceMappingURL=actor-store-transactor.d.ts.map