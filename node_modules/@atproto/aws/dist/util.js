"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiImageInvalidator = void 0;
const common_1 = require("@atproto/common");
class MultiImageInvalidator {
    constructor(invalidators) {
        Object.defineProperty(this, "invalidators", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: invalidators
        });
    }
    async invalidate(subject, paths) {
        await (0, common_1.allFulfilled)(this.invalidators.map((invalidator) => invalidator.invalidate(subject, paths)));
    }
}
exports.MultiImageInvalidator = MultiImageInvalidator;
//# sourceMappingURL=util.js.map