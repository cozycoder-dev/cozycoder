import { AccountDb } from '../db';
export declare const createInviteCodes: (db: AccountDb, toCreate: {
    account: string;
    codes: string[];
}[], useCount: number) => Promise<void>;
export declare const createAccountInviteCodes: (db: AccountDb, forAccount: string, codes: string[], expectedTotal: number, disabled: 0 | 1) => Promise<CodeDetail[]>;
export declare const recordInviteUse: (db: AccountDb, opts: {
    did: string;
    inviteCode: string | undefined;
    now: string;
}) => Promise<void>;
export declare const ensureInviteIsAvailable: (db: AccountDb, inviteCode: string) => Promise<void>;
export declare const selectInviteCodesQb: (db: AccountDb) => import("kysely/dist/cjs/parser/select-parser").SelectAllQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code">, "invite_code", import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code">, "invite_code", "invite_code.code as code" | "invite_code.availableUses as available" | "invite_code.disabled as disabled" | "invite_code.forAccount as forAccount" | "invite_code.createdBy as createdBy" | "invite_code.createdAt as createdAt" | import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code_use">, "invite_code_use", import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code_use">, "invite_code_use", import("kysely").AliasedRawBuilder<number, "count">>, "uses">>, "codes">>, "codes", {}, "codes">;
export declare const getAccountsInviteCodes: (db: AccountDb, dids: string[]) => Promise<Map<string, CodeDetail[]>>;
export declare const getInviteCodesUses: (db: AccountDb, codes: string[]) => Promise<Record<string, CodeUse[]>>;
export declare const getInvitedByForAccounts: (db: AccountDb, dids: string[]) => Promise<Record<string, CodeDetail>>;
export declare const disableInviteCodes: (db: AccountDb, opts: {
    codes: string[];
    accounts: string[];
}) => Promise<void>;
export declare const setAccountInvitesDisabled: (db: AccountDb, did: string, disabled: boolean) => Promise<void>;
export type CodeDetail = {
    code: string;
    available: number;
    disabled: boolean;
    forAccount: string;
    createdBy: string;
    createdAt: string;
    uses: CodeUse[];
};
type CodeUse = {
    usedBy: string;
    usedAt: string;
};
export {};
//# sourceMappingURL=invite.d.ts.map