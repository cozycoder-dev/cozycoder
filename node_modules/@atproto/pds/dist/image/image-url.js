"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUrlBuilder = void 0;
const lexicons_1 = require("../lexicon/lexicons");
class ImageUrlBuilder {
    constructor(pdsHostname, appview) {
        Object.defineProperty(this, "pdsHostname", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pdsHostname
        });
        Object.defineProperty(this, "appview", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: appview
        });
    }
    build(pattern, did, cid) {
        return (this.appview?.getImageUrl(pattern, did, cid) ??
            `https://${this.pdsHostname}/xrpc/${lexicons_1.ids.ComAtprotoSyncGetBlob}?did=${did}&cid=${cid}`);
    }
}
exports.ImageUrlBuilder = ImageUrlBuilder;
//# sourceMappingURL=image-url.js.map