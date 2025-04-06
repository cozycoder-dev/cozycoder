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
const id = __importStar(require("@atproto/identity"));
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../sync/util");
function default_1(server, ctx) {
    server.com.atproto.repo.describeRepo(async ({ params }) => {
        const { repo } = params;
        const account = await (0, util_1.assertRepoAvailability)(ctx, repo, false);
        let didDoc;
        try {
            didDoc = await ctx.idResolver.did.ensureResolve(account.did);
        }
        catch (err) {
            throw new xrpc_server_1.InvalidRequestError(`Could not resolve DID: ${err}`);
        }
        const handle = id.getHandle(didDoc);
        const handleIsCorrect = handle === account.handle;
        const collections = await ctx.actorStore.read(account.did, (store) => store.record.listCollections());
        return {
            encoding: 'application/json',
            body: {
                handle: account.handle ?? syntax_1.INVALID_HANDLE,
                did: account.did,
                didDoc,
                collections,
                handleIsCorrect,
            },
        };
    });
}
//# sourceMappingURL=describeRepo.js.map