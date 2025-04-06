"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobReader = void 0;
const cid_1 = require("multiformats/cid");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../db/util");
class BlobReader {
    constructor(db, blobstore) {
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
    }
    async getBlobMetadata(cid) {
        const { ref } = this.db.db.dynamic;
        const found = await this.db.db
            .selectFrom('blob')
            .selectAll()
            .where('blob.cid', '=', cid.toString())
            .where((0, util_1.notSoftDeletedClause)(ref('blob')))
            .executeTakeFirst();
        if (!found) {
            throw new xrpc_server_1.InvalidRequestError('Blob not found');
        }
        return {
            size: found.size,
            mimeType: found.mimeType,
        };
    }
    async getBlob(cid) {
        const metadata = await this.getBlobMetadata(cid);
        let blobStream;
        try {
            blobStream = await this.blobstore.getStream(cid);
        }
        catch (err) {
            if (err instanceof repo_1.BlobNotFoundError) {
                throw new xrpc_server_1.InvalidRequestError('Blob not found');
            }
            throw err;
        }
        return {
            ...metadata,
            stream: blobStream,
        };
    }
    async listBlobs(opts) {
        const { since, cursor, limit } = opts;
        let builder = this.db.db
            .selectFrom('record_blob')
            .select('blobCid')
            .orderBy('blobCid', 'asc')
            .groupBy('blobCid')
            .limit(limit);
        if (since) {
            builder = builder
                .innerJoin('record', 'record.uri', 'record_blob.recordUri')
                .where('record.repoRev', '>', since);
        }
        if (cursor) {
            builder = builder.where('blobCid', '>', cursor);
        }
        const res = await builder.execute();
        return res.map((row) => row.blobCid);
    }
    async getBlobTakedownStatus(cid) {
        const res = await this.db.db
            .selectFrom('blob')
            .select('takedownRef')
            .where('cid', '=', cid.toString())
            .executeTakeFirst();
        if (!res)
            return null;
        return res.takedownRef
            ? { applied: true, ref: res.takedownRef }
            : { applied: false };
    }
    async getRecordsForBlob(cid) {
        const res = await this.db.db
            .selectFrom('record_blob')
            .where('blobCid', '=', cid.toString())
            .selectAll()
            .execute();
        return res.map((row) => row.recordUri);
    }
    async getBlobsForRecord(recordUri) {
        const res = await this.db.db
            .selectFrom('blob')
            .innerJoin('record_blob', 'record_blob.blobCid', 'blob.cid')
            .where('recordUri', '=', recordUri)
            .select('blob.cid')
            .execute();
        return res.map((row) => row.cid);
    }
    async blobCount() {
        const res = await this.db.db
            .selectFrom('blob')
            .select(util_1.countAll.as('count'))
            .executeTakeFirst();
        return res?.count ?? 0;
    }
    async recordBlobCount() {
        const { ref } = this.db.db.dynamic;
        const res = await this.db.db
            .selectFrom('record_blob')
            .select((0, util_1.countDistinct)(ref('blobCid')).as('count'))
            .executeTakeFirst();
        return res?.count ?? 0;
    }
    async listMissingBlobs(opts) {
        const { cursor, limit } = opts;
        let builder = this.db.db
            .selectFrom('record_blob')
            .whereNotExists((qb) => qb
            .selectFrom('blob')
            .selectAll()
            .whereRef('blob.cid', '=', 'record_blob.blobCid'))
            .selectAll()
            .orderBy('blobCid', 'asc')
            .groupBy('blobCid')
            .limit(limit);
        if (cursor) {
            builder = builder.where('blobCid', '>', cursor);
        }
        const res = await builder.execute();
        return res.map((row) => ({
            cid: row.blobCid,
            recordUri: row.recordUri,
        }));
    }
    async getBlobCids() {
        const blobRows = await this.db.db.selectFrom('blob').select('cid').execute();
        return blobRows.map((row) => cid_1.CID.parse(row.cid));
    }
}
exports.BlobReader = BlobReader;
//# sourceMappingURL=reader.js.map