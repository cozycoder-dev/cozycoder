"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugCatch = void 0;
const debugCatch = (fn) => {
    return async (...args) => {
        try {
            return (await fn(...args));
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    };
};
exports.debugCatch = debugCatch;
//# sourceMappingURL=debug.js.map