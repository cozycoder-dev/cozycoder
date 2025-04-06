"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('repo_seq')
        .addColumn('seq', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('did', 'varchar', (col) => col.notNull())
        .addColumn('eventType', 'varchar', (col) => col.notNull())
        .addColumn('event', 'blob', (col) => col.notNull())
        .addColumn('invalidated', 'int2', (col) => col.notNull().defaultTo(0))
        .addColumn('sequencedAt', 'varchar', (col) => col.notNull())
        .execute();
    // for filtering seqs based on did
    await db.schema
        .createIndex('repo_seq_did_idx')
        .on('repo_seq')
        .column('did')
        .execute();
    // for filtering seqs based on event type
    await db.schema
        .createIndex('repo_seq_event_type_idx')
        .on('repo_seq')
        .column('eventType')
        .execute();
    // for entering into the seq stream at a particular time
    await db.schema
        .createIndex('repo_seq_sequenced_at_index')
        .on('repo_seq')
        .column('sequencedAt')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('repo_seq').execute();
}
//# sourceMappingURL=001-init.js.map