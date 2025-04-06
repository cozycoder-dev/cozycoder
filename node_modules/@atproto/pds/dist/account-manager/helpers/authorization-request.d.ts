import { Selectable } from 'kysely';
import { Code, FoundRequestResult, RequestData, RequestId, UpdateRequestData } from '@atproto/oauth-provider';
import { AccountDb, AuthorizationRequest } from '../db';
export declare const rowToRequestData: (row: Selectable<AuthorizationRequest>) => RequestData;
export declare const rowToFoundRequestResult: (row: Selectable<AuthorizationRequest>) => FoundRequestResult;
export declare const createQB: (db: AccountDb, id: RequestId, data: RequestData) => import("kysely").InsertQueryBuilder<import("../db").DatabaseSchema, "authorization_request", import("kysely").InsertResult>;
export declare const readQB: (db: AccountDb, id: RequestId) => import("kysely/dist/cjs/parser/select-parser").SelectAllQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "authorization_request">, "authorization_request", {}, "authorization_request">;
export declare const updateQB: (db: AccountDb, id: RequestId, { code, sub, deviceId, expiresAt }: UpdateRequestData) => import("kysely").UpdateQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "authorization_request">, "authorization_request", "authorization_request", import("kysely").UpdateResult>;
export declare const removeOldExpiredQB: (db: AccountDb, delay?: number) => import("kysely").DeleteQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "authorization_request">, "authorization_request", import("kysely").DeleteResult>;
export declare const removeByIdQB: (db: AccountDb, id: RequestId) => import("kysely").DeleteQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "authorization_request">, "authorization_request", import("kysely").DeleteResult>;
export declare const findByCodeQB: (db: AccountDb, code: Code) => import("kysely/dist/cjs/parser/select-parser").SelectAllQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "authorization_request">, "authorization_request", {}, "authorization_request">;
//# sourceMappingURL=authorization-request.d.ts.map