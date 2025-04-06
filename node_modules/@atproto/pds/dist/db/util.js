"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrUniqueViolation = exports.retrySqlite = exports.dummyDialect = exports.valuesList = exports.excluded = exports.countDistinct = exports.countAll = exports.softDeleted = exports.notSoftDeletedClause = void 0;
const kysely_1 = require("kysely");
const common_1 = require("@atproto/common");
// Applies to repo_root or record table
const notSoftDeletedClause = (alias) => {
    return (0, kysely_1.sql) `${alias}."takedownRef" is null`;
};
exports.notSoftDeletedClause = notSoftDeletedClause;
const softDeleted = (repoOrRecord) => {
    return repoOrRecord.takedownRef !== null;
};
exports.softDeleted = softDeleted;
exports.countAll = (0, kysely_1.sql) `count(*)`;
const countDistinct = (ref) => (0, kysely_1.sql) `count(distinct ${ref})`;
exports.countDistinct = countDistinct;
// For use with doUpdateSet()
const excluded = (db, col) => {
    return (0, kysely_1.sql) `${db.dynamic.ref(`excluded.${col}`)}`;
};
exports.excluded = excluded;
// Can be useful for large where-in clauses, to get the db to use a hash lookup on the list
const valuesList = (vals) => {
    return (0, kysely_1.sql) `(values (${kysely_1.sql.join(vals, (0, kysely_1.sql) `), (`)}))`;
};
exports.valuesList = valuesList;
exports.dummyDialect = {
    createAdapter() {
        return new kysely_1.SqliteAdapter();
    },
    createDriver() {
        return new kysely_1.DummyDriver();
    },
    createIntrospector(db) {
        return new kysely_1.SqliteIntrospector(db);
    },
    createQueryCompiler() {
        return new kysely_1.SqliteQueryCompiler();
    },
};
const retrySqlite = (fn) => {
    return (0, common_1.retry)(fn, {
        retryable: retryableSqlite,
        getWaitMs: getWaitMsSqlite,
        maxRetries: 60, // a safety measure: getWaitMsSqlite() times out before this after 5000ms of waiting.
    });
};
exports.retrySqlite = retrySqlite;
const retryableSqlite = (err) => {
    return typeof err?.['code'] === 'string' && RETRY_ERRORS.has(err['code']);
};
// based on sqlite's backoff strategy https://github.com/sqlite/sqlite/blob/91c8e65dd4bf17d21fbf8f7073565fe1a71c8948/src/main.c#L1704-L1713
const getWaitMsSqlite = (n, timeout = 5000) => {
    if (n < 0)
        return null;
    let delay;
    let prior;
    if (n < DELAYS.length) {
        delay = DELAYS[n];
        prior = TOTALS[n];
    }
    else {
        delay = last(DELAYS);
        prior = last(TOTALS) + delay * (n - (DELAYS.length - 1));
    }
    if (prior + delay > timeout) {
        delay = timeout - prior;
        if (delay <= 0)
            return null;
    }
    return delay;
};
const last = (arr) => arr[arr.length - 1];
const DELAYS = [1, 2, 5, 10, 15, 20, 25, 25, 25, 50, 50, 100];
const TOTALS = [0, 1, 3, 8, 18, 33, 53, 78, 103, 128, 178, 228];
const RETRY_ERRORS = new Set([
    'SQLITE_BUSY',
    'SQLITE_BUSY_SNAPSHOT',
    'SQLITE_BUSY_RECOVERY',
    'SQLITE_BUSY_TIMEOUT',
]);
const isErrUniqueViolation = (err) => {
    const code = err?.['code'];
    return (code === '23505' || // postgres, see https://www.postgresql.org/docs/current/errcodes-appendix.html
        code === 'SQLITE_CONSTRAINT_UNIQUE' // sqlite, see https://www.sqlite.org/rescode.html#constraint_unique
    );
};
exports.isErrUniqueViolation = isErrUniqueViolation;
//# sourceMappingURL=util.js.map