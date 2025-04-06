"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BunnyInvalidator = void 0;
const common_1 = require("@atproto/common");
const API_PURGE_URL = 'https://api.bunny.net/purge';
class BunnyInvalidator {
    constructor(cfg) {
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cfg
        });
    }
    async invalidate(_subject, paths) {
        await (0, common_1.allFulfilled)(paths.map(async (path) => purgeUrl({
            url: this.cfg.urlPrefix + path,
            accessKey: this.cfg.accessKey,
        })));
    }
}
exports.BunnyInvalidator = BunnyInvalidator;
exports.default = BunnyInvalidator;
async function purgeUrl(opts) {
    const search = new URLSearchParams();
    search.set('async', 'true');
    search.set('url', opts.url);
    await fetch(API_PURGE_URL + '?' + search.toString(), {
        method: 'post',
        headers: { AccessKey: opts.accessKey },
    });
}
//# sourceMappingURL=bunny.js.map