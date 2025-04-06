"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const api_1 = require("@atproto/api");
const identity_1 = require("@atproto/identity");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_verifier_1 = require("../../../../auth-verifier");
const lexicons_1 = require("../../../../lexicon/lexicons");
const resolver_1 = require("../util/resolver");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.app.bsky.notification.registerPush({
        auth: ctx.authVerifier.accessStandard({
            additional: [auth_verifier_1.AuthScope.SignupQueued],
        }),
        handler: async ({ auth, input }) => {
            const { serviceDid } = input.body;
            const { credentials: { did }, } = auth;
            const authHeaders = await ctx.serviceAuthHeaders(did, serviceDid, lexicons_1.ids.AppBskyNotificationRegisterPush);
            if (bskyAppView.did === serviceDid) {
                await bskyAppView.agent.app.bsky.notification.registerPush(input.body, {
                    ...authHeaders,
                    encoding: 'application/json',
                });
                return;
            }
            const notifEndpoint = await getEndpoint(ctx, serviceDid);
            const agent = new api_1.AtpAgent({ service: notifEndpoint });
            await agent.api.app.bsky.notification.registerPush(input.body, {
                ...authHeaders,
                encoding: 'application/json',
            });
        },
    });
}
const getEndpoint = async (ctx, serviceDid) => {
    const doc = await (0, resolver_1.getDidDoc)(ctx, serviceDid);
    const notifEndpoint = (0, identity_1.getNotif)(doc);
    if (!notifEndpoint) {
        throw new xrpc_server_1.InvalidRequestError(`invalid notification service details in did document: ${serviceDid}`);
    }
    return notifEndpoint;
};
//# sourceMappingURL=registerPush.js.map