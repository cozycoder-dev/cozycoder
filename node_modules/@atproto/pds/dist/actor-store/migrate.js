"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachActorStore = void 0;
const kysely_1 = require("kysely");
const p_queue_1 = __importDefault(require("p-queue"));
const forEachActorStore = async (ctx, opts, fn) => {
    const { concurrency = 1 } = opts;
    const queue = new p_queue_1.default({ concurrency });
    const actorQb = ctx.accountManager.db.db
        .selectFrom('actor')
        .selectAll()
        .limit(2 * concurrency);
    let cursor;
    do {
        const actors = cursor
            ? await actorQb
                .where((0, kysely_1.sql) `("createdAt", "did")`, '>', (0, kysely_1.sql) `(${cursor.createdAt}, ${cursor.did})`)
                .execute()
            : await actorQb.execute();
        queue.addAll(actors.map(({ did }) => {
            return () => fn(ctx, did);
        }));
        cursor = actors.at(-1);
        await queue.onEmpty(); // wait for all remaining items to be in process, then move on to next page
    } while (cursor);
    // finalize remaining work
    await queue.onIdle();
};
exports.forEachActorStore = forEachActorStore;
//# sourceMappingURL=migrate.js.map