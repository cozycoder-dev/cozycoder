"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorStoreReader = void 0;
const actor_store_transactor_1 = require("./actor-store-transactor");
const reader_1 = require("./preference/reader");
const reader_2 = require("./record/reader");
const reader_3 = require("./repo/reader");
class ActorStoreReader {
    constructor(did, db, resources, keypair) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "resources", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: resources
        });
        Object.defineProperty(this, "keypair", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keypair
        });
        Object.defineProperty(this, "repo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "record", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const blobstore = resources.blobstore(did);
        this.repo = new reader_3.RepoReader(db, blobstore);
        this.record = new reader_2.RecordReader(db);
        this.pref = new reader_1.PreferenceReader(db);
        // Invoke "keypair" once. Also avoids leaking "this" as keypair context.
        let keypairPromise;
        this.keypair = () => (keypairPromise ?? (keypairPromise = Promise.resolve().then(keypair)));
    }
    async transact(fn) {
        const keypair = await this.keypair();
        return this.db.transaction((dbTxn) => {
            const store = new actor_store_transactor_1.ActorStoreTransactor(this.did, dbTxn, keypair, this.resources);
            return fn(store);
        });
    }
}
exports.ActorStoreReader = ActorStoreReader;
//# sourceMappingURL=actor-store-reader.js.map