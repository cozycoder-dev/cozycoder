"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccountInvitesDisabled = exports.disableInviteCodes = exports.getInvitedByForAccounts = exports.getInviteCodesUses = exports.getAccountsInviteCodes = exports.selectInviteCodesQb = exports.ensureInviteIsAvailable = exports.recordInviteUse = exports.createAccountInviteCodes = exports.createInviteCodes = void 0;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const db_1 = require("../../db");
const createInviteCodes = async (db, toCreate, useCount) => {
    const now = new Date().toISOString();
    const rows = toCreate.flatMap((account) => account.codes.map((code) => ({
        code: code,
        availableUses: useCount,
        disabled: 0,
        forAccount: account.account,
        createdBy: 'admin',
        createdAt: now,
    })));
    await Promise.all((0, common_1.chunkArray)(rows, 50).map((chunk) => db.executeWithRetry(db.db.insertInto('invite_code').values(chunk))));
};
exports.createInviteCodes = createInviteCodes;
const createAccountInviteCodes = async (db, forAccount, codes, expectedTotal, disabled) => {
    const now = new Date().toISOString();
    const rows = codes.map((code) => ({
        code,
        availableUses: 1,
        disabled,
        forAccount,
        createdBy: forAccount,
        createdAt: now,
    }));
    await db.executeWithRetry(db.db.insertInto('invite_code').values(rows));
    const finalRoutineInviteCodes = await db.db
        .selectFrom('invite_code')
        .where('forAccount', '=', forAccount)
        .where('createdBy', '!=', 'admin') // dont count admin-gifted codes aginast the user
        .selectAll()
        .execute();
    if (finalRoutineInviteCodes.length > expectedTotal) {
        throw new xrpc_server_1.InvalidRequestError('attempted to create additional codes in another request', 'DuplicateCreate');
    }
    return rows.map((row) => ({
        ...row,
        available: 1,
        disabled: row.disabled === 1,
        uses: [],
    }));
};
exports.createAccountInviteCodes = createAccountInviteCodes;
const recordInviteUse = async (db, opts) => {
    if (!opts.inviteCode)
        return;
    await db.executeWithRetry(db.db.insertInto('invite_code_use').values({
        code: opts.inviteCode,
        usedBy: opts.did,
        usedAt: opts.now,
    }));
};
exports.recordInviteUse = recordInviteUse;
const ensureInviteIsAvailable = async (db, inviteCode) => {
    const invite = await db.db
        .selectFrom('invite_code')
        .leftJoin('actor', 'actor.did', 'invite_code.forAccount')
        .where('takedownRef', 'is', null)
        .selectAll('invite_code')
        .where('code', '=', inviteCode)
        .executeTakeFirst();
    if (!invite || invite.disabled) {
        throw new xrpc_server_1.InvalidRequestError('Provided invite code not available', 'InvalidInviteCode');
    }
    const uses = await db.db
        .selectFrom('invite_code_use')
        .select(db_1.countAll.as('count'))
        .where('code', '=', inviteCode)
        .executeTakeFirstOrThrow();
    if (invite.availableUses <= uses.count) {
        throw new xrpc_server_1.InvalidRequestError('Provided invite code not available', 'InvalidInviteCode');
    }
};
exports.ensureInviteIsAvailable = ensureInviteIsAvailable;
const selectInviteCodesQb = (db) => {
    const ref = db.db.dynamic.ref;
    const builder = db.db
        .selectFrom('invite_code')
        .select([
        'invite_code.code as code',
        'invite_code.availableUses as available',
        'invite_code.disabled as disabled',
        'invite_code.forAccount as forAccount',
        'invite_code.createdBy as createdBy',
        'invite_code.createdAt as createdAt',
        db.db
            .selectFrom('invite_code_use')
            .select(db_1.countAll.as('count'))
            .whereRef('invite_code_use.code', '=', ref('invite_code.code'))
            .as('uses'),
    ]);
    return db.db.selectFrom(builder.as('codes')).selectAll();
};
exports.selectInviteCodesQb = selectInviteCodesQb;
const getAccountsInviteCodes = async (db, dids) => {
    const results = new Map();
    // We don't want to pass an empty array to kysely and let's avoid running a query entirely if there is nothing to match for
    if (!dids.length)
        return results;
    const res = await (0, exports.selectInviteCodesQb)(db)
        .where('forAccount', 'in', dids)
        .execute();
    const codes = res.map((row) => row.code);
    const uses = await (0, exports.getInviteCodesUses)(db, codes);
    res.forEach((row) => {
        const existing = results.get(row.forAccount) ?? [];
        results.set(row.forAccount, [
            ...existing,
            {
                ...row,
                uses: uses[row.code] ?? [],
                disabled: row.disabled === 1,
            },
        ]);
    });
    return results;
};
exports.getAccountsInviteCodes = getAccountsInviteCodes;
const getInviteCodesUses = async (db, codes) => {
    const uses = {};
    if (codes.length > 0) {
        const usesRes = await db.db
            .selectFrom('invite_code_use')
            .where('code', 'in', codes)
            .orderBy('usedAt', 'desc')
            .selectAll()
            .execute();
        for (const use of usesRes) {
            const { code, usedBy, usedAt } = use;
            uses[code] ?? (uses[code] = []);
            uses[code].push({ usedBy, usedAt });
        }
    }
    return uses;
};
exports.getInviteCodesUses = getInviteCodesUses;
const getInvitedByForAccounts = async (db, dids) => {
    if (dids.length < 1)
        return {};
    const codeDetailsRes = await (0, exports.selectInviteCodesQb)(db)
        .where('code', 'in', (qb) => qb
        .selectFrom('invite_code_use')
        .where('usedBy', 'in', dids)
        .select('code')
        .distinct())
        .execute();
    const uses = await (0, exports.getInviteCodesUses)(db, codeDetailsRes.map((row) => row.code));
    const codeDetails = codeDetailsRes.map((row) => ({
        ...row,
        uses: uses[row.code] ?? [],
        disabled: row.disabled === 1,
    }));
    return codeDetails.reduce((acc, cur) => {
        for (const use of cur.uses) {
            acc[use.usedBy] = cur;
        }
        return acc;
    }, {});
};
exports.getInvitedByForAccounts = getInvitedByForAccounts;
const disableInviteCodes = async (db, opts) => {
    const { codes, accounts } = opts;
    if (codes.length > 0) {
        await db.executeWithRetry(db.db
            .updateTable('invite_code')
            .set({ disabled: 1 })
            .where('code', 'in', codes));
    }
    if (accounts.length > 0) {
        await db.executeWithRetry(db.db
            .updateTable('invite_code')
            .set({ disabled: 1 })
            .where('forAccount', 'in', accounts));
    }
};
exports.disableInviteCodes = disableInviteCodes;
const setAccountInvitesDisabled = async (db, did, disabled) => {
    await db.executeWithRetry(db.db
        .updateTable('account')
        .where('did', '=', did)
        .set({ invitesDisabled: disabled ? 1 : 0 }));
};
exports.setAccountInvitesDisabled = setAccountInvitesDisabled;
//# sourceMappingURL=invite.js.map