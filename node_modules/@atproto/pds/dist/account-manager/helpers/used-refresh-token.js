"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countQB = exports.findByTokenQB = exports.insertQB = void 0;
/**
 * Note that the used refresh tokens will be removed once the token is revoked.
 * This is done through the foreign key constraint in the database.
 */
const insertQB = (db, tokenId, refreshToken) => db.db
    .insertInto('used_refresh_token')
    .values({ tokenId, refreshToken })
    .onConflict((oc) => oc.doNothing());
exports.insertQB = insertQB;
const findByTokenQB = (db, refreshToken) => db.db
    .selectFrom('used_refresh_token')
    // uses primary key index
    .where('refreshToken', '=', refreshToken)
    .select('tokenId');
exports.findByTokenQB = findByTokenQB;
const countQB = (db, refreshToken) => db.db
    .selectFrom('used_refresh_token')
    // uses primary key index
    .where('refreshToken', '=', refreshToken)
    .select((qb) => qb.fn.count('refreshToken').as('count'));
exports.countQB = countQB;
//# sourceMappingURL=used-refresh-token.js.map