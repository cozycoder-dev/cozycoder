"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const cid_1 = require("multiformats/cid");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const defs_1 = require("../../../../lexicon/types/com/atproto/admin/defs");
const strongRef_1 = require("../../../../lexicon/types/com/atproto/repo/strongRef");
function default_1(server, ctx) {
    server.com.atproto.admin.updateSubjectStatus({
        auth: ctx.authVerifier.moderator,
        handler: async ({ input }) => {
            const { subject, takedown, deactivated } = input.body;
            if (takedown) {
                if ((0, defs_1.isRepoRef)(subject)) {
                    await ctx.accountManager.takedownAccount(subject.did, takedown);
                }
                else if ((0, strongRef_1.isMain)(subject)) {
                    const uri = new syntax_1.AtUri(subject.uri);
                    await ctx.actorStore.transact(uri.hostname, (store) => store.record.updateRecordTakedownStatus(uri, takedown));
                }
                else if ((0, defs_1.isRepoBlobRef)(subject)) {
                    await ctx.actorStore.transact(subject.did, (store) => store.repo.blob.updateBlobTakedownStatus(cid_1.CID.parse(subject.cid), takedown));
                }
                else {
                    throw new xrpc_server_1.InvalidRequestError('Invalid subject');
                }
            }
            if (deactivated) {
                if ((0, defs_1.isRepoRef)(subject)) {
                    if (deactivated.applied) {
                        await ctx.accountManager.deactivateAccount(subject.did, null);
                    }
                    else {
                        await ctx.accountManager.activateAccount(subject.did);
                    }
                }
            }
            if ((0, defs_1.isRepoRef)(subject)) {
                const status = await ctx.accountManager.getAccountStatus(subject.did);
                await ctx.sequencer.sequenceAccountEvt(subject.did, status);
            }
            return {
                encoding: 'application/json',
                body: {
                    subject,
                    takedown,
                },
            };
        },
    });
}
//# sourceMappingURL=updateSubjectStatus.js.map