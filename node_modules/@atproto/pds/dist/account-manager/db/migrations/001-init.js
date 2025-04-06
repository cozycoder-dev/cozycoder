"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('app_password')
        .addColumn('did', 'varchar', (col) => col.notNull())
        .addColumn('name', 'varchar', (col) => col.notNull())
        .addColumn('passwordScrypt', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addPrimaryKeyConstraint('app_password_pkey', ['did', 'name'])
        .execute();
    await db.schema
        .createTable('invite_code')
        .addColumn('code', 'varchar', (col) => col.primaryKey())
        .addColumn('availableUses', 'integer', (col) => col.notNull())
        .addColumn('disabled', 'int2', (col) => col.defaultTo(0))
        .addColumn('forAccount', 'varchar', (col) => col.notNull())
        .addColumn('createdBy', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .execute();
    await db.schema
        .createIndex('invite_code_for_account_idx')
        .on('invite_code')
        .column('forAccount')
        .execute();
    await db.schema
        .createTable('invite_code_use')
        .addColumn('code', 'varchar', (col) => col.notNull())
        .addColumn('usedBy', 'varchar', (col) => col.notNull())
        .addColumn('usedAt', 'varchar', (col) => col.notNull())
        .addPrimaryKeyConstraint(`invite_code_use_pkey`, ['code', 'usedBy'])
        .execute();
    await db.schema
        .createTable('refresh_token')
        .addColumn('id', 'varchar', (col) => col.primaryKey())
        .addColumn('did', 'varchar', (col) => col.notNull())
        .addColumn('expiresAt', 'varchar', (col) => col.notNull())
        .addColumn('nextId', 'varchar')
        .addColumn('appPasswordName', 'varchar')
        .execute();
    await db.schema // Aids in refresh token cleanup
        .createIndex('refresh_token_did_idx')
        .on('refresh_token')
        .column('did')
        .execute();
    await db.schema
        .createTable('repo_root')
        .addColumn('did', 'varchar', (col) => col.primaryKey())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('rev', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('actor')
        .addColumn('did', 'varchar', (col) => col.primaryKey())
        .addColumn('handle', 'varchar')
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('takedownRef', 'varchar')
        .execute();
    await db.schema
        .createIndex(`actor_handle_lower_idx`)
        .unique()
        .on('actor')
        .expression((0, kysely_1.sql) `lower("handle")`)
        .execute();
    await db.schema
        .createIndex('actor_cursor_idx')
        .on('actor')
        .columns(['createdAt', 'did'])
        .execute();
    await db.schema
        .createTable('account')
        .addColumn('did', 'varchar', (col) => col.primaryKey())
        .addColumn('email', 'varchar', (col) => col.notNull())
        .addColumn('passwordScrypt', 'varchar', (col) => col.notNull())
        .addColumn('emailConfirmedAt', 'varchar')
        .addColumn('invitesDisabled', 'int2', (col) => col.notNull().defaultTo(0))
        .execute();
    await db.schema
        .createIndex(`account_email_lower_idx`)
        .unique()
        .on('account')
        .expression((0, kysely_1.sql) `lower("email")`)
        .execute();
    await db.schema
        .createTable('email_token')
        .addColumn('purpose', 'varchar', (col) => col.notNull())
        .addColumn('did', 'varchar', (col) => col.notNull())
        .addColumn('token', 'varchar', (col) => col.notNull())
        .addColumn('requestedAt', 'varchar', (col) => col.notNull())
        .addPrimaryKeyConstraint('email_token_pkey', ['purpose', 'did'])
        .addUniqueConstraint('email_token_purpose_token_unique', [
        'purpose',
        'token',
    ])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('email_token').execute();
    await db.schema.dropTable('account').execute();
    await db.schema.dropTable('actor').execute();
    await db.schema.dropTable('repo_root').execute();
    await db.schema.dropTable('refresh_token').execute();
    await db.schema.dropTable('invite_code_use').execute();
    await db.schema.dropTable('invite_code').execute();
    await db.schema.dropTable('app_password').execute();
}
//# sourceMappingURL=001-init.js.map