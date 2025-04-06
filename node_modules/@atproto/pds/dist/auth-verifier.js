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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicKeyObject = exports.createSecretKeyObject = exports.parseBasicAuth = exports.parseAuthorizationHeader = exports.AuthVerifier = exports.RoleStatus = exports.AuthScope = void 0;
const node_crypto_1 = require("node:crypto");
const jose = __importStar(require("jose"));
const key_encoder_1 = __importDefault(require("key-encoder"));
const common_1 = require("@atproto/common");
const identity_1 = require("@atproto/identity");
const oauth_provider_1 = require("@atproto/oauth-provider");
const xrpc_server_1 = require("@atproto/xrpc-server");
const db_1 = require("./db");
// @TODO sync-up with current method names, consider backwards compat.
var AuthScope;
(function (AuthScope) {
    AuthScope["Access"] = "com.atproto.access";
    AuthScope["Refresh"] = "com.atproto.refresh";
    AuthScope["AppPass"] = "com.atproto.appPass";
    AuthScope["AppPassPrivileged"] = "com.atproto.appPassPrivileged";
    AuthScope["SignupQueued"] = "com.atproto.signupQueued";
    AuthScope["Takendown"] = "com.atproto.takendown";
})(AuthScope || (exports.AuthScope = AuthScope = {}));
var RoleStatus;
(function (RoleStatus) {
    RoleStatus[RoleStatus["Valid"] = 0] = "Valid";
    RoleStatus[RoleStatus["Invalid"] = 1] = "Invalid";
    RoleStatus[RoleStatus["Missing"] = 2] = "Missing";
})(RoleStatus || (exports.RoleStatus = RoleStatus = {}));
class AuthVerifier {
    constructor(accountManager, idResolver, oauthVerifier, opts) {
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accountManager
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: idResolver
        });
        Object.defineProperty(this, "oauthVerifier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: oauthVerifier
        });
        Object.defineProperty(this, "_publicUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_jwtKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_adminPass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // verifiers (arrow fns to preserve scope)
        Object.defineProperty(this, "accessStandard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (opts = {}) => (ctx) => {
                return this.validateAccessToken(ctx, [
                    AuthScope.Access,
                    AuthScope.AppPassPrivileged,
                    AuthScope.AppPass,
                    ...(opts.additional ?? []),
                ], opts);
            }
        });
        Object.defineProperty(this, "accessFull", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (opts = {}) => (ctx) => {
                return this.validateAccessToken(ctx, [AuthScope.Access, ...(opts.additional ?? [])], opts);
            }
        });
        Object.defineProperty(this, "accessPrivileged", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (opts = {}) => (ctx) => {
                return this.validateAccessToken(ctx, [
                    AuthScope.Access,
                    AuthScope.AppPassPrivileged,
                    ...(opts.additional ?? []),
                ]);
            }
        });
        Object.defineProperty(this, "refresh", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                const { did, scope, token, tokenId, audience } = await this.validateRefreshToken(ctx);
                return {
                    credentials: {
                        type: 'refresh',
                        did,
                        scope,
                        audience,
                        tokenId,
                    },
                    artifacts: token,
                };
            }
        });
        Object.defineProperty(this, "refreshExpired", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                const { did, scope, token, tokenId, audience } = await this.validateRefreshToken(ctx, { clockTolerance: Infinity });
                return {
                    credentials: {
                        type: 'refresh',
                        did,
                        scope,
                        audience,
                        tokenId,
                    },
                    artifacts: token,
                };
            }
        });
        Object.defineProperty(this, "adminToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                this.setAuthHeaders(ctx);
                return this.validateAdminToken(ctx);
            }
        });
        Object.defineProperty(this, "optionalAccessOrAdminToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (opts = {}) => async (ctx) => {
                if (isAccessToken(ctx.req)) {
                    return await this.accessStandard(opts)(ctx);
                }
                else if (isBasicToken(ctx.req)) {
                    return await this.adminToken(ctx);
                }
                else {
                    return this.null(ctx);
                }
            }
        });
        Object.defineProperty(this, "userServiceAuth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                const payload = await this.verifyServiceJwt(ctx, {
                    aud: null,
                    iss: null,
                });
                if (payload.aud !== this.dids.pds &&
                    (!this.dids.entryway || payload.aud !== this.dids.entryway)) {
                    throw new xrpc_server_1.AuthRequiredError('jwt audience does not match service did', 'BadJwtAudience');
                }
                return {
                    credentials: {
                        type: 'user_service_auth',
                        aud: payload.aud,
                        did: payload.iss,
                    },
                };
            }
        });
        Object.defineProperty(this, "userServiceAuthOptional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                if (isBearerToken(ctx.req)) {
                    return await this.userServiceAuth(ctx);
                }
                else {
                    return this.null(ctx);
                }
            }
        });
        Object.defineProperty(this, "accessOrUserServiceAuth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (opts = {}) => async (ctx) => {
                const token = bearerTokenFromReq(ctx.req);
                if (token) {
                    const payload = jose.decodeJwt(token);
                    if (payload['lxm']) {
                        return this.userServiceAuth(ctx);
                    }
                }
                return this.accessStandard(opts)(ctx);
            }
        });
        Object.defineProperty(this, "modService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                if (!this.dids.modService) {
                    throw new xrpc_server_1.AuthRequiredError('Untrusted issuer', 'UntrustedIss');
                }
                const payload = await this.verifyServiceJwt(ctx, {
                    aud: null,
                    iss: [this.dids.modService, `${this.dids.modService}#atproto_labeler`],
                });
                if (payload.aud !== this.dids.pds &&
                    (!this.dids.entryway || payload.aud !== this.dids.entryway)) {
                    throw new xrpc_server_1.AuthRequiredError('jwt audience does not match service did', 'BadJwtAudience');
                }
                return {
                    credentials: {
                        type: 'mod_service',
                        aud: payload.aud,
                        iss: payload.iss,
                    },
                };
            }
        });
        Object.defineProperty(this, "moderator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                if (isBearerToken(ctx.req)) {
                    return this.modService(ctx);
                }
                else {
                    return this.adminToken(ctx);
                }
            }
        });
        this._publicUrl = opts.publicUrl;
        this._jwtKey = opts.jwtKey;
        this._adminPass = opts.adminPass;
        this.dids = opts.dids;
    }
    async validateAdminToken({ req, }) {
        const parsed = (0, exports.parseBasicAuth)(req.headers.authorization);
        if (!parsed) {
            throw new xrpc_server_1.AuthRequiredError();
        }
        const { username, password } = parsed;
        if (username !== 'admin' || password !== this._adminPass) {
            throw new xrpc_server_1.AuthRequiredError();
        }
        return { credentials: { type: 'admin_token' } };
    }
    async validateRefreshToken(ctx, verifyOptions) {
        const result = await this.validateBearerToken(ctx, [AuthScope.Refresh], {
            ...verifyOptions,
            typ: 'refresh+jwt',
            // when using entryway, proxying refresh credentials
            audience: this.dids.entryway ? this.dids.entryway : this.dids.pds,
        });
        const tokenId = result.payload.jti;
        if (!tokenId) {
            throw new xrpc_server_1.AuthRequiredError('Unexpected missing refresh token id', 'MissingTokenId');
        }
        return { ...result, tokenId };
    }
    async validateBearerToken(ctx, scopes, verifyOptions) {
        this.setAuthHeaders(ctx);
        const token = bearerTokenFromReq(ctx.req);
        if (!token) {
            throw new xrpc_server_1.AuthRequiredError(undefined, 'AuthMissing');
        }
        const { payload, protectedHeader } = await this.jwtVerify(token, 
        // @TODO: Once all access & refresh tokens have a "typ" claim (i.e. 90
        // days after this code was deployed), replace the following line with
        // "verifyOptions," (to re-enable the verification of the "typ" property
        // from verifyJwt()). Once the change is made, the "if" block below that
        // checks for "typ" can be removed.
        {
            ...verifyOptions,
            typ: undefined,
        });
        // @TODO: remove the next check once all access & refresh tokens have "typ"
        // Note: when removing the check, make sure that the "verifyOptions"
        // contains the "typ" property, so that the token is verified correctly by
        // this.verifyJwt()
        if (protectedHeader.typ && verifyOptions.typ !== protectedHeader.typ) {
            // Temporarily allow historical tokens without "typ" to pass through. See:
            // createAccessToken() and createRefreshToken() in
            // src/account-manager/helpers/auth.ts
            throw new xrpc_server_1.InvalidRequestError('Invalid token type', 'InvalidToken');
        }
        const { sub, aud, scope } = payload;
        if (typeof sub !== 'string' || !sub.startsWith('did:')) {
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (aud !== undefined &&
            (typeof aud !== 'string' || !aud.startsWith('did:'))) {
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (payload['cnf'] !== undefined) {
            // Proof-of-Possession (PoP) tokens are not allowed here
            // https://www.rfc-editor.org/rfc/rfc7800.html
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (!isAuthScope(scope) || (scopes.length > 0 && !scopes.includes(scope))) {
            throw new xrpc_server_1.InvalidRequestError('Bad token scope', 'InvalidToken');
        }
        return {
            did: sub,
            scope,
            audience: aud,
            token,
            payload,
        };
    }
    async validateAccessToken(ctx, scopes, { checkTakedown = false, checkDeactivated = false, } = {}) {
        this.setAuthHeaders(ctx);
        let accessOutput;
        const [type] = (0, exports.parseAuthorizationHeader)(ctx.req.headers.authorization);
        switch (type) {
            case AuthType.BEARER: {
                accessOutput = await this.validateBearerAccessToken(ctx, scopes);
                break;
            }
            case AuthType.DPOP: {
                accessOutput = await this.validateDpopAccessToken(ctx, scopes);
                break;
            }
            case null:
                throw new xrpc_server_1.AuthRequiredError(undefined, 'AuthMissing');
            default:
                throw new xrpc_server_1.InvalidRequestError('Unexpected authorization type', 'InvalidToken');
        }
        if (checkTakedown || checkDeactivated) {
            const found = await this.accountManager.getAccount(accessOutput.credentials.did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!found) {
                // will be turned into ExpiredToken for the client if proxied by entryway
                throw new xrpc_server_1.ForbiddenError('Account not found', 'AccountNotFound');
            }
            if (checkTakedown && (0, db_1.softDeleted)(found)) {
                throw new xrpc_server_1.AuthRequiredError('Account has been taken down', 'AccountTakedown');
            }
            if (checkDeactivated && found.deactivatedAt) {
                throw new xrpc_server_1.AuthRequiredError('Account is deactivated', 'AccountDeactivated');
            }
        }
        return accessOutput;
    }
    async validateDpopAccessToken(ctx, scopes) {
        this.setAuthHeaders(ctx);
        const { req } = ctx;
        const res = 'res' in ctx ? ctx.res : null;
        // https://datatracker.ietf.org/doc/html/rfc9449#section-8.2
        if (res) {
            const dpopNonce = this.oauthVerifier.nextDpopNonce();
            if (dpopNonce) {
                res.setHeader('DPoP-Nonce', dpopNonce);
                res.appendHeader('Access-Control-Expose-Headers', 'DPoP-Nonce');
            }
        }
        try {
            const originalUrl = ('originalUrl' in req && req.originalUrl) || req.url || '/';
            const url = new URL(originalUrl, this._publicUrl);
            const result = await this.oauthVerifier.authenticateRequest(req.method || 'GET', url, req.headers, { audience: [this.dids.pds] });
            const { sub } = result.claims;
            if (typeof sub !== 'string' || !sub.startsWith('did:')) {
                throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
            }
            const tokenScopes = new Set(result.claims.scope?.split(' '));
            if (!tokenScopes.has('transition:generic')) {
                throw new xrpc_server_1.AuthRequiredError('Missing required scope: transition:generic', 'InvalidToken');
            }
            const scopeEquivalent = tokenScopes.has('transition:chat.bsky')
                ? AuthScope.AppPassPrivileged
                : AuthScope.AppPass;
            if (!scopes.includes(scopeEquivalent)) {
                // AppPassPrivileged is sufficient but was not provided "transition:chat.bsky"
                if (scopes.includes(AuthScope.AppPassPrivileged)) {
                    throw new xrpc_server_1.InvalidRequestError('Missing required scope: transition:chat.bsky', 'InvalidToken');
                }
                // AuthScope.Access and AuthScope.SignupQueued do not have an OAuth
                // scope equivalent.
                throw new xrpc_server_1.InvalidRequestError('DPoP access token cannot be used for this request', 'InvalidToken');
            }
            const isPrivileged = [
                AuthScope.Access,
                AuthScope.AppPassPrivileged,
            ].includes(scopeEquivalent);
            return {
                credentials: {
                    type: 'access',
                    did: result.claims.sub,
                    scope: scopeEquivalent,
                    audience: this.dids.pds,
                    isPrivileged,
                },
                artifacts: result.token,
            };
        }
        catch (err) {
            // Make sure to include any WWW-Authenticate header in the response
            // (particularly useful for DPoP's "use_dpop_nonce" error)
            if (res && err instanceof oauth_provider_1.WWWAuthenticateError) {
                res.setHeader('WWW-Authenticate', err.wwwAuthenticateHeader);
                res.appendHeader('Access-Control-Expose-Headers', 'WWW-Authenticate');
            }
            if (err instanceof oauth_provider_1.OAuthError) {
                throw new xrpc_server_1.XRPCError(err.status, err.error_description, err.error);
            }
            throw err;
        }
    }
    async validateBearerAccessToken(ctx, scopes) {
        const { did, scope, token, audience } = await this.validateBearerToken(ctx, scopes, { audience: this.dids.pds, typ: 'at+jwt' });
        const isPrivileged = [
            AuthScope.Access,
            AuthScope.AppPassPrivileged,
        ].includes(scope);
        return {
            credentials: {
                type: 'access',
                did,
                scope,
                audience,
                isPrivileged,
            },
            artifacts: token,
        };
    }
    async verifyServiceJwt(ctx, opts) {
        this.setAuthHeaders(ctx);
        const getSigningKey = async (iss, forceRefresh) => {
            if (opts.iss !== null && !opts.iss.includes(iss)) {
                throw new xrpc_server_1.AuthRequiredError('Untrusted issuer', 'UntrustedIss');
            }
            const [did, serviceId] = iss.split('#');
            const keyId = serviceId === 'atproto_labeler' ? 'atproto_label' : 'atproto';
            const didDoc = await this.idResolver.did.resolve(did, forceRefresh);
            if (!didDoc) {
                throw new xrpc_server_1.AuthRequiredError('could not resolve iss did');
            }
            const parsedKey = (0, common_1.getVerificationMaterial)(didDoc, keyId);
            if (!parsedKey) {
                throw new xrpc_server_1.AuthRequiredError('missing or bad key in did doc');
            }
            const didKey = (0, identity_1.getDidKeyFromMultibase)(parsedKey);
            if (!didKey) {
                throw new xrpc_server_1.AuthRequiredError('missing or bad key in did doc');
            }
            return didKey;
        };
        const jwtStr = bearerTokenFromReq(ctx.req);
        if (!jwtStr) {
            throw new xrpc_server_1.AuthRequiredError('missing jwt', 'MissingJwt');
        }
        const nsid = (0, xrpc_server_1.parseReqNsid)(ctx.req);
        const payload = await (0, xrpc_server_1.verifyJwt)(jwtStr, opts.aud, nsid, getSigningKey);
        return { iss: payload.iss, aud: payload.aud };
    }
    null(ctx) {
        this.setAuthHeaders(ctx);
        return {
            credentials: null,
        };
    }
    isUserOrAdmin(auth, did) {
        if (!auth.credentials) {
            return false;
        }
        else if (auth.credentials.type === 'admin_token') {
            return true;
        }
        else {
            return auth.credentials.did === did;
        }
    }
    async jwtVerify(token, verifyOptions) {
        try {
            return await jose.jwtVerify(token, this._jwtKey, verifyOptions);
        }
        catch (err) {
            if (err?.['code'] === 'ERR_JWT_EXPIRED') {
                throw new xrpc_server_1.InvalidRequestError('Token has expired', 'ExpiredToken');
            }
            throw new xrpc_server_1.InvalidRequestError('Token could not be verified', 'InvalidToken');
        }
    }
    setAuthHeaders(ctx) {
        const res = 'res' in ctx ? ctx.res : null;
        if (res) {
            res.setHeader('Cache-Control', 'private');
            vary(res, 'Authorization');
        }
    }
}
exports.AuthVerifier = AuthVerifier;
// HELPERS
// ---------
var AuthType;
(function (AuthType) {
    AuthType["BASIC"] = "Basic";
    AuthType["BEARER"] = "Bearer";
    AuthType["DPOP"] = "DPoP";
})(AuthType || (AuthType = {}));
const parseAuthorizationHeader = (authorization) => {
    if (!authorization)
        return [null];
    const result = authorization.split(' ');
    if (result.length !== 2) {
        throw new xrpc_server_1.InvalidRequestError('Malformed authorization header', 'InvalidToken');
    }
    // authorization type is case-insensitive
    const authType = result[0].toUpperCase();
    const type = Object.hasOwn(AuthType, authType) ? AuthType[authType] : null;
    if (type)
        return [type, result[1]];
    throw new xrpc_server_1.InvalidRequestError(`Unsupported authorization type: ${result[0]}`, 'InvalidToken');
};
exports.parseAuthorizationHeader = parseAuthorizationHeader;
const isAccessToken = (req) => {
    const [type] = (0, exports.parseAuthorizationHeader)(req.headers.authorization);
    return type === AuthType.BEARER || type === AuthType.DPOP;
};
const isBearerToken = (req) => {
    const [type] = (0, exports.parseAuthorizationHeader)(req.headers.authorization);
    return type === AuthType.BEARER;
};
const isBasicToken = (req) => {
    const [type] = (0, exports.parseAuthorizationHeader)(req.headers.authorization);
    return type === AuthType.BASIC;
};
const bearerTokenFromReq = (req) => {
    const [type, token] = (0, exports.parseAuthorizationHeader)(req.headers.authorization);
    return type === AuthType.BEARER ? token : null;
};
const parseBasicAuth = (authorizationHeader) => {
    try {
        const [type, b64] = (0, exports.parseAuthorizationHeader)(authorizationHeader);
        if (type !== AuthType.BASIC)
            return null;
        const decoded = Buffer.from(b64, 'base64').toString('utf8');
        // We must not use split(':') because the password can contain colons
        const colon = decoded.indexOf(':');
        if (colon === -1)
            return null;
        const username = decoded.slice(0, colon);
        const password = decoded.slice(colon + 1);
        return { username, password };
    }
    catch (err) {
        return null;
    }
};
exports.parseBasicAuth = parseBasicAuth;
const authScopes = new Set(Object.values(AuthScope));
const isAuthScope = (val) => {
    return authScopes.has(val);
};
const createSecretKeyObject = (secret) => {
    return (0, node_crypto_1.createSecretKey)(Buffer.from(secret));
};
exports.createSecretKeyObject = createSecretKeyObject;
const createPublicKeyObject = (publicKeyHex) => {
    const key = keyEncoder.encodePublic(publicKeyHex, 'raw', 'pem');
    return (0, node_crypto_1.createPublicKey)({ format: 'pem', key });
};
exports.createPublicKeyObject = createPublicKeyObject;
const keyEncoder = new key_encoder_1.default('secp256k1');
function vary(res, value) {
    const current = res.getHeader('Vary');
    if (current == null || typeof current === 'number') {
        res.setHeader('Vary', value);
    }
    else {
        const alreadyIncluded = Array.isArray(current)
            ? current.some((value) => value.includes(value))
            : current.includes(value);
        if (!alreadyIncluded) {
            res.appendHeader('Vary', value);
        }
    }
}
//# sourceMappingURL=auth-verifier.js.map