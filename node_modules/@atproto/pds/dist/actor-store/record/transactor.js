"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTransactor = void 0;
const repo_1 = require("@atproto/repo");
const logger_1 = require("../../logger");
const reader_1 = require("./reader");
class RecordTransactor extends reader_1.RecordReader {
    constructor(db, blobstore) {
        super(db);
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
    async indexRecord(uri, cid, record, action = repo_1.WriteOpAction.Create, repoRev, timestamp) {
        logger_1.dbLogger.debug({ uri }, 'indexing record');
        const row = {
            uri: uri.toString(),
            cid: cid.toString(),
            collection: uri.collection,
            rkey: uri.rkey,
            repoRev: repoRev,
            indexedAt: timestamp || new Date().toISOString(),
        };
        if (!uri.hostname.startsWith('did:')) {
            throw new Error('Expected indexed URI to contain DID');
        }
        else if (row.collection.length < 1) {
            throw new Error('Expected indexed URI to contain a collection');
        }
        else if (row.rkey.length < 1) {
            throw new Error('Expected indexed URI to contain a record key');
        }
        // Track current version of record
        await this.db.db
            .insertInto('record')
            .values(row)
            .onConflict((oc) => oc.column('uri').doUpdateSet({
            cid: row.cid,
            repoRev: repoRev,
            indexedAt: row.indexedAt,
        }))
            .execute();
        if (record !== null) {
            // Maintain backlinks
            const backlinks = (0, reader_1.getBacklinks)(uri, record);
            if (action === repo_1.WriteOpAction.Update) {
                // On update just recreate backlinks from scratch for the record, so we can clear out
                // the old ones. E.g. for weird cases like updating a follow to be for a different did.
                await this.removeBacklinksByUri(uri);
            }
            await this.addBacklinks(backlinks);
        }
        logger_1.dbLogger.info({ uri }, 'indexed record');
    }
    async deleteRecord(uri) {
        logger_1.dbLogger.debug({ uri }, 'deleting indexed record');
        const deleteQuery = this.db.db
            .deleteFrom('record')
            .where('uri', '=', uri.toString());
        const backlinkQuery = this.db.db
            .deleteFrom('backlink')
            .where('uri', '=', uri.toString());
        await Promise.all([deleteQuery.execute(), backlinkQuery.execute()]);
        logger_1.dbLogger.info({ uri }, 'deleted indexed record');
    }
    async removeBacklinksByUri(uri) {
        await this.db.db
            .deleteFrom('backlink')
            .where('uri', '=', uri.toString())
            .execute();
    }
    async addBacklinks(backlinks) {
        if (backlinks.length === 0)
            return;
        await this.db.db
            .insertInto('backlink')
            .values(backlinks)
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
    async updateRecordTakedownStatus(uri, takedown) {
        const takedownRef = takedown.applied
            ? takedown.ref ?? new Date().toISOString()
            : null;
        await this.db.db
            .updateTable('record')
            .set({ takedownRef })
            .where('uri', '=', uri.toString())
            .executeTakeFirst();
    }
}
exports.RecordTransactor = RecordTransactor;
//# sourceMappingURL=transactor.js.map