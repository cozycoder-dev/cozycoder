"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedObjectError = exports.MissingCommitBlocksError = exports.MissingBlocksError = exports.MissingBlockError = void 0;
class MissingBlockError extends Error {
    constructor(cid, def) {
        let msg = `block not found: ${cid.toString()}`;
        if (def) {
            msg += `, expected type: ${def}`;
        }
        super(msg);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cid
        });
    }
}
exports.MissingBlockError = MissingBlockError;
class MissingBlocksError extends Error {
    constructor(context, cids) {
        const cidStr = cids.map((c) => c.toString());
        super(`missing ${context} blocks: ${cidStr}`);
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: context
        });
        Object.defineProperty(this, "cids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cids
        });
    }
}
exports.MissingBlocksError = MissingBlocksError;
class MissingCommitBlocksError extends Error {
    constructor(commit, cids) {
        const cidStr = cids.map((c) => c.toString());
        super(`missing blocks for commit ${commit.toString()}: ${cidStr}`);
        Object.defineProperty(this, "commit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: commit
        });
        Object.defineProperty(this, "cids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cids
        });
    }
}
exports.MissingCommitBlocksError = MissingCommitBlocksError;
class UnexpectedObjectError extends Error {
    constructor(cid, def) {
        super(`unexpected object at ${cid.toString()}, expected: ${def}`);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cid
        });
        Object.defineProperty(this, "def", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: def
        });
    }
}
exports.UnexpectedObjectError = UnexpectedObjectError;
//# sourceMappingURL=error.js.map