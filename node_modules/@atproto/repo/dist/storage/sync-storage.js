"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncStorage = void 0;
const readable_blockstore_1 = require("./readable-blockstore");
class SyncStorage extends readable_blockstore_1.ReadableBlockstore {
    constructor(staged, saved) {
        super();
        Object.defineProperty(this, "staged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: staged
        });
        Object.defineProperty(this, "saved", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: saved
        });
    }
    async getBytes(cid) {
        const got = await this.staged.getBytes(cid);
        if (got)
            return got;
        return this.saved.getBytes(cid);
    }
    async getBlocks(cids) {
        const fromStaged = await this.staged.getBlocks(cids);
        const fromSaved = await this.saved.getBlocks(fromStaged.missing);
        const blocks = fromStaged.blocks;
        blocks.addMap(fromSaved.blocks);
        return {
            blocks,
            missing: fromSaved.missing,
        };
    }
    async has(cid) {
        return (await this.staged.has(cid)) || (await this.saved.has(cid));
    }
}
exports.SyncStorage = SyncStorage;
exports.default = SyncStorage;
//# sourceMappingURL=sync-storage.js.map