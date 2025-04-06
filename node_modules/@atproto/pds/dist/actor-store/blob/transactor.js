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
exports.CidNotFound = exports.BlobTransactor = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const bytes_1 = __importDefault(require("bytes"));
const file_type_1 = require("file-type");
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const lexicon_1 = require("@atproto/lexicon");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const img = __importStar(require("../../image"));
const reader_1 = require("./reader");
class BlobTransactor extends reader_1.BlobReader {
    constructor(db, blobstore, backgroundQueue) {
        super(db, blobstore);
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "blobstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: blobstore
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: backgroundQueue
        });
    }
    async insertBlobs(recordUri, blobs) {
        const values = Array.from(blobs, (cid) => ({
            recordUri,
            blobCid: cid.ref.toString(),
        }));
        if (values.length) {
            await this.db.db
                .insertInto('record_blob')
                .values(values)
                .onConflict((oc) => oc.doNothing())
                .execute();
        }
    }
    async uploadBlobAndGetMetadata(userSuggestedMime, blobStream) {
        const [tempKey, size, sha256, imgInfo, sniffedMime] = await Promise.all([
            this.blobstore.putTemp((0, common_1.cloneStream)(blobStream)),
            (0, common_1.streamSize)((0, common_1.cloneStream)(blobStream)),
            sha256Stream((0, common_1.cloneStream)(blobStream)),
            img.maybeGetInfo((0, common_1.cloneStream)(blobStream)),
            mimeTypeFromStream((0, common_1.cloneStream)(blobStream)),
        ]);
        const cid = (0, common_1.sha256RawToCid)(sha256);
        const mimeType = sniffedMime || userSuggestedMime;
        return {
            tempKey,
            size,
            cid,
            mimeType,
            width: imgInfo?.width ?? null,
            height: imgInfo?.height ?? null,
        };
    }
    async trackUntetheredBlob(metadata) {
        const { tempKey, size, cid, mimeType, width, height } = metadata;
        const found = await this.db.db
            .selectFrom('blob')
            .selectAll()
            .where('cid', '=', cid.toString())
            .executeTakeFirst();
        if (found?.takedownRef) {
            throw new xrpc_server_1.InvalidRequestError('Blob has been takendown, cannot re-upload');
        }
        await this.db.db
            .insertInto('blob')
            .values({
            cid: cid.toString(),
            mimeType,
            size,
            tempKey,
            width,
            height,
            createdAt: new Date().toISOString(),
        })
            .onConflict((oc) => oc
            .column('cid')
            .doUpdateSet({ tempKey })
            .where('blob.tempKey', 'is not', null))
            .execute();
        return new lexicon_1.BlobRef(cid, mimeType, size);
    }
    async processWriteBlobs(rev, writes) {
        await this.deleteDereferencedBlobs(writes);
        const blobPromises = [];
        for (const write of writes) {
            if (write.action === repo_1.WriteOpAction.Create ||
                write.action === repo_1.WriteOpAction.Update) {
                for (const blob of write.blobs) {
                    blobPromises.push(this.verifyBlobAndMakePermanent(blob));
                    blobPromises.push(this.associateBlob(blob, write.uri));
                }
            }
        }
        await Promise.all(blobPromises);
    }
    async updateBlobTakedownStatus(blob, takedown) {
        const takedownRef = takedown.applied
            ? takedown.ref ?? new Date().toISOString()
            : null;
        await this.db.db
            .updateTable('blob')
            .set({ takedownRef })
            .where('cid', '=', blob.toString())
            .executeTakeFirst();
        try {
            if (takedown.applied) {
                await this.blobstore.quarantine(blob);
            }
            else {
                await this.blobstore.unquarantine(blob);
            }
        }
        catch (err) {
            if (!(err instanceof repo_1.BlobNotFoundError)) {
                throw err;
            }
        }
    }
    async deleteDereferencedBlobs(writes, skipBlobStore) {
        const deletes = writes.filter((w) => w.action === repo_1.WriteOpAction.Delete);
        const updates = writes.filter((w) => w.action === repo_1.WriteOpAction.Update);
        const uris = [...deletes, ...updates].map((w) => w.uri.toString());
        if (uris.length === 0)
            return;
        const deletedRepoBlobs = await this.db.db
            .deleteFrom('record_blob')
            .where('recordUri', 'in', uris)
            .returningAll()
            .execute();
        if (deletedRepoBlobs.length < 1)
            return;
        const deletedRepoBlobCids = deletedRepoBlobs.map((row) => row.blobCid);
        const duplicateCids = await this.db.db
            .selectFrom('record_blob')
            .where('blobCid', 'in', deletedRepoBlobCids)
            .select('blobCid')
            .execute();
        const newBlobCids = writes
            .map((w) => w.action === repo_1.WriteOpAction.Create || w.action === repo_1.WriteOpAction.Update
            ? w.blobs
            : [])
            .flat()
            .map((b) => b.cid.toString());
        const cidsToKeep = [
            ...newBlobCids,
            ...duplicateCids.map((row) => row.blobCid),
        ];
        const cidsToDelete = deletedRepoBlobCids.filter((cid) => !cidsToKeep.includes(cid));
        if (cidsToDelete.length < 1)
            return;
        await this.db.db
            .deleteFrom('blob')
            .where('cid', 'in', cidsToDelete)
            .execute();
        if (!skipBlobStore) {
            this.db.onCommit(() => {
                this.backgroundQueue.add(async () => {
                    await Promise.allSettled(cidsToDelete.map((cid) => this.blobstore.delete(cid_1.CID.parse(cid))));
                });
            });
        }
    }
    async verifyBlobAndMakePermanent(blob) {
        const found = await this.db.db
            .selectFrom('blob')
            .selectAll()
            .where('cid', '=', blob.cid.toString())
            .where('takedownRef', 'is', null)
            .executeTakeFirst();
        if (!found) {
            throw new xrpc_server_1.InvalidRequestError(`Could not find blob: ${blob.cid.toString()}`, 'BlobNotFound');
        }
        if (found.tempKey) {
            verifyBlob(blob, found);
            await this.blobstore.makePermanent(found.tempKey, blob.cid);
            await this.db.db
                .updateTable('blob')
                .set({ tempKey: null })
                .where('tempKey', '=', found.tempKey)
                .execute();
        }
    }
    async insertBlobMetadata(blob) {
        await this.db.db
            .insertInto('blob')
            .values({
            cid: blob.cid.toString(),
            mimeType: blob.mimeType,
            size: blob.size,
            createdAt: new Date().toISOString(),
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
    async associateBlob(blob, recordUri) {
        await this.db.db
            .insertInto('record_blob')
            .values({
            blobCid: blob.cid.toString(),
            recordUri: recordUri.toString(),
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
}
exports.BlobTransactor = BlobTransactor;
class CidNotFound extends Error {
    constructor(cid) {
        super(`cid not found: ${cid.toString()}`);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cid = cid;
    }
}
exports.CidNotFound = CidNotFound;
async function sha256Stream(toHash) {
    const hash = node_crypto_1.default.createHash('sha256');
    try {
        for await (const chunk of toHash) {
            hash.write(chunk);
        }
    }
    catch (err) {
        hash.end();
        throw err;
    }
    hash.end();
    return hash.read();
}
async function mimeTypeFromStream(blobStream) {
    const fileType = await (0, file_type_1.fromStream)(blobStream);
    blobStream.destroy();
    return fileType?.mime;
}
function acceptedMime(mime, accepted) {
    if (accepted.includes('*/*'))
        return true;
    const globs = accepted.filter((a) => a.endsWith('/*'));
    for (const glob of globs) {
        const [start] = glob.split('/');
        if (mime.startsWith(`${start}/`)) {
            return true;
        }
    }
    return accepted.includes(mime);
}
function verifyBlob(blob, found) {
    const throwInvalid = (msg, errName = 'InvalidBlob') => {
        throw new xrpc_server_1.InvalidRequestError(msg, errName);
    };
    if (blob.constraints.maxSize && found.size > blob.constraints.maxSize) {
        throwInvalid(`This file is too large. It is ${bytes_1.default.format(found.size)} but the maximum size is ${bytes_1.default.format(blob.constraints.maxSize)}.`, 'BlobTooLarge');
    }
    if (blob.mimeType !== found.mimeType) {
        throwInvalid(`Referenced Mimetype does not match stored blob. Expected: ${found.mimeType}, Got: ${blob.mimeType}`, 'InvalidMimeType');
    }
    if (blob.constraints.accept &&
        !acceptedMime(blob.mimeType, blob.constraints.accept)) {
        throwInvalid(`Wrong type of file. It is ${blob.mimeType} but it must match ${blob.constraints.accept}.`, 'InvalidMimeType');
    }
}
//# sourceMappingURL=transactor.js.map