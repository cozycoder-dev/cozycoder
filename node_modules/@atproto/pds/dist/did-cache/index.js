"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidSqliteCache = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
const util_1 = require("../db/util");
const logger_1 = require("../logger");
const db_1 = require("./db");
class DidSqliteCache {
    constructor(dbLocation, staleTTL, maxTTL, disableWalAutoCheckpoint = false) {
        Object.defineProperty(this, "staleTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: staleTTL
        });
        Object.defineProperty(this, "maxTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: maxTTL
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); //null during teardown
        this.db = (0, db_1.getDb)(dbLocation, disableWalAutoCheckpoint);
        this.pQueue = new p_queue_1.default();
    }
    async cacheDid(did, doc, prevResult) {
        try {
            if (prevResult) {
                await this.db.executeWithRetry(this.db.db
                    .updateTable('did_doc')
                    .set({ doc: JSON.stringify(doc), updatedAt: Date.now() })
                    .where('did', '=', did)
                    .where('updatedAt', '=', prevResult.updatedAt));
            }
            else {
                await this.db.executeWithRetry(this.db.db
                    .insertInto('did_doc')
                    .values({ did, doc: JSON.stringify(doc), updatedAt: Date.now() })
                    .onConflict((oc) => oc.column('did').doUpdateSet({
                    doc: (0, util_1.excluded)(this.db.db, 'doc'),
                    updatedAt: (0, util_1.excluded)(this.db.db, 'updatedAt'),
                })));
            }
        }
        catch (err) {
            logger_1.didCacheLogger.error({ did, doc, err }, 'failed to cache did');
        }
    }
    async refreshCache(did, getDoc, prevResult) {
        this.pQueue?.add(async () => {
            try {
                const doc = await getDoc();
                if (doc) {
                    await this.cacheDid(did, doc, prevResult);
                }
                else {
                    await this.clearEntry(did);
                }
            }
            catch (err) {
                logger_1.didCacheLogger.error({ did, err }, 'refreshing did cache failed');
            }
        });
    }
    async checkCache(did) {
        try {
            return await this.checkCacheInternal(did);
        }
        catch (err) {
            logger_1.didCacheLogger.error({ did, err }, 'failed to check did cache');
            return null;
        }
    }
    async checkCacheInternal(did) {
        const res = await this.db.db
            .selectFrom('did_doc')
            .where('did', '=', did)
            .selectAll()
            .executeTakeFirst();
        if (!res)
            return null;
        const now = Date.now();
        const updatedAt = new Date(res.updatedAt).getTime();
        const expired = now > updatedAt + this.maxTTL;
        const stale = now > updatedAt + this.staleTTL;
        return {
            doc: JSON.parse(res.doc),
            updatedAt,
            did,
            stale,
            expired,
        };
    }
    async clearEntry(did) {
        try {
            await this.db.executeWithRetry(this.db.db.deleteFrom('did_doc').where('did', '=', did));
        }
        catch (err) {
            logger_1.didCacheLogger.error({ did, err }, 'clearing did cache entry failed');
        }
    }
    async clear() {
        await this.db.db.deleteFrom('did_doc').execute();
    }
    async processAll() {
        await this.pQueue?.onIdle();
    }
    async migrateOrThrow() {
        await this.db.ensureWal();
        await (0, db_1.getMigrator)(this.db).migrateToLatestOrThrow();
    }
    async destroy() {
        const pQueue = this.pQueue;
        this.pQueue = null;
        pQueue?.pause();
        pQueue?.clear();
        await pQueue?.onIdle();
    }
}
exports.DidSqliteCache = DidSqliteCache;
//# sourceMappingURL=index.js.map