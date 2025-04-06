"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(server, ctx) {
    server.com.atproto.repo.listMissingBlobs({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ auth, params }) => {
            const did = auth.credentials.did;
            const { limit, cursor } = params;
            const blobs = await ctx.actorStore.read(did, (store) => store.repo.blob.listMissingBlobs({ limit, cursor }));
            return {
                encoding: 'application/json',
                body: {
                    blobs,
                    cursor: blobs.at(-1)?.cid,
                },
            };
        },
    });
}
//# sourceMappingURL=listMissingBlobs.js.map