"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoTransactor = void 0;
const cid_1 = require("multiformats/cid");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const repo_2 = require("../../repo");
const types_1 = require("../../repo/types");
const transactor_1 = require("../blob/transactor");
const transactor_2 = require("../record/transactor");
const reader_1 = require("./reader");
const sql_repo_transactor_1 = require("./sql-repo-transactor");
class RepoTransactor extends reader_1.RepoReader {
    constructor(db, blobstore, did, signingKey, backgroundQueue, now = new Date().toISOString()) {
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
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "signingKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: signingKey
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: backgroundQueue
        });
        Object.defineProperty(this, "now", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: now
        });
        Object.defineProperty(this, "blob", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "record", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.blob = new transactor_1.BlobTransactor(db, blobstore, backgroundQueue);
        this.record = new transactor_2.RecordTransactor(db, blobstore);
        this.storage = new sql_repo_transactor_1.SqlRepoTransactor(db, did, now);
    }
    async maybeLoadRepo() {
        const res = await this.db.db
            .selectFrom('repo_root')
            .select('cid')
            .limit(1)
            .executeTakeFirst();
        return res ? repo_1.Repo.load(this.storage, cid_1.CID.parse(res.cid)) : null;
    }
    async createRepo(writes) {
        this.db.assertTransaction();
        const commit = await repo_1.Repo.formatInitCommit(this.storage, this.did, this.signingKey, writes.map(repo_2.createWriteToOp));
        await Promise.all([
            this.storage.applyCommit(commit, true),
            this.indexWrites(writes, commit.rev),
            this.blob.processWriteBlobs(commit.rev, writes),
        ]);
        const ops = writes.map((w) => ({
            action: 'create',
            path: (0, repo_1.formatDataKey)(w.uri.collection, w.uri.rkey),
            cid: w.cid,
        }));
        return {
            ...commit,
            ops,
            prevData: null,
        };
    }
    async processWrites(writes, swapCommitCid) {
        this.db.assertTransaction();
        if (writes.length > 200) {
            throw new xrpc_server_1.InvalidRequestError('Too many writes. Max: 200');
        }
        const commit = await this.formatCommit(writes, swapCommitCid);
        // Do not allow commits > 2MB
        if (commit.relevantBlocks.byteSize > 2000000) {
            throw new xrpc_server_1.InvalidRequestError('Too many writes. Max event size: 2MB');
        }
        await Promise.all([
            // persist the commit to repo storage
            this.storage.applyCommit(commit),
            // & send to indexing
            this.indexWrites(writes, commit.rev),
            // process blobs
            this.blob.processWriteBlobs(commit.rev, writes),
        ]);
        return commit;
    }
    async formatCommit(writes, swapCommit) {
        // this is not in a txn, so this won't actually hold the lock,
        // we just check if it is currently held by another txn
        const currRoot = await this.storage.getRootDetailed();
        if (!currRoot) {
            throw new xrpc_server_1.InvalidRequestError(`No repo root found for ${this.did}`);
        }
        if (swapCommit && !currRoot.cid.equals(swapCommit)) {
            throw new types_1.BadCommitSwapError(currRoot.cid);
        }
        // cache last commit since there's likely overlap
        await this.storage.cacheRev(currRoot.rev);
        const newRecordCids = [];
        const delAndUpdateUris = [];
        const commitOps = [];
        for (const write of writes) {
            const { action, uri, swapCid } = write;
            if (action !== repo_1.WriteOpAction.Delete) {
                newRecordCids.push(write.cid);
            }
            if (action !== repo_1.WriteOpAction.Create) {
                delAndUpdateUris.push(uri);
            }
            const record = await this.record.getRecord(uri, null, true);
            const currRecord = record ? cid_1.CID.parse(record.cid) : null;
            const op = {
                action,
                path: (0, repo_1.formatDataKey)(uri.collection, uri.rkey),
                cid: write.action === repo_1.WriteOpAction.Delete ? null : write.cid,
            };
            if (currRecord) {
                op.prev = currRecord;
            }
            commitOps.push(op);
            if (swapCid !== undefined) {
                if (action === repo_1.WriteOpAction.Create && swapCid !== null) {
                    throw new types_1.BadRecordSwapError(currRecord); // There should be no current record for a create
                }
                if (action === repo_1.WriteOpAction.Update && swapCid === null) {
                    throw new types_1.BadRecordSwapError(currRecord); // There should be a current record for an update
                }
                if (action === repo_1.WriteOpAction.Delete && swapCid === null) {
                    throw new types_1.BadRecordSwapError(currRecord); // There should be a current record for a delete
                }
                if ((currRecord || swapCid) && !currRecord?.equals(swapCid)) {
                    throw new types_1.BadRecordSwapError(currRecord);
                }
            }
        }
        const repo = await repo_1.Repo.load(this.storage, currRoot.cid);
        const prevData = repo.commit.data;
        const writeOps = writes.map(repo_2.writeToOp);
        const commit = await repo.formatCommit(writeOps, this.signingKey);
        // find blocks that would be deleted but are referenced by another record
        const dupeRecordCids = await this.getDuplicateRecordCids(commit.removedCids.toList(), delAndUpdateUris);
        for (const cid of dupeRecordCids) {
            commit.removedCids.delete(cid);
        }
        // find blocks that are relevant to ops but not included in diff
        // (for instance a record that was moved but cid stayed the same)
        const newRecordBlocks = commit.relevantBlocks.getMany(newRecordCids);
        if (newRecordBlocks.missing.length > 0) {
            const missingBlocks = await this.storage.getBlocks(newRecordBlocks.missing);
            commit.relevantBlocks.addMap(missingBlocks.blocks);
        }
        return {
            ...commit,
            ops: commitOps,
            prevData,
        };
    }
    async indexWrites(writes, rev) {
        this.db.assertTransaction();
        await Promise.all(writes.map(async (write) => {
            if (write.action === repo_1.WriteOpAction.Create ||
                write.action === repo_1.WriteOpAction.Update) {
                await this.record.indexRecord(write.uri, write.cid, write.record, write.action, rev, this.now);
            }
            else if (write.action === repo_1.WriteOpAction.Delete) {
                await this.record.deleteRecord(write.uri);
            }
        }));
    }
    async getDuplicateRecordCids(cids, touchedUris) {
        if (touchedUris.length === 0 || cids.length === 0) {
            return [];
        }
        const cidStrs = cids.map((c) => c.toString());
        const uriStrs = touchedUris.map((u) => u.toString());
        const res = await this.db.db
            .selectFrom('record')
            .where('cid', 'in', cidStrs)
            .where('uri', 'not in', uriStrs)
            .select('cid')
            .execute();
        return res.map((row) => cid_1.CID.parse(row.cid));
    }
}
exports.RepoTransactor = RepoTransactor;
//# sourceMappingURL=transactor.js.map