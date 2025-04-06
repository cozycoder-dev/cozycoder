"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('actor')
        .addColumn('deactivatedAt', 'varchar')
        .execute();
    await db.schema
        .alterTable('actor')
        .addColumn('deleteAfter', 'varchar')
        .execute();
}
async function down(db) {
    await db.schema.alterTable('actor').dropColumn('deactivatedAt').execute();
    await db.schema.alterTable('actor').dropColumn('deleteAfter').execute();
}
//# sourceMappingURL=002-account-deactivation.js.map