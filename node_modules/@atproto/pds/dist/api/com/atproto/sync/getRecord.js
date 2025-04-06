"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const repo = __importStar(require("@atproto/repo"));
const xrpc_server_1 = require("@atproto/xrpc-server");
const sql_repo_reader_1 = require("../../../../actor-store/repo/sql-repo-reader");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.atproto.sync.getRecord({
        auth: ctx.authVerifier.optionalAccessOrAdminToken(),
        handler: async ({ params, auth }) => {
            const { did, collection, rkey } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            // must open up the db outside of store interface so that we can close the file handle after finished streaming
            const actorDb = await ctx.actorStore.openDb(did);
            let carStream;
            try {
                const storage = new sql_repo_reader_1.SqlRepoReader(actorDb);
                const commit = await storage.getRoot();
                if (!commit) {
                    throw new xrpc_server_1.InvalidRequestError(`Could not find repo for DID: ${did}`);
                }
                const carIter = repo.getRecords(storage, commit, [{ collection, rkey }]);
                carStream = (0, common_1.byteIterableToStream)(carIter);
            }
            catch (err) {
                actorDb.close();
                throw err;
            }
            const closeDb = () => actorDb.close();
            carStream.on('error', closeDb);
            carStream.on('close', closeDb);
            return {
                encoding: 'application/vnd.ipld.car',
                body: carStream,
            };
        },
    });
}
//# sourceMappingURL=getRecord.js.map