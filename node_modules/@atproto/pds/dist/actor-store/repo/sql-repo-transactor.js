"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepoTransactor = void 0;
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const repo_1 = require("@atproto/repo");
const sql_repo_reader_1 = require("./sql-repo-reader");
class SqlRepoTransactor extends sql_repo_reader_1.SqlRepoReader {
    constructor(db, did, now) {
        super(db);
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new repo_1.BlockMap()
        });
        Object.defineProperty(this, "now", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.now = now ?? new Date().toISOString();
    }
    // proactively cache all blocks from a particular commit (to prevent multiple roundtrips)
    async cacheRev(rev) {
        const res = await this.db.db
            .selectFrom('repo_block')
            .where('repoRev', '=', rev)
            .select(['repo_block.cid', 'repo_block.content'])
            .limit(15)
            .execute();
        for (const row of res) {
            this.cache.set(cid_1.CID.parse(row.cid), row.content);
        }
    }
    async putBlock(cid, block, rev) {
        await this.db.db
            .insertInto('repo_block')
            .values({
            cid: cid.toString(),
            repoRev: rev,
            size: block.length,
            content: block,
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
        this.cache.set(cid, block);
    }
    async putMany(toPut, rev) {
        const blocks = [];
        toPut.forEach((bytes, cid) => {
            blocks.push({
                cid: cid.toString(),
                repoRev: rev,
                size: bytes.length,
                content: bytes,
            });
        });
        await Promise.all((0, common_1.chunkArray)(blocks, 50).map((batch) => this.db.db
            .insertInto('repo_block')
            .values(batch)
            .onConflict((oc) => oc.doNothing())
            .execute()));
    }
    async deleteMany(cids) {
        if (cids.length < 1)
            return;
        const cidStrs = cids.map((c) => c.toString());
        await this.db.db
            .deleteFrom('repo_block')
            .where('cid', 'in', cidStrs)
            .execute();
    }
    async applyCommit(commit, isCreate) {
        await Promise.all([
            this.updateRoot(commit.cid, commit.rev, isCreate),
            this.putMany(commit.newBlocks, commit.rev),
            this.deleteMany(commit.removedCids.toList()),
        ]);
    }
    async updateRoot(cid, rev, isCreate = false) {
        if (isCreate) {
            await this.db.db
                .insertInto('repo_root')
                .values({
                did: this.did,
                cid: cid.toString(),
                rev: rev,
                indexedAt: this.now,
            })
                .execute();
        }
        else {
            await this.db.db
                .updateTable('repo_root')
                .set({
                cid: cid.toString(),
                rev: rev,
                indexedAt: this.now,
            })
                .execute();
        }
    }
    async destroy() {
        throw new Error('Destruction of SQL repo storage not allowed at runtime');
    }
}
exports.SqlRepoTransactor = SqlRepoTransactor;
//# sourceMappingURL=sql-repo-transactor.js.map