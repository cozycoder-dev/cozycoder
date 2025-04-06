"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_verifier_1 = require("../../../../auth-verifier");
function default_1(server, ctx) {
    server.com.atproto.server.deactivateAccount({
        auth: ctx.authVerifier.accessFull({ additional: [auth_verifier_1.AuthScope.Takendown] }),
        handler: async ({ req, auth, input }) => {
            // in the case of entryway, the full flow is deactivateAccount (PDS) -> deactivateAccount (Entryway) -> updateSubjectStatus(PDS)
            if (ctx.entrywayAgent) {
                await ctx.entrywayAgent.com.atproto.server.deactivateAccount(input.body, ctx.entrywayPassthruHeaders(req));
                return;
            }
            const requester = auth.credentials.did;
            await ctx.accountManager.deactivateAccount(requester, input.body.deleteAfter ?? null);
            const status = await ctx.accountManager.getAccountStatus(requester);
            await ctx.sequencer.sequenceAccountEvt(requester, status);
        },
    });
}
//# sourceMappingURL=deactivateAccount.js.map