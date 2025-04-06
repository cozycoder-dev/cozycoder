"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCsp = buildCsp;
exports.mergeCsp = mergeCsp;
exports.combineCsp = combineCsp;
const STRING_DIRECTIVES = ['base-uri'];
const BOOLEAN_DIRECTIVES = [
    'upgrade-insecure-requests',
    'block-all-mixed-content',
];
const ARRAY_DIRECTIVES = [
    'connect-src',
    'default-src',
    'form-action',
    'frame-ancestors',
    'frame-src',
    'img-src',
    'script-src',
    'style-src',
];
const NONE = "'none'";
function buildCsp(config) {
    const values = [];
    for (const name of BOOLEAN_DIRECTIVES) {
        if (config[name] === true)
            values.push(name);
    }
    for (const name of STRING_DIRECTIVES) {
        if (config[name])
            values.push(`${name} ${config[name]}`);
    }
    for (const name of ARRAY_DIRECTIVES) {
        // Remove duplicate values by using a Set
        const val = config[name] ? new Set(config[name]) : undefined;
        if (val?.size)
            values.push(`${name} ${Array.from(val).join(' ')}`);
    }
    return values.join('; ');
}
function mergeCsp(...configs) {
    return configs.filter((v) => v != null).reduce(combineCsp);
}
function combineCsp(a, b) {
    const result = {};
    for (const name of BOOLEAN_DIRECTIVES) {
        // @NOTE b (if defined) takes precedence
        const value = b[name] ?? a[name];
        if (value != null)
            result[name] = value;
    }
    for (const name of STRING_DIRECTIVES) {
        if (a[name] || b[name]) {
            const aNotNone = a[name] === NONE ? undefined : a[name];
            const bNotNone = b[name] === NONE ? undefined : b[name];
            // @NOTE b takes precedence
            result[name] = bNotNone || aNotNone || NONE;
        }
    }
    for (const name of ARRAY_DIRECTIVES) {
        if (a[name] && b[name]) {
            const set = new Set(a[name]);
            if (b[name])
                for (const value of b[name])
                    set.add(value);
            if (set.size > 1 && set.has(NONE))
                set.delete(NONE);
            result[name] = [...set];
        }
        else if (a[name] || b[name]) {
            result[name] = a[name] || b[name];
        }
    }
    return result;
}
//# sourceMappingURL=index.js.map