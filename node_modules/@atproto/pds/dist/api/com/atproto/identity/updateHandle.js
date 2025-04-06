"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
const logger_1 = require("../../../../logger");
function default_1(server, ctx) {
    server.com.atproto.identity.updateHandle({
        auth: ctx.authVerifier.accessStandard({ checkTakedown: true }),
        rateLimit: [
            {
                durationMs: 5 * common_1.MINUTE,
                points: 10,
                calcKey: ({ auth }) => auth.credentials.did,
            },
            {
                durationMs: common_1.DAY,
                points: 50,
                calcKey: ({ auth }) => auth.credentials.did,
            },
        ],
        handler: async ({ auth, input, req }) => {
            const requester = auth.credentials.did;
            if (ctx.entrywayAgent) {
                // the full flow is:
                // -> entryway(identity.updateHandle) [update handle, submit plc op]
                // -> pds(admin.updateAccountHandle)  [track handle, sequence handle update]
                await ctx.entrywayAgent.com.atproto.identity.updateHandle(
                // @ts-expect-error "did" is not in the schema
                { did: requester, handle: input.body.handle }, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoIdentityUpdateHandle));
                return;
            }
            const handle = await ctx.accountManager.normalizeAndValidateHandle(input.body.handle, { did: requester });
            // Pessimistic check to handle spam: also enforced by updateHandle() and the db.
            const account = await ctx.accountManager.getAccount(handle, {
                includeDeactivated: true,
            });
            if (!account) {
                if (requester.startsWith('did:plc:')) {
                    await ctx.plcClient.updateHandle(requester, ctx.plcRotationKey, handle);
                }
                else {
                    const resolved = await ctx.idResolver.did.resolveAtprotoData(requester, true);
                    if (resolved.handle !== handle) {
                        throw new xrpc_server_1.InvalidRequestError('DID is not properly configured for handle');
                    }
                }
                await ctx.accountManager.updateHandle(requester, handle);
            }
            else {
                // if we found an account with matching handle, check if it is the same as requester
                // if so emit an identity event, otherwise error.
                if (account.did !== requester) {
                    throw new xrpc_server_1.InvalidRequestError(`Handle already taken: ${handle}`);
                }
            }
            try {
                await ctx.sequencer.sequenceIdentityEvt(requester, handle);
            }
            catch (err) {
                logger_1.httpLogger.error({ err, did: requester, handle }, 'failed to sequence handle update');
            }
        },
    });
}
//# sourceMappingURL=updateHandle.js.map