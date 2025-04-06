"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequencerRecovery = void 0;
const util_1 = require("../util");
const recoverer_1 = require("./recoverer");
const recovery_db_1 = require("./recovery-db");
const sequencerRecovery = async (ctx, args) => {
    const cursor = args[0] ? (0, util_1.parseIntArg)(args[0]) : 0;
    const concurrency = args[1] ? (0, util_1.parseIntArg)(args[1]) : 10;
    const recoveryDb = await (0, recovery_db_1.getRecoveryDbFromSequencerLoc)(ctx.sequencer.dbLocation);
    const recover = new recoverer_1.Recoverer({ ...ctx, recoveryDb }, {
        concurrency,
    });
    await recover.run(cursor);
};
exports.sequencerRecovery = sequencerRecovery;
//# sourceMappingURL=index.js.map