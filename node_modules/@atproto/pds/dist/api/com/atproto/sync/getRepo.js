"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarStream = void 0;
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const sql_repo_reader_1 = require("../../../../actor-store/repo/sql-repo-reader");
const auth_verifier_1 = require("../../../../auth-verifier");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.getRepo({
        auth: ctx.authVerifier.optionalAccessOrAdminToken({
            additional: [auth_verifier_1.AuthScope.Takendown],
        }),
        handler: async ({ params, auth }) => {
            const { did, since } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            const carStream = await (0, exports.getCarStream)(ctx, did, since);
            return {
                encoding: 'application/vnd.ipld.car',
                body: carStream,
            };
        },
    });
}
const getCarStream = async (ctx, did, since) => {
    const actorDb = await ctx.actorStore.openDb(did);
    let carStream;
    try {
        const storage = new sql_repo_reader_1.SqlRepoReader(actorDb);
        const carIter = await storage.getCarStream(since);
        carStream = (0, common_1.byteIterableToStream)(carIter);
    }
    catch (err) {
        await actorDb.close();
        if (err instanceof sql_repo_reader_1.RepoRootNotFoundError) {
            throw new xrpc_server_1.InvalidRequestError(`Could not find repo for DID: ${did}`);
        }
        throw err;
    }
    const closeDb = () => actorDb.close();
    carStream.on('error', closeDb);
    carStream.on('close', closeDb);
    return carStream;
};
exports.getCarStream = getCarStream;
//# sourceMappingURL=getRepo.js.map