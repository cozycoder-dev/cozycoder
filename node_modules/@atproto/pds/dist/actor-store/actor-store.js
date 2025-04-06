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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorStore = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const promises_1 = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const common_1 = require("@atproto/common");
const crypto = __importStar(require("@atproto/crypto"));
const xrpc_server_1 = require("@atproto/xrpc-server");
const db_1 = require("../db");
const disk_blobstore_1 = require("../disk-blobstore");
const actor_store_reader_1 = require("./actor-store-reader");
const actor_store_transactor_1 = require("./actor-store-transactor");
const actor_store_writer_1 = require("./actor-store-writer");
const db_2 = require("./db");
class ActorStore {
    constructor(cfg, resources) {
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cfg
        });
        Object.defineProperty(this, "resources", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: resources
        });
        Object.defineProperty(this, "reservedKeyDir", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.reservedKeyDir = node_path_1.default.join(cfg.directory, 'reserved_keys');
    }
    async getLocation(did) {
        const didHash = await crypto.sha256Hex(did);
        const directory = node_path_1.default.join(this.cfg.directory, didHash.slice(0, 2), did);
        const dbLocation = node_path_1.default.join(directory, `store.sqlite`);
        const keyLocation = node_path_1.default.join(directory, `key`);
        return { directory, dbLocation, keyLocation };
    }
    async exists(did) {
        const location = await this.getLocation(did);
        return await (0, common_1.fileExists)(location.dbLocation);
    }
    async keypair(did) {
        const { keyLocation } = await this.getLocation(did);
        const privKey = await promises_1.default.readFile(keyLocation);
        return crypto.Secp256k1Keypair.import(privKey);
    }
    async openDb(did) {
        const { dbLocation } = await this.getLocation(did);
        const exists = await (0, common_1.fileExists)(dbLocation);
        if (!exists) {
            throw new xrpc_server_1.InvalidRequestError('Repo not found', 'NotFound');
        }
        const db = (0, db_2.getDb)(dbLocation, this.cfg.disableWalAutoCheckpoint);
        // run a simple select with retry logic to ensure the db is ready (not in wal recovery mode)
        try {
            await (0, db_1.retrySqlite)(() => db.db.selectFrom('repo_root').selectAll().execute());
        }
        catch (err) {
            db.close();
            throw err;
        }
        return db;
    }
    async read(did, fn) {
        const db = await this.openDb(did);
        try {
            const getKeypair = () => this.keypair(did);
            return await fn(new actor_store_reader_1.ActorStoreReader(did, db, this.resources, getKeypair));
        }
        finally {
            db.close();
        }
    }
    async transact(did, fn) {
        const keypair = await this.keypair(did);
        const db = await this.openDb(did);
        try {
            return await db.transaction((dbTxn) => {
                return fn(new actor_store_transactor_1.ActorStoreTransactor(did, dbTxn, keypair, this.resources));
            });
        }
        finally {
            db.close();
        }
    }
    async writeNoTransaction(did, fn) {
        const keypair = await this.keypair(did);
        const db = await this.openDb(did);
        try {
            return await fn(new actor_store_writer_1.ActorStoreWriter(did, db, keypair, this.resources));
        }
        finally {
            db.close();
        }
    }
    async create(did, keypair) {
        const { directory, dbLocation, keyLocation } = await this.getLocation(did);
        // ensure subdir exists
        await (0, promises_1.mkdir)(directory, { recursive: true });
        const exists = await (0, common_1.fileExists)(dbLocation);
        if (exists) {
            throw new xrpc_server_1.InvalidRequestError('Repo already exists', 'AlreadyExists');
        }
        const privKey = await keypair.export();
        await promises_1.default.writeFile(keyLocation, privKey);
        const db = (0, db_2.getDb)(dbLocation, this.cfg.disableWalAutoCheckpoint);
        try {
            await db.ensureWal();
            const migrator = (0, db_2.getMigrator)(db);
            await migrator.migrateToLatestOrThrow();
        }
        finally {
            db.close();
        }
    }
    async destroy(did) {
        const blobstore = this.resources.blobstore(did);
        if (blobstore instanceof disk_blobstore_1.DiskBlobStore) {
            await blobstore.deleteAll();
        }
        else {
            const cids = await this.read(did, async (store) => store.repo.blob.getBlobCids());
            await Promise.allSettled((0, common_1.chunkArray)(cids, 500).map((chunk) => blobstore.deleteMany(chunk)));
        }
        const { directory } = await this.getLocation(did);
        await (0, common_1.rmIfExists)(directory, true);
    }
    async reserveKeypair(did) {
        let keyLoc;
        if (did) {
            assertSafePathPart(did);
            keyLoc = node_path_1.default.join(this.reservedKeyDir, did);
            const maybeKey = await loadKey(keyLoc);
            if (maybeKey) {
                return maybeKey.did();
            }
        }
        const keypair = await crypto.Secp256k1Keypair.create({ exportable: true });
        const keyDid = keypair.did();
        keyLoc = keyLoc ?? node_path_1.default.join(this.reservedKeyDir, keyDid);
        await (0, promises_1.mkdir)(this.reservedKeyDir, { recursive: true });
        await promises_1.default.writeFile(keyLoc, await keypair.export());
        return keyDid;
    }
    async getReservedKeypair(signingKeyOrDid) {
        return loadKey(node_path_1.default.join(this.reservedKeyDir, signingKeyOrDid));
    }
    async clearReservedKeypair(keyDid, did) {
        await (0, common_1.rmIfExists)(node_path_1.default.join(this.reservedKeyDir, keyDid));
        if (did) {
            await (0, common_1.rmIfExists)(node_path_1.default.join(this.reservedKeyDir, did));
        }
    }
    async storePlcOp(did, op) {
        const { directory } = await this.getLocation(did);
        const opLoc = node_path_1.default.join(directory, `did-op`);
        await promises_1.default.writeFile(opLoc, op);
    }
    async getPlcOp(did) {
        const { directory } = await this.getLocation(did);
        const opLoc = node_path_1.default.join(directory, `did-op`);
        return await promises_1.default.readFile(opLoc);
    }
    async clearPlcOp(did) {
        const { directory } = await this.getLocation(did);
        const opLoc = node_path_1.default.join(directory, `did-op`);
        await (0, common_1.rmIfExists)(opLoc);
    }
}
exports.ActorStore = ActorStore;
const loadKey = async (loc) => {
    const privKey = await (0, common_1.readIfExists)(loc);
    if (!privKey)
        return undefined;
    return crypto.Secp256k1Keypair.import(privKey, { exportable: true });
};
function assertSafePathPart(part) {
    const normalized = node_path_1.default.normalize(part);
    (0, node_assert_1.default)(part === normalized &&
        !part.startsWith('.') &&
        !part.includes('/') &&
        !part.includes('\\'), `unsafe path part: ${part}`);
}
//# sourceMappingURL=actor-store.js.map