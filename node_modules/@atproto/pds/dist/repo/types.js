"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRecordSwapError = exports.BadCommitSwapError = exports.InvalidRecordError = void 0;
class InvalidRecordError extends Error {
}
exports.InvalidRecordError = InvalidRecordError;
class BadCommitSwapError extends Error {
    constructor(cid) {
        super(`Commit was at ${cid.toString()}`);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cid
        });
    }
}
exports.BadCommitSwapError = BadCommitSwapError;
class BadRecordSwapError extends Error {
    constructor(cid) {
        super(`Record was at ${cid?.toString() ?? 'null'}`);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cid
        });
    }
}
exports.BadRecordSwapError = BadRecordSwapError;
//# sourceMappingURL=types.js.map