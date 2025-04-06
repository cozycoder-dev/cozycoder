"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntArg = void 0;
const parseIntArg = (arg) => {
    const parsed = parseInt(arg, 10);
    if (isNaN(parsed)) {
        throw new Error(`Invalid arg, expected number: ${arg}`);
    }
    return parsed;
};
exports.parseIntArg = parseIntArg;
//# sourceMappingURL=util.js.map