"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDefined = void 0;
exports.keyBy = keyBy;
function keyBy(arr, key) {
    return arr.reduce((acc, cur) => {
        acc.set(cur[key], cur);
        return acc;
    }, new Map());
}
const mapDefined = (arr, fn) => {
    const output = [];
    for (const item of arr) {
        const val = fn(item);
        if (val !== undefined) {
            output.push(val);
        }
    }
    return output;
};
exports.mapDefined = mapDefined;
//# sourceMappingURL=arrays.js.map