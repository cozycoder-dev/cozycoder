"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRepoSeqRows = exports.Sequencer = void 0;
const node_events_1 = __importDefault(require("node:events"));
const common_1 = require("@atproto/common");
const logger_1 = require("../logger");
const db_1 = require("./db");
const events_1 = require("./events");
__exportStar(require("./events"), exports);
class Sequencer extends node_events_1.default {
    constructor(dbLocation, crawlers, lastSeen = 0, disableWalAutoCheckpoint = false) {
        super();
        Object.defineProperty(this, "dbLocation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dbLocation
        });
        Object.defineProperty(this, "crawlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: crawlers
        });
        Object.defineProperty(this, "lastSeen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lastSeen
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "pollPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "triesWithNoResults", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        // note: this does not err when surpassed, just prints a warning to stderr
        this.setMaxListeners(100);
        this.db = (0, db_1.getDb)(dbLocation, disableWalAutoCheckpoint);
    }
    async start() {
        await this.db.ensureWal();
        const migrator = (0, db_1.getMigrator)(this.db);
        await migrator.migrateToLatestOrThrow();
        const curr = await this.curr();
        this.lastSeen = curr ?? 0;
        if (this.pollPromise === null) {
            this.pollPromise = this.pollDb();
        }
    }
    async destroy() {
        this.destroyed = true;
        if (this.pollPromise) {
            await this.pollPromise;
        }
        this.emit('close');
    }
    async curr() {
        const got = await this.db.db
            .selectFrom('repo_seq')
            .selectAll()
            .orderBy('seq', 'desc')
            .limit(1)
            .executeTakeFirst();
        return got?.seq ?? null;
    }
    async next(cursor) {
        const got = await this.db.db
            .selectFrom('repo_seq')
            .selectAll()
            .where('seq', '>', cursor)
            .limit(1)
            .orderBy('seq', 'asc')
            .executeTakeFirst();
        return got || null;
    }
    async earliestAfterTime(time) {
        const got = await this.db.db
            .selectFrom('repo_seq')
            .selectAll()
            .where('sequencedAt', '>=', time)
            .orderBy('sequencedAt', 'asc')
            .limit(1)
            .executeTakeFirst();
        return got || null;
    }
    async requestSeqRange(opts) {
        const { earliestSeq, latestSeq, earliestTime, limit } = opts;
        let seqQb = this.db.db
            .selectFrom('repo_seq')
            .selectAll()
            .orderBy('seq', 'asc')
            .where('invalidated', '=', 0);
        if (earliestSeq !== undefined) {
            seqQb = seqQb.where('seq', '>', earliestSeq);
        }
        if (latestSeq !== undefined) {
            seqQb = seqQb.where('seq', '<=', latestSeq);
        }
        if (earliestTime !== undefined) {
            seqQb = seqQb.where('sequencedAt', '>=', earliestTime);
        }
        if (limit !== undefined) {
            seqQb = seqQb.limit(limit);
        }
        const rows = await seqQb.execute();
        if (rows.length < 1) {
            return [];
        }
        return (0, exports.parseRepoSeqRows)(rows);
    }
    async pollDb() {
        if (this.destroyed)
            return;
        // if already polling, do not start another poll
        try {
            const evts = await this.requestSeqRange({
                earliestSeq: this.lastSeen,
                limit: 1000,
            });
            if (evts.length > 0) {
                this.triesWithNoResults = 0;
                this.emit('events', evts);
                this.lastSeen = evts.at(-1)?.seq ?? this.lastSeen;
            }
            else {
                await this.exponentialBackoff();
            }
            this.pollPromise = this.pollDb();
        }
        catch (err) {
            logger_1.seqLogger.error({ err, lastSeen: this.lastSeen }, 'sequencer failed to poll db');
            await this.exponentialBackoff();
            this.pollPromise = this.pollDb();
        }
    }
    // when no results, exponential backoff on pulling, with a max of a second wait
    async exponentialBackoff() {
        this.triesWithNoResults++;
        const waitTime = Math.min(Math.pow(2, this.triesWithNoResults), common_1.SECOND);
        await (0, common_1.wait)(waitTime);
    }
    async sequenceEvt(evt) {
        const res = await this.db.executeWithRetry(this.db.db.insertInto('repo_seq').values(evt).returningAll());
        this.crawlers.notifyOfUpdate();
        return res[0].seq;
    }
    async sequenceCommit(did, commitData) {
        const evt = await (0, events_1.formatSeqCommit)(did, commitData);
        return await this.sequenceEvt(evt);
    }
    async sequenceSyncEvt(did, data) {
        const evt = await (0, events_1.formatSeqSyncEvt)(did, data);
        return await this.sequenceEvt(evt);
    }
    async sequenceIdentityEvt(did, handle) {
        const evt = await (0, events_1.formatSeqIdentityEvt)(did, handle);
        return await this.sequenceEvt(evt);
    }
    async sequenceAccountEvt(did, status) {
        const evt = await (0, events_1.formatSeqAccountEvt)(did, status);
        return await this.sequenceEvt(evt);
    }
    async deleteAllForUser(did, excludingSeqs = []) {
        await this.db.executeWithRetry(this.db.db
            .deleteFrom('repo_seq')
            .where('did', '=', did)
            .if(excludingSeqs.length > 0, (qb) => qb.where('seq', 'not in', excludingSeqs)));
    }
}
exports.Sequencer = Sequencer;
const parseRepoSeqRows = (rows) => {
    const seqEvts = [];
    for (const row of rows) {
        // should never hit this because of WHERE clause
        if (row.seq === null) {
            continue;
        }
        const evt = (0, common_1.cborDecode)(row.event);
        if (row.eventType === 'append') {
            seqEvts.push({
                type: 'commit',
                seq: row.seq,
                time: row.sequencedAt,
                evt: evt,
            });
        }
        else if (row.eventType === 'sync') {
            seqEvts.push({
                type: 'sync',
                seq: row.seq,
                time: row.sequencedAt,
                evt: evt,
            });
        }
        else if (row.eventType === 'identity') {
            seqEvts.push({
                type: 'identity',
                seq: row.seq,
                time: row.sequencedAt,
                evt: evt,
            });
        }
        else if (row.eventType === 'account') {
            seqEvts.push({
                type: 'account',
                seq: row.seq,
                time: row.sequencedAt,
                evt: evt,
            });
        }
    }
    return seqEvts;
};
exports.parseRepoSeqRows = parseRepoSeqRows;
exports.default = Sequencer;
//# sourceMappingURL=sequencer.js.map