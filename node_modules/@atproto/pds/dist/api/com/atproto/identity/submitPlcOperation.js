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
const logger_1 = require("../../../../logger");
function default_1(server, ctx) {
    server.com.atproto.identity.submitPlcOperation({
        auth: ctx.authVerifier.accessStandard(),
        handler: async ({ auth, input }) => {
            const requester = auth.credentials.did;
            const op = input.body.operation;
            if (!common_1.check.is(op, plc.def.operation)) {
                throw new xrpc_server_1.InvalidRequestError('Invalid operation');
            }
            const rotationKey = ctx.cfg.entryway?.plcRotationKey ?? ctx.plcRotationKey.did();
            if (!op.rotationKeys.includes(rotationKey)) {
                throw new xrpc_server_1.InvalidRequestError("Rotation keys do not include server's rotation key");
            }
            if (op.services['atproto_pds']?.type !== 'AtprotoPersonalDataServer') {
                throw new xrpc_server_1.InvalidRequestError('Incorrect type on atproto_pds service');
            }
            if (op.services['atproto_pds']?.endpoint !== ctx.cfg.service.publicUrl) {
                throw new xrpc_server_1.InvalidRequestError('Incorrect endpoint on atproto_pds service');
            }
            const signingKey = await ctx.actorStore.keypair(requester);
            if (op.verificationMethods['atproto'] !== signingKey.did()) {
                throw new xrpc_server_1.InvalidRequestError('Incorrect signing key');
            }
            const account = await ctx.accountManager.getAccount(requester, {
                includeDeactivated: true,
            });
            if (account?.handle &&
                op.alsoKnownAs.at(0) !== `at://${account.handle}`) {
                throw new xrpc_server_1.InvalidRequestError('Incorrect handle in alsoKnownAs');
            }
            await ctx.plcClient.sendOperation(requester, op);
            await ctx.sequencer.sequenceIdentityEvt(requester);
            try {
                await ctx.idResolver.did.resolve(requester, true);
            }
            catch (err) {
                logger_1.httpLogger.error({ err, did: requester }, 'failed to refresh did after plc update');
            }
        },
    });
}
//# sourceMappingURL=submitPlcOperation.js.map