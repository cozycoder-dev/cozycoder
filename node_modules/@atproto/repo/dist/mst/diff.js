"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mstDiff = exports.nullDiff = void 0;
const data_diff_1 = require("../data-diff");
const walker_1 = require("./walker");
const nullDiff = async (tree) => {
    const diff = new data_diff_1.DataDiff();
    for await (const entry of tree.walk()) {
        await diff.nodeAdd(entry);
    }
    return diff;
};
exports.nullDiff = nullDiff;
const mstDiff = async (curr, prev) => {
    await curr.getPointer();
    if (prev === null) {
        return (0, exports.nullDiff)(curr);
    }
    await prev.getPointer();
    const diff = new data_diff_1.DataDiff();
    const leftWalker = new walker_1.MstWalker(prev);
    const rightWalker = new walker_1.MstWalker(curr);
    while (!leftWalker.status.done || !rightWalker.status.done) {
        // if one walker is finished, continue walking the other & logging all nodes
        if (leftWalker.status.done && !rightWalker.status.done) {
            await diff.nodeAdd(rightWalker.status.curr);
            await rightWalker.advance();
            continue;
        }
        else if (!leftWalker.status.done && rightWalker.status.done) {
            await diff.nodeDelete(leftWalker.status.curr);
            await leftWalker.advance();
            continue;
        }
        if (leftWalker.status.done || rightWalker.status.done)
            break;
        const left = leftWalker.status.curr;
        const right = rightWalker.status.curr;
        if (left === null || right === null)
            break;
        // if both pointers are leaves, record an update & advance both or record the lowest key and advance that pointer
        if (left.isLeaf() && right.isLeaf()) {
            if (left.key === right.key) {
                if (!left.value.equals(right.value)) {
                    diff.leafUpdate(left.key, left.value, right.value);
                }
                await leftWalker.advance();
                await rightWalker.advance();
            }
            else if (left.key < right.key) {
                diff.leafDelete(left.key, left.value);
                await leftWalker.advance();
            }
            else {
                diff.leafAdd(right.key, right.value);
                await rightWalker.advance();
            }
            continue;
        }
        // next, ensure that we're on the same layer
        // if one walker is at a higher layer than the other, we need to do one of two things
        // if the higher walker is pointed at a tree, step into that tree to try to catch up with the lower
        // if the higher walker is pointed at a leaf, then advance the lower walker to try to catch up the higher
        if (leftWalker.layer() > rightWalker.layer()) {
            if (left.isLeaf()) {
                await diff.nodeAdd(right);
                await rightWalker.advance();
            }
            else {
                await diff.nodeDelete(left);
                await leftWalker.stepInto();
            }
            continue;
        }
        else if (leftWalker.layer() < rightWalker.layer()) {
            if (right.isLeaf()) {
                await diff.nodeDelete(left);
                await leftWalker.advance();
            }
            else {
                await diff.nodeAdd(right);
                await rightWalker.stepInto();
            }
            continue;
        }
        // if we're on the same level, and both pointers are trees, do a comparison
        // if they're the same, step over. if they're different, step in to find the subdiff
        if (left.isTree() && right.isTree()) {
            if (left.pointer.equals(right.pointer)) {
                await leftWalker.stepOver();
                await rightWalker.stepOver();
            }
            else {
                await diff.nodeAdd(right);
                await diff.nodeDelete(left);
                await leftWalker.stepInto();
                await rightWalker.stepInto();
            }
            continue;
        }
        // finally, if one pointer is a tree and the other is a leaf, simply step into the tree
        if (left.isLeaf() && right.isTree()) {
            await diff.nodeAdd(right);
            await rightWalker.stepInto();
            continue;
        }
        else if (left.isTree() && right.isLeaf()) {
            await diff.nodeDelete(left);
            await leftWalker.stepInto();
            continue;
        }
        throw new Error('Unidentifiable case in diff walk');
    }
    return diff;
};
exports.mstDiff = mstDiff;
//# sourceMappingURL=diff.js.map