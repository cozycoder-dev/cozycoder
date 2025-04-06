"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndMigrateRecoveryDb = exports.getRecoveryDbFromSequencerLoc = void 0;
const node_path_1 = __importDefault(require("node:path"));
const db_1 = require("../../db");
const getRecoveryDbFromSequencerLoc = (sequencerLoc) => {
    const recoveryDbLoc = node_path_1.default.join(node_path_1.default.dirname(sequencerLoc), 'recovery.sqlite');
    return (0, exports.getAndMigrateRecoveryDb)(recoveryDbLoc);
};
exports.getRecoveryDbFromSequencerLoc = getRecoveryDbFromSequencerLoc;
const getAndMigrateRecoveryDb = async (location, disableWalAutoCheckpoint = false) => {
    const pragmas = disableWalAutoCheckpoint
        ? { wal_autocheckpoint: '0' }
        : {};
    const db = db_1.Database.sqlite(location, pragmas);
    const migrator = new db_1.Migrator(db.db, migrations);
    await migrator.migrateToLatestOrThrow();
    return db;
};
exports.getAndMigrateRecoveryDb = getAndMigrateRecoveryDb;
const migrations = {
    '001': {
        up: async (db) => {
            await db.schema
                .createTable('new_account')
                .addColumn('did', 'varchar', (col) => col.primaryKey())
                .addColumn('published', 'int2', (col) => col.notNull())
                .execute();
            await db.schema
                .createTable('failed')
                .addColumn('did', 'varchar', (col) => col.primaryKey())
                .addColumn('error', 'varchar')
                .addColumn('fixed', 'int2', (col) => col.notNull())
                .execute();
        },
        down: async (db) => {
            await db.schema.dropTable('new_account').execute();
            await db.schema.dropTable('failed').execute();
        },
    },
};
//# sourceMappingURL=recovery-db.js.map