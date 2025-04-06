"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const handle_1 = require("../../../../handle");
function default_1(server, ctx) {
    server.com.atproto.identity.resolveHandle(async ({ params }) => {
        const handle = (0, handle_1.baseNormalizeAndValidate)(params.handle);
        let did;
        const user = await ctx.accountManager.getAccount(handle);
        if (user) {
            did = user.did;
        }
        else {
            const supportedHandle = ctx.cfg.identity.serviceHandleDomains.some((host) => handle.endsWith(host) || handle === host.slice(1));
            // this should be in our DB & we couldn't find it, so fail
            if (supportedHandle) {
                throw new xrpc_server_1.InvalidRequestError('Unable to resolve handle');
            }
        }
        // this is not someone on our server, but we help with resolving anyway
        if (!did && ctx.bskyAppView) {
            try {
                const result = await ctx.bskyAppView.agent.com.atproto.identity.resolveHandle({
                    handle,
                });
                did = result.data.did;
            }
            catch {
                // Ignore
            }
        }
        if (!did) {
            did = await ctx.idResolver.handle.resolve(handle);
        }
        if (!did) {
            throw new xrpc_server_1.InvalidRequestError('Unable to resolve handle');
        }
        return {
            encoding: 'application/json',
            body: { did },
        };
    });
}
//# sourceMappingURL=resolveHandle.js.map