"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQB = exports.rotateQB = exports.removeByDidQB = exports.findByQB = exports.forRotateQB = exports.createQB = exports.toTokenInfo = void 0;
const db_1 = require("../../db");
const account_1 = require("./account");
const device_account_1 = require("./device-account");
const toTokenInfo = (row, audience) => ({
    id: row.tokenId,
    data: {
        createdAt: (0, db_1.fromDateISO)(row.createdAt),
        expiresAt: (0, db_1.fromDateISO)(row.expiresAt),
        updatedAt: (0, db_1.fromDateISO)(row.updatedAt),
        clientId: row.clientId,
        clientAuth: (0, db_1.fromJsonObject)(row.clientAuth),
        deviceId: row.deviceId,
        sub: row.did,
        parameters: (0, db_1.fromJsonObject)(row.parameters),
        details: row.details
            ? (0, db_1.fromJsonArray)(row.details)
            : null,
        code: row.code,
    },
    account: (0, device_account_1.toAccount)(row, audience),
    info: row.authenticatedAt != null &&
        row.authorizedClients != null &&
        row.remember != null
        ? (0, device_account_1.toDeviceAccountInfo)(row)
        : undefined,
    currentRefreshToken: row.currentRefreshToken,
});
exports.toTokenInfo = toTokenInfo;
const selectTokenInfoQB = (db) => (0, account_1.selectAccountQB)(db, { includeDeactivated: true })
    // uses "token_did_idx" index (though unlikely in practice)
    .innerJoin('token', 'token.did', 'actor.did')
    .leftJoin('device_account', (join) => join
    // uses "device_account_pk" index
    .on('device_account.did', '=', 'token.did')
    // @ts-expect-error "deviceId" is nullable in token
    .on('device_account.deviceId', '=', 'token.deviceId'))
    .select([
    'token.tokenId',
    'token.createdAt',
    'token.updatedAt',
    'token.expiresAt',
    'token.clientId',
    'token.clientAuth',
    'token.deviceId',
    'token.did',
    'token.parameters',
    'token.details',
    'token.code',
    'token.currentRefreshToken',
    'device_account.authenticatedAt',
    'device_account.authorizedClients',
    'device_account.remember',
]);
const createQB = (db, tokenId, data, refreshToken) => db.db.insertInto('token').values({
    tokenId,
    createdAt: (0, db_1.toDateISO)(data.createdAt),
    expiresAt: (0, db_1.toDateISO)(data.expiresAt),
    updatedAt: (0, db_1.toDateISO)(data.updatedAt),
    clientId: data.clientId,
    clientAuth: (0, db_1.toJsonObject)(data.clientAuth),
    deviceId: data.deviceId,
    did: data.sub,
    parameters: (0, db_1.toJsonObject)(data.parameters),
    details: data.details ? (0, db_1.toJsonArray)(data.details) : null,
    code: data.code,
    currentRefreshToken: refreshToken || null,
});
exports.createQB = createQB;
const forRotateQB = (db, id) => db.db
    .selectFrom('token')
    .where('tokenId', '=', id)
    .where('currentRefreshToken', 'is not', null)
    .select(['id', 'currentRefreshToken']);
exports.forRotateQB = forRotateQB;
const findByQB = (db, search) => {
    if (search.id === undefined &&
        search.code === undefined &&
        search.tokenId === undefined &&
        search.currentRefreshToken === undefined) {
        // Prevent accidental scan
        throw new TypeError('At least one search parameter is required');
    }
    return selectTokenInfoQB(db)
        .if(search.id !== undefined, (qb) => 
    // uses primary key index
    qb.where('token.id', '=', search.id))
        .if(search.code !== undefined, (qb) => 
    // uses "token_code_idx" partial index (hence the null check)
    qb
        .where('token.code', '=', search.code)
        .where('token.code', 'is not', null))
        .if(search.tokenId !== undefined, (qb) => 
    // uses "token_token_id_idx"
    qb.where('token.tokenId', '=', search.tokenId))
        .if(search.currentRefreshToken !== undefined, (qb) => 
    // uses "token_refresh_token_unique_idx"
    qb.where('token.currentRefreshToken', '=', search.currentRefreshToken));
};
exports.findByQB = findByQB;
const removeByDidQB = (db, did) => 
// uses "token_did_idx" index
db.db.deleteFrom('token').where('did', '=', did);
exports.removeByDidQB = removeByDidQB;
const rotateQB = (db, id, newTokenId, newRefreshToken, newData) => db.db
    .updateTable('token')
    .set({
    tokenId: newTokenId,
    currentRefreshToken: newRefreshToken,
    expiresAt: (0, db_1.toDateISO)(newData.expiresAt),
    updatedAt: (0, db_1.toDateISO)(newData.updatedAt),
    clientAuth: (0, db_1.toJsonObject)(newData.clientAuth),
})
    // uses primary key index
    .where('id', '=', id);
exports.rotateQB = rotateQB;
const removeQB = (db, tokenId) => 
// uses "used_refresh_token_fk" to cascade delete
db.db.deleteFrom('token').where('tokenId', '=', tokenId);
exports.removeQB = removeQB;
//# sourceMappingURL=token.js.map