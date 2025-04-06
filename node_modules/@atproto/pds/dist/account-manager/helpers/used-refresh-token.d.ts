import { RefreshToken } from '@atproto/oauth-provider';
import { AccountDb } from '../db';
/**
 * Note that the used refresh tokens will be removed once the token is revoked.
 * This is done through the foreign key constraint in the database.
 */
export declare const insertQB: (db: AccountDb, tokenId: number, refreshToken: RefreshToken) => import("kysely").InsertQueryBuilder<import("../db").DatabaseSchema, "used_refresh_token", import("kysely").InsertResult>;
export declare const findByTokenQB: (db: AccountDb, refreshToken: RefreshToken) => import("kysely/dist/cjs/parser/select-parser").QueryBuilderWithSelection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "used_refresh_token">, "used_refresh_token", {}, "tokenId">;
export declare const countQB: (db: AccountDb, refreshToken: RefreshToken) => import("kysely/dist/cjs/parser/select-parser").QueryBuilderWithSelection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "used_refresh_token">, "used_refresh_token", {}, (qb: import("kysely").ExpressionBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "used_refresh_token">, "used_refresh_token">) => import("kysely").AliasedAggregateFunctionBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "used_refresh_token">, "used_refresh_token", number, "count">>;
//# sourceMappingURL=used-refresh-token.d.ts.map