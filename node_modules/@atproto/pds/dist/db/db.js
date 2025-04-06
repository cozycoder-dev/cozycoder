"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const kysely_1 = require("kysely");
const logger_1 = require("../logger");
const util_1 = require("./util");
const DEFAULT_PRAGMAS = {
// strict: 'ON', // @TODO strictness should live on table defs instead
};
class Database {
    constructor(db) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "commitHooks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    static sqlite(location, opts) {
        const sqliteDb = new better_sqlite3_1.default(location, {
            timeout: 0, // handled by application
        });
        const pragmas = {
            ...DEFAULT_PRAGMAS,
            ...(opts?.pragmas ?? {}),
        };
        for (const pragma of Object.keys(pragmas)) {
            sqliteDb.pragma(`${pragma} = ${pragmas[pragma]}`);
        }
        const db = new kysely_1.Kysely({
            dialect: new kysely_1.SqliteDialect({
                database: sqliteDb,
            }),
        });
        return new Database(db);
    }
    async ensureWal() {
        await (0, kysely_1.sql) `PRAGMA journal_mode = WAL`.execute(this.db);
    }
    async transactionNoRetry(fn) {
        this.assertNotTransaction();
        const leakyTxPlugin = new LeakyTxPlugin();
        const { hooks, txRes } = await this.db
            .withPlugin(leakyTxPlugin)
            .transaction()
            .execute(async (txn) => {
            const dbTxn = new Database(txn);
            try {
                const txRes = await fn(dbTxn);
                leakyTxPlugin.endTx();
                const hooks = dbTxn.commitHooks;
                return { hooks, txRes };
            }
            catch (err) {
                leakyTxPlugin.endTx();
                // ensure that all in-flight queries are flushed & the connection is open
                await txn.getExecutor().provideConnection(async () => { });
                throw err;
            }
        });
        hooks.map((hook) => hook());
        return txRes;
    }
    async transaction(fn) {
        return (0, util_1.retrySqlite)(() => this.transactionNoRetry(fn));
    }
    async executeWithRetry(query) {
        if (this.isTransaction) {
            // transaction() ensures retry on entire transaction, no need to retry individual statements.
            return query.execute();
        }
        return (0, util_1.retrySqlite)(() => query.execute());
    }
    onCommit(fn) {
        this.assertTransaction();
        this.commitHooks.push(fn);
    }
    get isTransaction() {
        return this.db.isTransaction;
    }
    assertTransaction() {
        (0, node_assert_1.default)(this.isTransaction, 'Transaction required');
    }
    assertNotTransaction() {
        (0, node_assert_1.default)(!this.isTransaction, 'Cannot be in a transaction');
    }
    close() {
        if (this.destroyed)
            return;
        this.db
            .destroy()
            .then(() => (this.destroyed = true))
            .catch((err) => logger_1.dbLogger.error({ err }, 'error closing db'));
    }
}
exports.Database = Database;
class LeakyTxPlugin {
    constructor() {
        Object.defineProperty(this, "txOver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    endTx() {
        this.txOver = true;
    }
    transformQuery(args) {
        if (this.txOver) {
            throw new Error('tx already failed');
        }
        return args.node;
    }
    async transformResult(args) {
        return args.result;
    }
}
//# sourceMappingURL=db.js.map