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
exports.assertValidDidDocumentForService = exports.isValidDidDocForService = exports.didDocForSession = exports.safeResolveDidDoc = exports.getRandomToken = exports.genInvCodes = exports.genInvCode = void 0;
const common_1 = require("@atproto/common");
const crypto = __importStar(require("@atproto/crypto"));
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../../../../logger");
// generate an invite code preceded by the hostname
// with '.'s replaced by '-'s so it is not mistakable for a link
// ex: bsky-app-abc23-567xy
// regex: bsky-app-[a-z2-7]{5}-[a-z2-7]{5}
const genInvCode = (cfg) => {
    return cfg.service.hostname.replaceAll('.', '-') + '-' + (0, exports.getRandomToken)();
};
exports.genInvCode = genInvCode;
const genInvCodes = (cfg, count) => {
    const codes = [];
    for (let i = 0; i < count; i++) {
        codes.push((0, exports.genInvCode)(cfg));
    }
    return codes;
};
exports.genInvCodes = genInvCodes;
// Formatted xxxxx-xxxxx where digits are in base32
const getRandomToken = () => {
    const token = crypto.randomStr(8, 'base32').slice(0, 10);
    return token.slice(0, 5) + '-' + token.slice(5, 10);
};
exports.getRandomToken = getRandomToken;
const safeResolveDidDoc = async (ctx, did, forceRefresh) => {
    try {
        const didDoc = await ctx.idResolver.did.resolve(did, forceRefresh);
        return didDoc ?? undefined;
    }
    catch (err) {
        logger_1.httpLogger.warn({ err, did }, 'failed to resolve did doc');
    }
};
exports.safeResolveDidDoc = safeResolveDidDoc;
const didDocForSession = async (ctx, did, forceRefresh) => {
    if (!ctx.cfg.identity.enableDidDocWithSession)
        return;
    return (0, exports.safeResolveDidDoc)(ctx, did, forceRefresh);
};
exports.didDocForSession = didDocForSession;
const isValidDidDocForService = async (ctx, did) => {
    try {
        await (0, exports.assertValidDidDocumentForService)(ctx, did);
        return true;
    }
    catch {
        return false;
    }
};
exports.isValidDidDocForService = isValidDidDocForService;
const assertValidDidDocumentForService = async (ctx, did) => {
    if (did.startsWith('did:plc')) {
        const resolved = await ctx.plcClient.getDocumentData(did);
        await assertValidDocContents(ctx, did, {
            pdsEndpoint: resolved.services['atproto_pds']?.endpoint,
            signingKey: resolved.verificationMethods['atproto'],
            rotationKeys: resolved.rotationKeys,
        });
    }
    else {
        const resolved = await ctx.idResolver.did.resolve(did, true);
        if (!resolved) {
            throw new xrpc_server_1.InvalidRequestError('Could not resolve DID');
        }
        await assertValidDocContents(ctx, did, {
            pdsEndpoint: (0, common_1.getPdsEndpoint)(resolved),
            signingKey: (0, common_1.getSigningDidKey)(resolved),
        });
    }
};
exports.assertValidDidDocumentForService = assertValidDidDocumentForService;
const assertValidDocContents = async (ctx, did, contents) => {
    const { signingKey, pdsEndpoint, rotationKeys } = contents;
    const plcRotationKey = ctx.cfg.entryway?.plcRotationKey ?? ctx.plcRotationKey.did();
    if (rotationKeys !== undefined && !rotationKeys.includes(plcRotationKey)) {
        throw new xrpc_server_1.InvalidRequestError('Server rotation key not included in PLC DID data');
    }
    if (!pdsEndpoint || pdsEndpoint !== ctx.cfg.service.publicUrl) {
        throw new xrpc_server_1.InvalidRequestError('DID document atproto_pds service endpoint does not match PDS public url');
    }
    const keypair = await ctx.actorStore.keypair(did);
    if (!signingKey || signingKey !== keypair.did()) {
        throw new xrpc_server_1.InvalidRequestError('DID document verification method does not match expected signing key');
    }
};
//# sourceMappingURL=util.js.map