"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchError = void 0;
class FetchError extends Error {
    constructor(statusCode, message, options) {
        super(message, options);
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: statusCode
        });
    }
    get expose() {
        return true;
    }
}
exports.FetchError = FetchError;
//# sourceMappingURL=fetch-error.js.map