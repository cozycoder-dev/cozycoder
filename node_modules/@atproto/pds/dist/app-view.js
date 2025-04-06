"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppView = void 0;
const node_util_1 = require("node:util");
const api_1 = require("@atproto/api");
class AppView {
    constructor(options) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cdnUrlPattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.did = options.did;
        this.agent = new api_1.AtpAgent({ service: options.url });
        this.cdnUrlPattern = options.cdnUrlPattern;
    }
    getImageUrl(pattern, did, cid) {
        if (this.cdnUrlPattern)
            return (0, node_util_1.format)(this.cdnUrlPattern, pattern, did, cid);
    }
}
exports.AppView = AppView;
//# sourceMappingURL=app-view.js.map