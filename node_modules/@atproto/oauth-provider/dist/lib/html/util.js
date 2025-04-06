"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringReplacer = stringReplacer;
function* stringReplacer(source, searchValue, replaceValue) {
    let previousIndex = 0;
    let index = source.indexOf(searchValue);
    while (index !== -1) {
        yield source.slice(previousIndex, index);
        yield replaceValue;
        previousIndex = index + searchValue.length;
        index = source.indexOf(searchValue, previousIndex);
    }
    yield source.slice(previousIndex);
}
//# sourceMappingURL=util.js.map