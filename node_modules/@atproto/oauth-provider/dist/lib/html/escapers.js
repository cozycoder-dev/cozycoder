"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.javascriptEscaper = javascriptEscaper;
exports.jsonEscaper = jsonEscaper;
exports.cssEscaper = cssEscaper;
exports.htmlEscaper = htmlEscaper;
const html_js_1 = require("./html.js");
const util_js_1 = require("./util.js");
function* javascriptEscaper(code) {
    // "</script>" can only appear in javascript strings, so we can safely escape
    // the "<" without breaking the javascript.
    yield* (0, util_js_1.stringReplacer)(code, '</script>', '\\u003c/script>');
}
function* jsonEscaper(value) {
    // https://redux.js.org/usage/server-rendering#security-considerations
    const json = JSON.stringify(value);
    if (json === undefined)
        throw new TypeError('Cannot serialize to JSON');
    // "<" can only appear in JSON strings, so we can safely escape it without
    // breaking the JSON.
    yield* (0, util_js_1.stringReplacer)(json, '<', '\\u003c');
}
function* cssEscaper(css) {
    yield* (0, util_js_1.stringReplacer)(css, '</style>', '\\u003c/style>');
}
function* htmlEscaper(htmlFragments, values) {
    for (let i = 0; i < htmlFragments.length; i++) {
        yield htmlFragments[i];
        const value = values[i];
        if (value != null)
            yield* htmlVariableToFragments(value);
    }
}
function* htmlVariableToFragments(value) {
    if (value == null) {
        return;
    }
    else if (typeof value === 'number') {
        yield String(value);
    }
    else if (typeof value === 'string') {
        yield encode(value);
    }
    else if (value instanceof html_js_1.Html) {
        yield value;
    }
    else {
        // Will throw if the value is not an iterable
        for (const v of value)
            yield* htmlVariableToFragments(v);
    }
}
const specialCharRegExp = /[<>"'&]/g;
const specialCharMap = new Map([
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&apos;'],
    ['&', '&amp;'],
]);
const specialCharMapGet = (c) => specialCharMap.get(c);
function encode(value) {
    return value.replace(specialCharRegExp, specialCharMapGet);
}
//# sourceMappingURL=escapers.js.map