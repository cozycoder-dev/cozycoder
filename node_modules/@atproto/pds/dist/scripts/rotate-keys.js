"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateKeysRecovery = exports.rotateKeysFromFile = exports.rotateKeys = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const p_queue_1 = __importDefault(require("p-queue"));
const recovery_db_1 = require("./sequencer-recovery/recovery-db");
const util_1 = require("./util");
const rotateKeys = async (ctx, args) => {
    const dids = args;
    await rotateKeysForRepos(ctx, dids, 10);
};
exports.rotateKeys = rotateKeys;
const rotateKeysFromFile = async (ctx, args) => {
    const filepath = args[0];
    if (!filepath) {
        throw new Error('Expected filepath as argument');
    }
    const concurrency = args[1] ? (0, util_1.parseIntArg)(args[1]) : 25;
    const file = await promises_1.default.readFile(filepath);
    const dids = file
        .toString()
        .split('\n')
        .map((did) => did.trim())
        .filter((did) => did.startsWith('did:plc'));
    await rotateKeysForRepos(ctx, dids, concurrency);
};
exports.rotateKeysFromFile = rotateKeysFromFile;
const rotateKeysRecovery = async (ctx, args) => {
    const concurrency = args[1] ? (0, util_1.parseIntArg)(args[0]) : 10;
    const recoveryDb = await (0, recovery_db_1.getRecoveryDbFromSequencerLoc)(ctx.sequencer.dbLocation);
    const rows = await recoveryDb.db
        .selectFrom('new_account')
        .select('did')
        .where('new_account.published', '=', 0)
        .execute();
    const dids = rows.map((r) => r.did);
    await rotateKeysForRepos(ctx, dids, concurrency, async (did) => {
        await recoveryDb.db
            .updateTable('new_account')
            .set({ published: 1 })
            .where('did', '=', did)
            .execute();
    });
};
exports.rotateKeysRecovery = rotateKeysRecovery;
const rotateKeysForRepos = async (ctx, dids, concurrency, onSuccess) => {
    const queue = new p_queue_1.default({ concurrency });
    let completed = 0;
    for (const did of dids) {
        queue.add(async () => {
            try {
                await updatePlcSigningKey(ctx, did);
            }
            catch (err) {
                console.error(`failed to update key for ${did}: ${err}`);
                return;
            }
            let syncData;
            try {
                syncData = await ctx.actorStore.transact(did, async (actorTxn) => {
                    await actorTxn.repo.processWrites([]);
                    return actorTxn.repo.getSyncEventData();
                });
            }
            catch (err) {
                console.error(`failed to write new commit for ${did}: ${err}`);
                return;
            }
            try {
                await ctx.sequencer.sequenceIdentityEvt(did);
            }
            catch (err) {
                console.error(`failed to sequence new identity evt for ${did}: ${err}`);
                return;
            }
            try {
                await ctx.sequencer.sequenceSyncEvt(did, syncData);
            }
            catch (err) {
                console.error(`failed to sequence for ${did}: ${err}`);
                return;
            }
            if (onSuccess) {
                await onSuccess(did);
            }
            completed++;
            if (completed % 10 === 0) {
                console.log(`${completed}/${dids.length}`);
            }
        });
    }
    await queue.onIdle();
    console.log('DONE');
};
const updatePlcSigningKey = async (ctx, did) => {
    const updateTo = await ctx.actorStore.keypair(did);
    const currSigningKey = await ctx.idResolver.did.resolveAtprotoKey(did, true);
    if (updateTo.did() === currSigningKey) {
        // already up to date
        return;
    }
    if (ctx.entrywayAdminAgent) {
        await ctx.entrywayAdminAgent.api.com.atproto.admin.updateAccountSigningKey({
            did,
            signingKey: updateTo.did(),
        });
    }
    else {
        await ctx.plcClient.updateAtprotoKey(did, ctx.plcRotationKey, updateTo.did());
    }
};
//# sourceMappingURL=rotate-keys.js.map