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
const plc = __importStar(require("@did-plc/lib"));
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
const proxy_1 = require("../../../proxy");
function default_1(server, ctx) {
    server.com.atproto.identity.signPlcOperation({
        auth: ctx.authVerifier.accessFull(),
        handler: async ({ auth, input, req }) => {
            if (ctx.entrywayAgent) {
                return (0, proxy_1.resultPassthru)(await ctx.entrywayAgent.com.atproto.identity.signPlcOperation(input.body, await ctx.entrywayAuthHeaders(req, auth.credentials.did, lexicons_1.ids.ComAtprotoIdentitySignPlcOperation)));
            }
            const did = auth.credentials.did;
            const { token } = input.body;
            if (!token) {
                throw new xrpc_server_1.InvalidRequestError('email confirmation token required to sign PLC operations');
            }
            await ctx.accountManager.assertValidEmailTokenAndCleanup(did, 'plc_operation', token);
            const lastOp = await ctx.plcClient.getLastOp(did);
            if (common_1.check.is(lastOp, plc.def.tombstone)) {
                throw new xrpc_server_1.InvalidRequestError('Did is tombstoned');
            }
            const operation = await plc.createUpdateOp(lastOp, ctx.plcRotationKey, (lastOp) => ({
                ...lastOp,
                rotationKeys: input.body.rotationKeys ?? lastOp.rotationKeys,
                alsoKnownAs: input.body.alsoKnownAs ?? lastOp.alsoKnownAs,
                verificationMethods: 
                // @TODO: actually validate instead of type casting
                input.body.verificationMethods ?? lastOp.verificationMethods,
                services: 
                // @TODO: actually validate instead of type casting
                input.body.services ??
                    lastOp.services,
            }));
            return {
                encoding: 'application/json',
                body: {
                    operation,
                },
            };
        },
    });
}
//# sourceMappingURL=signPlcOperation.js.map