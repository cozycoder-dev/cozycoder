"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskBlobStore = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const common_1 = require("@atproto/common");
const crypto_1 = require("@atproto/crypto");
const repo_1 = require("@atproto/repo");
const logger_1 = require("./logger");
class DiskBlobStore {
    constructor(did, location, tmpLocation, quarantineLocation) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: location
        });
        Object.defineProperty(this, "tmpLocation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tmpLocation
        });
        Object.defineProperty(this, "quarantineLocation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: quarantineLocation
        });
    }
    static creator(location, tmpLocation, quarantineLocation) {
        return (did) => {
            const tmp = tmpLocation || node_path_1.default.join(location, 'tempt');
            const quarantine = quarantineLocation || node_path_1.default.join(location, 'quarantine');
            return new DiskBlobStore(did, location, tmp, quarantine);
        };
    }
    async ensureDir() {
        await promises_1.default.mkdir(node_path_1.default.join(this.location, this.did), { recursive: true });
    }
    async ensureTemp() {
        await promises_1.default.mkdir(node_path_1.default.join(this.tmpLocation, this.did), { recursive: true });
    }
    async ensureQuarantine() {
        await promises_1.default.mkdir(node_path_1.default.join(this.quarantineLocation, this.did), {
            recursive: true,
        });
    }
    genKey() {
        return (0, crypto_1.randomStr)(32, 'base32');
    }
    getTmpPath(key) {
        return node_path_1.default.join(this.tmpLocation, this.did, key);
    }
    getStoredPath(cid) {
        return node_path_1.default.join(this.location, this.did, cid.toString());
    }
    getQuarantinePath(cid) {
        return node_path_1.default.join(this.quarantineLocation, this.did, cid.toString());
    }
    async hasTemp(key) {
        return (0, common_1.fileExists)(this.getTmpPath(key));
    }
    async hasStored(cid) {
        return (0, common_1.fileExists)(this.getStoredPath(cid));
    }
    async putTemp(bytes) {
        await this.ensureTemp();
        const key = this.genKey();
        await promises_1.default.writeFile(this.getTmpPath(key), bytes);
        return key;
    }
    async makePermanent(key, cid) {
        await this.ensureDir();
        const tmpPath = this.getTmpPath(key);
        const storedPath = this.getStoredPath(cid);
        const alreadyHas = await this.hasStored(cid);
        if (!alreadyHas) {
            const data = await promises_1.default.readFile(tmpPath);
            await promises_1.default.writeFile(storedPath, data);
        }
        try {
            await promises_1.default.rm(tmpPath);
        }
        catch (err) {
            logger_1.httpLogger.error({ err, tmpPath }, 'could not delete file from temp storage');
        }
    }
    async putPermanent(cid, bytes) {
        await this.ensureDir();
        await promises_1.default.writeFile(this.getStoredPath(cid), bytes);
    }
    async quarantine(cid) {
        await this.ensureQuarantine();
        try {
            await promises_1.default.rename(this.getStoredPath(cid), this.getQuarantinePath(cid));
        }
        catch (err) {
            throw translateErr(err);
        }
    }
    async unquarantine(cid) {
        await this.ensureDir();
        try {
            await promises_1.default.rename(this.getQuarantinePath(cid), this.getStoredPath(cid));
        }
        catch (err) {
            throw translateErr(err);
        }
    }
    async getBytes(cid) {
        try {
            return await promises_1.default.readFile(this.getStoredPath(cid));
        }
        catch (err) {
            throw translateErr(err);
        }
    }
    async getStream(cid) {
        const path = this.getStoredPath(cid);
        const exists = await (0, common_1.fileExists)(path);
        if (!exists) {
            throw new repo_1.BlobNotFoundError();
        }
        return node_fs_1.default.createReadStream(path);
    }
    async delete(cid) {
        await (0, common_1.rmIfExists)(this.getStoredPath(cid));
    }
    async deleteMany(cids) {
        await Promise.all(cids.map((cid) => this.delete(cid)));
    }
    async deleteAll() {
        await (0, common_1.rmIfExists)(node_path_1.default.join(this.location, this.did), true);
        await (0, common_1.rmIfExists)(node_path_1.default.join(this.tmpLocation, this.did), true);
        await (0, common_1.rmIfExists)(node_path_1.default.join(this.quarantineLocation, this.did), true);
    }
}
exports.DiskBlobStore = DiskBlobStore;
const translateErr = (err) => {
    if ((0, common_1.isErrnoException)(err) && err.code === 'ENOENT') {
        return new repo_1.BlobNotFoundError();
    }
    return err;
};
//# sourceMappingURL=disk-blobstore.js.map