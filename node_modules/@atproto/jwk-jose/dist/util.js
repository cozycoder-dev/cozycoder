"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.either = either;
function either(a, b) {
    if (a != null && b != null && a !== b) {
        throw new TypeError(`Expected "${b}", got "${a}"`);
    }
    return a ?? b ?? undefined;
}
//# sourceMappingURL=util.js.map