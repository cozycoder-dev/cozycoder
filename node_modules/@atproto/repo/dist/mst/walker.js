"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MstWalker = void 0;
class MstWalker {
    constructor(root) {
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: root
        });
        Object.defineProperty(this, "stack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = {
            done: false,
            curr: root,
            walking: null,
            index: 0,
        };
    }
    // return the current layer of the node you are walking
    layer() {
        if (this.status.done) {
            throw new Error('Walk is done');
        }
        if (this.status.walking) {
            return this.status.walking.layer ?? 0;
        }
        // if curr is the root of the tree, add 1
        if (this.status.curr.isTree()) {
            return (this.status.curr.layer ?? 0) + 1;
        }
        throw new Error('Could not identify layer of walk');
    }
    // move to the next node in the subtree, skipping over the subtree
    async stepOver() {
        if (this.status.done)
            return;
        // if stepping over the root of the node, we're done
        if (this.status.walking === null) {
            this.status = { done: true };
            return;
        }
        const entries = await this.status.walking.getEntries();
        this.status.index++;
        const next = entries[this.status.index];
        if (!next) {
            const popped = this.stack.pop();
            if (!popped) {
                this.status = { done: true };
                return;
            }
            else {
                this.status = popped;
                await this.stepOver();
                return;
            }
        }
        else {
            this.status.curr = next;
        }
    }
    // step into a subtree, throws if currently pointed at a leaf
    async stepInto() {
        if (this.status.done)
            return;
        // edge case for very start of walk
        if (this.status.walking === null) {
            if (!this.status.curr.isTree()) {
                throw new Error('The root of the tree cannot be a leaf');
            }
            const next = await this.status.curr.atIndex(0);
            if (!next) {
                this.status = { done: true };
            }
            else {
                this.status = {
                    done: false,
                    walking: this.status.curr,
                    curr: next,
                    index: 0,
                };
            }
            return;
        }
        if (!this.status.curr.isTree()) {
            throw new Error('No tree at pointer, cannot step into');
        }
        const next = await this.status.curr.atIndex(0);
        if (!next) {
            throw new Error('Tried to step into a node with 0 entries which is invalid');
        }
        this.stack.push({ ...this.status });
        this.status.walking = this.status.curr;
        this.status.curr = next;
        this.status.index = 0;
    }
    // advance the pointer to the next node in the tree,
    // stepping into the current node if necessary
    async advance() {
        if (this.status.done)
            return;
        if (this.status.curr.isLeaf()) {
            await this.stepOver();
        }
        else {
            await this.stepInto();
        }
    }
}
exports.MstWalker = MstWalker;
//# sourceMappingURL=walker.js.map