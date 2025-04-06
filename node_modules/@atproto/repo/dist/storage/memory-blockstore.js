"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryBlockstore = void 0;
const block_map_1 = require("../block-map");
const readable_blockstore_1 = require("./readable-blockstore");
class MemoryBlockstore extends readable_blockstore_1.ReadableBlockstore {
    constructor(blocks) {
        super();
        Object.defineProperty(this, "blocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "rev", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.blocks = new block_map_1.BlockMap();
        if (blocks) {
            this.blocks.addMap(blocks);
        }
    }
    async getRoot() {
        return this.root;
    }
    async getBytes(cid) {
        return this.blocks.get(cid) || null;
    }
    async has(cid) {
        return this.blocks.has(cid);
    }
    async getBlocks(cids) {
        return this.blocks.getMany(cids);
    }
    async putBlock(cid, block) {
        this.blocks.set(cid, block);
    }
    async putMany(blocks) {
        this.blocks.addMap(blocks);
    }
    async updateRoot(cid, rev) {
        this.root = cid;
        this.rev = rev;
    }
    async applyCommit(commit) {
        this.root = commit.cid;
        const rmCids = commit.removedCids.toList();
        for (const cid of rmCids) {
            this.blocks.delete(cid);
        }
        commit.newBlocks.forEach((bytes, cid) => {
            this.blocks.set(cid, bytes);
        });
    }
    async sizeInBytes() {
        let total = 0;
        this.blocks.forEach((bytes) => {
            total += bytes.byteLength;
        });
        return total;
    }
    async destroy() {
        this.blocks.clear();
    }
}
exports.MemoryBlockstore = MemoryBlockstore;
exports.default = MemoryBlockstore;
//# sourceMappingURL=memory-blockstore.js.map