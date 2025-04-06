"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidTokenAndFindDid = exports.assertValidToken = exports.deleteAllEmailTokens = exports.deleteEmailToken = exports.createEmailToken = void 0;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../api/com/atproto/server/util");
const createEmailToken = async (db, did, purpose) => {
    const token = (0, util_1.getRandomToken)().toUpperCase();
    const now = new Date().toISOString();
    await db.executeWithRetry(db.db
        .insertInto('email_token')
        .values({ purpose, did, token, requestedAt: now })
        .onConflict((oc) => oc.columns(['purpose', 'did']).doUpdateSet({ token, requestedAt: now })));
    return token;
};
exports.createEmailToken = createEmailToken;
const deleteEmailToken = async (db, did, purpose) => {
    await db.executeWithRetry(db.db
        .deleteFrom('email_token')
        .where('did', '=', did)
        .where('purpose', '=', purpose));
};
exports.deleteEmailToken = deleteEmailToken;
const deleteAllEmailTokens = async (db, did) => {
    await db.executeWithRetry(db.db.deleteFrom('email_token').where('did', '=', did));
};
exports.deleteAllEmailTokens = deleteAllEmailTokens;
const assertValidToken = async (db, did, purpose, token, expirationLen = 15 * common_1.MINUTE) => {
    const res = await db.db
        .selectFrom('email_token')
        .selectAll()
        .where('purpose', '=', purpose)
        .where('did', '=', did)
        .where('token', '=', token.toUpperCase())
        .executeTakeFirst();
    if (!res) {
        throw new xrpc_server_1.InvalidRequestError('Token is invalid', 'InvalidToken');
    }
    const expired = !(0, common_1.lessThanAgoMs)(new Date(res.requestedAt), expirationLen);
    if (expired) {
        throw new xrpc_server_1.InvalidRequestError('Token is expired', 'ExpiredToken');
    }
};
exports.assertValidToken = assertValidToken;
const assertValidTokenAndFindDid = async (db, purpose, token, expirationLen = 15 * common_1.MINUTE) => {
    const res = await db.db
        .selectFrom('email_token')
        .selectAll()
        .where('purpose', '=', purpose)
        .where('token', '=', token.toUpperCase())
        .executeTakeFirst();
    if (!res) {
        throw new xrpc_server_1.InvalidRequestError('Token is invalid', 'InvalidToken');
    }
    const expired = !(0, common_1.lessThanAgoMs)(new Date(res.requestedAt), expirationLen);
    if (expired) {
        throw new xrpc_server_1.InvalidRequestError('Token is expired', 'ExpiredToken');
    }
    return res.did;
};
exports.assertValidTokenAndFindDid = assertValidTokenAndFindDid;
//# sourceMappingURL=email-token.js.map