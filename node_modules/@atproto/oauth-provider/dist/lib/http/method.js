"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMethodMatcher = createMethodMatcher;
function createMethodMatcher(method) {
    if (method === '*')
        return () => true;
    if (typeof method === 'function')
        return method;
    if (typeof method === 'string') {
        method = method.toUpperCase();
        return (req) => req.method === method;
    }
    const set = new Set(Array.from(method, (m) => m.toUpperCase()));
    if (set.size === 0)
        return () => false;
    return (req) => req.method != null && set.has(req.method);
}
//# sourceMappingURL=method.js.map