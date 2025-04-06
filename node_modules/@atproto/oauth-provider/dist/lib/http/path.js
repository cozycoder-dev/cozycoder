"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathMatcher = createPathMatcher;
function createPathMatcher(refPath) {
    if (typeof refPath === 'string') {
        // Create a path matcher for a path with parameters (like /foo/:fooId/bar/:barId).
        if (refPath.includes('/:')) {
            const refParts = refPath
                .slice(1)
                .split('/')
                .map((part, i) => [part, i]);
            const refPartsLength = refParts.length;
            const staticParts = refParts.filter(([p]) => !p.startsWith(':'));
            const paramParts = refParts
                // Extract parameters, ignoring those with no name (like /foo/:/bar).
                .filter(([p]) => p.startsWith(':') && p.length > 1)
                .map(([p, i]) => [p.slice(1), i]);
            return (reqPath) => {
                const reqParts = reqPath.slice(1).split('/');
                if (reqParts.length !== refPartsLength)
                    return undefined;
                // Make sure all static parts match.
                for (let i = 0; i < staticParts.length; i++) {
                    const value = staticParts[i][0];
                    const idx = staticParts[i][1];
                    if (value !== reqParts[idx])
                        return undefined;
                }
                // Then extract the parameters.
                const params = {};
                for (let i = 0; i < paramParts.length; i++) {
                    const name = paramParts[i][0];
                    const idx = paramParts[i][1];
                    const value = reqParts[idx];
                    // Empty parameter values are not allowed.
                    if (!value)
                        return undefined;
                    params[name] = value;
                }
                return params;
            };
        }
        return (reqPath) => (reqPath === refPath ? {} : undefined);
    }
    if (refPath instanceof RegExp) {
        return (reqPath) => {
            const match = reqPath.match(refPath);
            return match ? (match.groups || {}) : undefined;
        };
    }
    return refPath;
}
//# sourceMappingURL=path.js.map