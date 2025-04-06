"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDiff = void 0;
const block_map_1 = require("./block-map");
const cid_set_1 = require("./cid-set");
const mst_1 = require("./mst");
class DataDiff {
    constructor() {
        Object.defineProperty(this, "adds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "updates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "deletes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "newMstBlocks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new block_map_1.BlockMap()
        });
        Object.defineProperty(this, "newLeafCids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new cid_set_1.CidSet()
        });
        Object.defineProperty(this, "removedCids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new cid_set_1.CidSet()
        });
    }
    static async of(curr, prev) {
        return (0, mst_1.mstDiff)(curr, prev);
    }
    async nodeAdd(node) {
        if (node.isLeaf()) {
            this.leafAdd(node.key, node.value);
        }
        else {
            const data = await node.serialize();
            this.treeAdd(data.cid, data.bytes);
        }
    }
    async nodeDelete(node) {
        if (node.isLeaf()) {
            const key = node.key;
            const cid = node.value;
            this.deletes[key] = { key, cid };
            this.removedCids.add(cid);
        }
        else {
            const cid = await node.getPointer();
            this.treeDelete(cid);
        }
    }
    leafAdd(key, cid) {
        this.adds[key] = { key, cid };
        if (this.removedCids.has(cid)) {
            this.removedCids.delete(cid);
        }
        else {
            this.newLeafCids.add(cid);
        }
    }
    leafUpdate(key, prev, cid) {
        if (prev.equals(cid))
            return;
        this.updates[key] = { key, prev, cid };
        this.removedCids.add(prev);
        this.newLeafCids.add(cid);
    }
    leafDelete(key, cid) {
        this.deletes[key] = { key, cid };
        if (this.newLeafCids.has(cid)) {
            this.newLeafCids.delete(cid);
        }
        else {
            this.removedCids.add(cid);
        }
    }
    treeAdd(cid, bytes) {
        if (this.removedCids.has(cid)) {
            this.removedCids.delete(cid);
        }
        else {
            this.newMstBlocks.set(cid, bytes);
        }
    }
    treeDelete(cid) {
        if (this.newMstBlocks.has(cid)) {
            this.newMstBlocks.delete(cid);
        }
        else {
            this.removedCids.add(cid);
        }
    }
    addList() {
        return Object.values(this.adds);
    }
    updateList() {
        return Object.values(this.updates);
    }
    deleteList() {
        return Object.values(this.deletes);
    }
    updatedKeys() {
        const keys = [
            ...Object.keys(this.adds),
            ...Object.keys(this.updates),
            ...Object.keys(this.deletes),
        ];
        return [...new Set(keys)];
    }
}
exports.DataDiff = DataDiff;
//# sourceMappingURL=data-diff.js.map