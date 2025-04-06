"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppPassword = exports.listAppPasswords = exports.createAppPassword = exports.updateUserPassword = exports.verifyAppPassword = exports.verifyAccountPassword = void 0;
const crypto_1 = require("@atproto/crypto");
const xrpc_server_1 = require("@atproto/xrpc-server");
const scrypt = __importStar(require("./scrypt"));
const verifyAccountPassword = async (db, did, password) => {
    const found = await db.db
        .selectFrom('account')
        .selectAll()
        .where('did', '=', did)
        .executeTakeFirst();
    return found ? await scrypt.verify(password, found.passwordScrypt) : false;
};
exports.verifyAccountPassword = verifyAccountPassword;
const verifyAppPassword = async (db, did, password) => {
    const passwordScrypt = await scrypt.hashAppPassword(did, password);
    const found = await db.db
        .selectFrom('app_password')
        .selectAll()
        .where('did', '=', did)
        .where('passwordScrypt', '=', passwordScrypt)
        .executeTakeFirst();
    if (!found)
        return null;
    return {
        name: found.name,
        privileged: found.privileged === 1 ? true : false,
    };
};
exports.verifyAppPassword = verifyAppPassword;
const updateUserPassword = async (db, opts) => {
    await db.executeWithRetry(db.db
        .updateTable('account')
        .set({ passwordScrypt: opts.passwordScrypt })
        .where('did', '=', opts.did));
};
exports.updateUserPassword = updateUserPassword;
const createAppPassword = async (db, did, name, privileged) => {
    // create an app password with format:
    // 1234-abcd-5678-efgh
    const str = (0, crypto_1.randomStr)(16, 'base32').slice(0, 16);
    const chunks = [
        str.slice(0, 4),
        str.slice(4, 8),
        str.slice(8, 12),
        str.slice(12, 16),
    ];
    const password = chunks.join('-');
    const passwordScrypt = await scrypt.hashAppPassword(did, password);
    const [got] = await db.executeWithRetry(db.db
        .insertInto('app_password')
        .values({
        did,
        name,
        passwordScrypt,
        createdAt: new Date().toISOString(),
        privileged: privileged ? 1 : 0,
    })
        .returningAll());
    if (!got) {
        throw new xrpc_server_1.InvalidRequestError('could not create app-specific password');
    }
    return {
        name,
        password,
        createdAt: got.createdAt,
        privileged,
    };
};
exports.createAppPassword = createAppPassword;
const listAppPasswords = async (db, did) => {
    const res = await db.db
        .selectFrom('app_password')
        .select(['name', 'createdAt', 'privileged'])
        .where('did', '=', did)
        .orderBy('createdAt', 'desc')
        .execute();
    return res.map((row) => ({
        name: row.name,
        createdAt: row.createdAt,
        privileged: row.privileged === 1 ? true : false,
    }));
};
exports.listAppPasswords = listAppPasswords;
const deleteAppPassword = async (db, did, name) => {
    await db.executeWithRetry(db.db
        .deleteFrom('app_password')
        .where('did', '=', did)
        .where('name', '=', name));
};
exports.deleteAppPassword = deleteAppPassword;
//# sourceMappingURL=password.js.map