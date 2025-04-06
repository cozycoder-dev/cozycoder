"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorStoreWriter = void 0;
const actor_store_transactor_1 = require("./actor-store-transactor");
class ActorStoreWriter extends actor_store_transactor_1.ActorStoreTransactor {
    async transact(fn) {
        return this.db.transaction((dbTxn) => {
            const transactor = new actor_store_transactor_1.ActorStoreTransactor(this.did, dbTxn, this.keypair, this.resources);
            return fn(transactor);
        });
    }
}
exports.ActorStoreWriter = ActorStoreWriter;
//# sourceMappingURL=actor-store-writer.js.map