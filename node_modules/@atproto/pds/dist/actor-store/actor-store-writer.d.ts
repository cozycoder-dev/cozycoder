import { ActorStoreTransactor } from './actor-store-transactor';
export declare class ActorStoreWriter extends ActorStoreTransactor {
    transact<T>(fn: (fn: ActorStoreTransactor) => T | PromiseLike<T>): Promise<T>;
}
//# sourceMappingURL=actor-store-writer.d.ts.map