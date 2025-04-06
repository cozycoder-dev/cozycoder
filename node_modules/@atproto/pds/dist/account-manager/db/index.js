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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMigrator = exports.getDb = void 0;
const db_1 = require("../../db");
const migrations_1 = __importDefault(require("./migrations"));
__exportStar(require("./schema"), exports);
const getDb = (location, disableWalAutoCheckpoint = false) => {
    const pragmas = disableWalAutoCheckpoint
        ? { wal_autocheckpoint: '0' }
        : {};
    return db_1.Database.sqlite(location, { pragmas });
};
exports.getDb = getDb;
const getMigrator = (db) => {
    return new db_1.Migrator(db.db, migrations_1.default);
};
exports.getMigrator = getMigrator;
//# sourceMappingURL=index.js.map