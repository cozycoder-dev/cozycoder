"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../../../../logger");
const outbox_1 = require("../../../../sequencer/outbox");
function default_1(server, ctx) {
    server.com.atproto.sync.subscribeRepos(async function* ({ params, signal }) {
        const { cursor } = params;
        const outbox = new outbox_1.Outbox(ctx.sequencer, {
            maxBufferSize: ctx.cfg.subscription.maxBuffer,
        });
        logger_1.httpLogger.info({ cursor }, 'request to com.atproto.sync.subscribeRepos');
        const backfillTime = new Date(Date.now() - ctx.cfg.subscription.repoBackfillLimitMs).toISOString();
        let outboxCursor = undefined;
        if (cursor !== undefined) {
            const [next, curr] = await Promise.all([
                ctx.sequencer.next(cursor),
                ctx.sequencer.curr(),
            ]);
            if (cursor > (curr ?? 0)) {
                throw new xrpc_server_1.InvalidRequestError('Cursor in the future.', 'FutureCursor');
            }
            else if (next && next.sequencedAt < backfillTime) {
                // if cursor is before backfill time, find earliest cursor from backfill window
                yield {
                    $type: '#info',
                    name: 'OutdatedCursor',
                    message: 'Requested cursor exceeded limit. Possibly missing events',
                };
                const startEvt = await ctx.sequencer.earliestAfterTime(backfillTime);
                outboxCursor = startEvt?.seq ? startEvt.seq - 1 : undefined;
            }
            else {
                outboxCursor = cursor;
            }
        }
        for await (const evt of outbox.events(outboxCursor, signal)) {
            if (evt.type === 'commit') {
                yield {
                    $type: '#commit',
                    seq: evt.seq,
                    time: evt.time,
                    ...evt.evt,
                };
            }
            else if (evt.type === 'sync') {
                yield {
                    $type: '#sync',
                    seq: evt.seq,
                    time: evt.time,
                    ...evt.evt,
                };
            }
            else if (evt.type === 'identity') {
                yield {
                    $type: '#identity',
                    seq: evt.seq,
                    time: evt.time,
                    ...evt.evt,
                };
            }
            else if (evt.type === 'account') {
                yield {
                    $type: '#account',
                    seq: evt.seq,
                    time: evt.time,
                    ...evt.evt,
                };
            }
        }
    });
}
//# sourceMappingURL=subscribeRepos.js.map