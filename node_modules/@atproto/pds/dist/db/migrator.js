"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrator = void 0;
const kysely_1 = require("kysely");
class Migrator extends kysely_1.Migrator {
    constructor(db, migrations) {
        super({
            db,
            provider: {
                async getMigrations() {
                    return migrations;
                },
            },
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
    }
    async migrateToOrThrow(migration) {
        const { error, results } = await this.migrateTo(migration);
        if (error) {
            throw error;
        }
        if (!results) {
            throw new Error('An unknown failure occurred while migrating');
        }
        return results;
    }
    async migrateToLatestOrThrow() {
        const { error, results } = await this.migrateToLatest();
        if (error) {
            throw error;
        }
        if (!results) {
            throw new Error('An unknown failure occurred while migrating');
        }
        return results;
    }
}
exports.Migrator = Migrator;
//# sourceMappingURL=migrator.js.map