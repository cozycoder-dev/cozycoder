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
exports.ConcurrentRefreshError = exports.formatScope = exports.getRefreshTokenId = exports.revokeAppPasswordRefreshToken = exports.revokeRefreshTokensByDid = exports.revokeRefreshToken = exports.addRefreshGracePeriod = exports.deleteExpiredRefreshTokens = exports.getRefreshToken = exports.storeRefreshToken = exports.decodeRefreshToken = exports.createRefreshToken = exports.createAccessToken = exports.createTokens = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const jose = __importStar(require("jose"));
const ui8 = __importStar(require("uint8arrays"));
const crypto = __importStar(require("@atproto/crypto"));
const auth_verifier_1 = require("../../auth-verifier");
const createTokens = async (opts) => {
    const { did, jwtKey, serviceDid, scope, jti, expiresIn } = opts;
    const [accessJwt, refreshJwt] = await Promise.all([
        (0, exports.createAccessToken)({ did, jwtKey, serviceDid, scope, expiresIn }),
        (0, exports.createRefreshToken)({ did, jwtKey, serviceDid, jti, expiresIn }),
    ]);
    return { accessJwt, refreshJwt };
};
exports.createTokens = createTokens;
const createAccessToken = (opts) => {
    const { did, jwtKey, serviceDid, scope = auth_verifier_1.AuthScope.Access, expiresIn = '120mins', } = opts;
    const signer = new jose.SignJWT({ scope })
        .setProtectedHeader({
        typ: 'at+jwt', // https://www.rfc-editor.org/rfc/rfc9068.html
        alg: 'HS256', // only symmetric keys supported
    })
        .setAudience(serviceDid)
        .setSubject(did)
        .setIssuedAt()
        .setExpirationTime(expiresIn);
    return signer.sign(jwtKey);
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (opts) => {
    const { did, jwtKey, serviceDid, jti = (0, exports.getRefreshTokenId)(), expiresIn = '90days', } = opts;
    const signer = new jose.SignJWT({ scope: auth_verifier_1.AuthScope.Refresh })
        .setProtectedHeader({
        typ: 'refresh+jwt',
        alg: 'HS256', // only symmetric keys supported
    })
        .setAudience(serviceDid)
        .setSubject(did)
        .setJti(jti)
        .setIssuedAt()
        .setExpirationTime(expiresIn);
    return signer.sign(jwtKey);
};
exports.createRefreshToken = createRefreshToken;
// @NOTE unsafe for verification, should only be used w/ direct output from createRefreshToken() or createTokens()
const decodeRefreshToken = (jwt) => {
    const token = jose.decodeJwt(jwt);
    node_assert_1.default.ok(token.scope === auth_verifier_1.AuthScope.Refresh, 'not a refresh token');
    return token;
};
exports.decodeRefreshToken = decodeRefreshToken;
const storeRefreshToken = async (db, payload, appPassword) => {
    const [result] = await db.executeWithRetry(db.db
        .insertInto('refresh_token')
        .values({
        id: payload.jti,
        did: payload.sub,
        appPasswordName: appPassword?.name,
        expiresAt: new Date(payload.exp * 1000).toISOString(),
    })
        .onConflict((oc) => oc.doNothing()));
    return result;
};
exports.storeRefreshToken = storeRefreshToken;
const getRefreshToken = async (db, id) => {
    const res = await db.db
        .selectFrom('refresh_token')
        .leftJoin('app_password', (join) => join
        .onRef('app_password.did', '=', 'refresh_token.did')
        .onRef('app_password.name', '=', 'refresh_token.appPasswordName'))
        .where('id', '=', id)
        .selectAll('refresh_token')
        .select('app_password.privileged')
        .executeTakeFirst();
    if (!res)
        return null;
    const { did, expiresAt, appPasswordName, nextId, privileged } = res;
    return {
        id,
        did,
        expiresAt,
        nextId,
        appPassword: appPasswordName
            ? {
                name: appPasswordName,
                privileged: privileged === 1 ? true : false,
            }
            : null,
    };
};
exports.getRefreshToken = getRefreshToken;
const deleteExpiredRefreshTokens = async (db, did, now) => {
    await db.executeWithRetry(db.db
        .deleteFrom('refresh_token')
        .where('did', '=', did)
        .where('expiresAt', '<=', now));
};
exports.deleteExpiredRefreshTokens = deleteExpiredRefreshTokens;
const addRefreshGracePeriod = async (db, opts) => {
    const { id, expiresAt, nextId } = opts;
    const [res] = await db.executeWithRetry(db.db
        .updateTable('refresh_token')
        .where('id', '=', id)
        .where((inner) => inner.where('nextId', 'is', null).orWhere('nextId', '=', nextId))
        .set({ expiresAt, nextId })
        .returningAll());
    if (!res) {
        throw new ConcurrentRefreshError();
    }
};
exports.addRefreshGracePeriod = addRefreshGracePeriod;
const revokeRefreshToken = async (db, id) => {
    const [{ numDeletedRows }] = await db.executeWithRetry(db.db.deleteFrom('refresh_token').where('id', '=', id));
    return numDeletedRows > 0;
};
exports.revokeRefreshToken = revokeRefreshToken;
const revokeRefreshTokensByDid = async (db, did) => {
    const [{ numDeletedRows }] = await db.executeWithRetry(db.db.deleteFrom('refresh_token').where('did', '=', did));
    return numDeletedRows > 0;
};
exports.revokeRefreshTokensByDid = revokeRefreshTokensByDid;
const revokeAppPasswordRefreshToken = async (db, did, appPassName) => {
    const [{ numDeletedRows }] = await db.executeWithRetry(db.db
        .deleteFrom('refresh_token')
        .where('did', '=', did)
        .where('appPasswordName', '=', appPassName));
    return numDeletedRows > 0;
};
exports.revokeAppPasswordRefreshToken = revokeAppPasswordRefreshToken;
const getRefreshTokenId = () => {
    return ui8.toString(crypto.randomBytes(32), 'base64');
};
exports.getRefreshTokenId = getRefreshTokenId;
const formatScope = (appPassword, isSoftDeleted) => {
    if (isSoftDeleted)
        return auth_verifier_1.AuthScope.Takendown;
    if (!appPassword)
        return auth_verifier_1.AuthScope.Access;
    return appPassword.privileged
        ? auth_verifier_1.AuthScope.AppPassPrivileged
        : auth_verifier_1.AuthScope.AppPass;
};
exports.formatScope = formatScope;
class ConcurrentRefreshError extends Error {
}
exports.ConcurrentRefreshError = ConcurrentRefreshError;
//# sourceMappingURL=auth.js.map