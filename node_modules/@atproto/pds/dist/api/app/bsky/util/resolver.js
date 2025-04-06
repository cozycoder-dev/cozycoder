"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDidDoc = void 0;
const identity_1 = require("@atproto/identity");
const xrpc_server_1 = require("@atproto/xrpc-server");
// provides http-friendly errors during did resolution
const getDidDoc = async (ctx, did) => {
    let resolved;
    try {
        resolved = await ctx.idResolver.did.resolve(did);
    }
    catch (err) {
        if (err instanceof identity_1.PoorlyFormattedDidDocumentError) {
            throw new xrpc_server_1.InvalidRequestError(`invalid did document: ${did}`);
        }
        throw err;
    }
    if (!resolved) {
        throw new xrpc_server_1.InvalidRequestError(`could not resolve did document: ${did}`);
    }
    return resolved;
};
exports.getDidDoc = getDidDoc;
//# sourceMappingURL=resolver.js.map