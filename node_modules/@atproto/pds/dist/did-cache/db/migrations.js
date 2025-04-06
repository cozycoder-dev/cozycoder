"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    '001': {
        up: async (db) => {
            await db.schema
                .createTable('did_doc')
                .addColumn('did', 'varchar', (col) => col.primaryKey())
                .addColumn('doc', 'text', (col) => col.notNull())
                .addColumn('updatedAt', 'bigint', (col) => col.notNull())
                .execute();
        },
        down: async (db) => {
            await db.schema.dropTable('did_doc').execute();
        },
    },
};
//# sourceMappingURL=migrations.js.map