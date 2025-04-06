"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    server.com.atproto.repo.getRecord(async ({ req, params }) => {
        const { repo, collection, rkey, cid } = params;
        const did = await ctx.accountManager.getDidForActor(repo);
        // fetch from pds if available, if not then fetch from appview
        if (did) {
            const uri = syntax_1.AtUri.make(did, collection, rkey);
            const record = await ctx.actorStore.read(did, (store) => store.record.getRecord(uri, cid ?? null));
            if (!record || record.takedownRef !== null) {
                throw new xrpc_server_1.InvalidRequestError(`Could not locate record: ${uri}`, 'RecordNotFound');
            }
            return {
                encoding: 'application/json',
                body: {
                    uri: uri.toString(),
                    cid: record.cid,
                    value: record.value,
                },
            };
        }
        if (!ctx.cfg.bskyAppView) {
            throw new xrpc_server_1.InvalidRequestError(`Could not locate record`);
        }
        return (0, pipethrough_1.pipethrough)(ctx, req);
    });
}
//# sourceMappingURL=getRecord.js.map