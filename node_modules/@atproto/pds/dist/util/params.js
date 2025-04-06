"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCidParam = void 0;
const cid_1 = require("multiformats/cid");
const xrpc_server_1 = require("@atproto/xrpc-server");
const parseCidParam = (cid) => {
    try {
        return cid_1.CID.parse(cid);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            throw new xrpc_server_1.InvalidRequestError('Invalid cid');
        }
        throw err;
    }
};
exports.parseCidParam = parseCidParam;
//# sourceMappingURL=params.js.map