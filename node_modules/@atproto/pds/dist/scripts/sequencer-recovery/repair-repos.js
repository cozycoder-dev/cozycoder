"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairRepos = void 0;
const sequencer_1 = require("../../sequencer");
const rebuild_repo_1 = require("../rebuild-repo");
const recoverer_1 = require("./recoverer");
const recovery_db_1 = require("./recovery-db");
const repairRepos = async (ctx) => {
    const recoveryDb = await (0, recovery_db_1.getRecoveryDbFromSequencerLoc)(ctx.sequencer.dbLocation);
    const repairRes = await recoveryDb.db
        .selectFrom('failed')
        .select('did')
        .where('failed.fixed', '=', 0)
        .execute();
    const dids = repairRes.map((row) => row.did);
    let fixed = 0;
    for (const did of dids) {
        await (0, rebuild_repo_1.rebuildRepo)(ctx, did, false);
        await recoverFromSequencer({ ...ctx, recoveryDb }, did);
        fixed++;
        console.log(`${fixed}/${dids.length}`);
    }
};
exports.repairRepos = repairRepos;
const recoverFromSequencer = async (ctx, did) => {
    const didEvts = await ctx.sequencer.db.db
        .selectFrom('repo_seq')
        .selectAll()
        .where('did', '=', did)
        .orderBy('seq', 'asc')
        .execute();
    const seqEvts = (0, sequencer_1.parseRepoSeqRows)(didEvts);
    for (const evt of seqEvts) {
        await (0, recoverer_1.processSeqEvt)(ctx, evt);
    }
    await ctx.recoveryDb.db
        .updateTable('failed')
        .set({
        fixed: 1,
        error: null,
    })
        .where('did', '=', did)
        .execute();
};
//# sourceMappingURL=repair-repos.js.map