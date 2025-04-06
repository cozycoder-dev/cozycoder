"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.server.activateAccount({
        auth: ctx.authVerifier.accessFull(),
        handler: async ({ req, auth }) => {
            // in the case of entryway, the full flow is activateAccount (PDS) -> activateAccount (Entryway) -> updateSubjectStatus(PDS)
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.activateAccount(undefined, ctx.entrywayPassthruHeaders(req));
                return;
            }
            const requester = auth.credentials.did;
            await (0, util_1.assertValidDidDocumentForService)(ctx, requester);
            const account = await ctx.accountManager.getAccount(requester, {
                includeDeactivated: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('user not found', 'AccountNotFound');
            }
            await ctx.accountManager.activateAccount(requester);
            const syncData = await ctx.actorStore.read(requester, (store) => store.repo.getSyncEventData());
            // @NOTE: we're over-emitting for now for backwards compatibility, can reduce this in the future
            const status = await ctx.accountManager.getAccountStatus(requester);
            await ctx.sequencer.sequenceAccountEvt(requester, status);
            await ctx.sequencer.sequenceIdentityEvt(requester, account.handle ?? syntax_1.INVALID_HANDLE);
            await ctx.sequencer.sequenceSyncEvt(requester, syncData);
        },
    });
}
//# sourceMappingURL=activateAccount.js.map