"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWellknownUrl = buildWellknownUrl;
function buildWellknownUrl(url, name) {
    const path = url.pathname === '/'
        ? `/.well-known/${name}`
        : `${url.pathname.replace(/\/+$/, '')}/${name}`;
    return new URL(path, url);
}
//# sourceMappingURL=well-known.js.map