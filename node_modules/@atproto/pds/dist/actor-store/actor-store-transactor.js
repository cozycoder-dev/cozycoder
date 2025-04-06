"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorStoreTransactor = void 0;
const transactor_1 = require("./preference/transactor");
const transactor_2 = require("./record/transactor");
const transactor_3 = require("./repo/transactor");
class ActorStoreTransactor {
    constructor(did, db, keypair, resources) {
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
        Object.defineProperty(this, "keypair", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keypair
        });
        Object.defineProperty(this, "resources", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: resources
        });
        Object.defineProperty(this, "record", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "repo", {
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
        this.record = new transactor_2.RecordTransactor(db, blobstore);
        this.pref = new transactor_1.PreferenceTransactor(db);
        this.repo = new transactor_3.RepoTransactor(db, blobstore, did, keypair, resources.backgroundQueue);
    }
}
exports.ActorStoreTransactor = ActorStoreTransactor;
//# sourceMappingURL=actor-store-transactor.js.map