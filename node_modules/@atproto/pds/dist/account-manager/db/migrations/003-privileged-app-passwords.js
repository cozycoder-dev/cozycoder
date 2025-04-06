"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('app_password')
        .addColumn('privileged', 'integer', (col) => col.notNull().defaultTo(0))
        .execute();
}
async function down(db) {
    await db.schema.alterTable('app_password').dropColumn('privileged').execute();
}
//# sourceMappingURL=003-privileged-app-passwords.js.map