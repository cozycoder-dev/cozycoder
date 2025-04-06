"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReplayStore = isReplayStore;
exports.ifReplayStore = ifReplayStore;
exports.asReplayStore = asReplayStore;
function isReplayStore(implementation) {
    return typeof implementation.unique === 'function';
}
function ifReplayStore(implementation) {
    if (implementation && isReplayStore(implementation)) {
        return implementation;
    }
    return undefined;
}
function asReplayStore(implementation) {
    const store = ifReplayStore(implementation);
    if (store)
        return store;
    throw new Error('Invalid ReplayStore implementation');
}
//# sourceMappingURL=replay-store.js.map