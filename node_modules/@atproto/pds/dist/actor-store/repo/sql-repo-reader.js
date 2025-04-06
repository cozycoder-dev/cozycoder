"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoRootNotFoundError = exports.SqlRepoReader = void 0;
const kysely_1 = require("kysely");
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const repo_1 = require("@atproto/repo");
const db_1 = require("../../db");
class SqlRepoReader extends repo_1.ReadableBlockstore {
    constructor(db) {
        super();
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new repo_1.BlockMap()
        });
    }
    async getRoot() {
        const root = await this.getRootDetailed();
        return root.cid;
    }
    async getRootDetailed() {
        const res = await this.db.db
            .selectFrom('repo_root')
            .select(['cid', 'rev'])
            .limit(1)
            .executeTakeFirstOrThrow();
        return {
            cid: cid_1.CID.parse(res.cid),
            rev: res.rev,
        };
    }
    async getBytes(cid) {
        const cached = this.cache.get(cid);
        if (cached)
            return cached;
        const found = await this.db.db
            .selectFrom('repo_block')
            .where('repo_block.cid', '=', cid.toString())
            .select('content')
            .executeTakeFirst();
        if (!found)
            return null;
        this.cache.set(cid, found.content);
        return found.content;
    }
    async has(cid) {
        const got = await this.getBytes(cid);
        return !!got;
    }
    async getBlocks(cids) {
        const cached = this.cache.getMany(cids);
        if (cached.missing.length < 1)
            return cached;
        const missing = new repo_1.CidSet(cached.missing);
        const missingStr = cached.missing.map((c) => c.toString());
        const blocks = new repo_1.BlockMap();
        await Promise.all((0, common_1.chunkArray)(missingStr, 500).map(async (batch) => {
            const res = await this.db.db
                .selectFrom('repo_block')
                .where('repo_block.cid', 'in', batch)
                .select(['repo_block.cid as cid', 'repo_block.content as content'])
                .execute();
            for (const row of res) {
                const cid = cid_1.CID.parse(row.cid);
                blocks.set(cid, row.content);
                missing.delete(cid);
            }
        }));
        this.cache.addMap(blocks);
        blocks.addMap(cached.blocks);
        return { blocks, missing: missing.toList() };
    }
    async getCarStream(since) {
        const root = await this.getRoot();
        if (!root) {
            throw new RepoRootNotFoundError();
        }
        return (0, repo_1.writeCarStream)(root, this.iterateCarBlocks(since));
    }
    async *iterateCarBlocks(since) {
        let cursor = undefined;
        // allow us to write to car while fetching the next page
        do {
            const res = await this.getBlockRange(since, cursor);
            for (const row of res) {
                yield {
                    cid: cid_1.CID.parse(row.cid),
                    bytes: row.content,
                };
            }
            const lastRow = res.at(-1);
            if (lastRow && lastRow.repoRev) {
                cursor = {
                    cid: cid_1.CID.parse(lastRow.cid),
                    rev: lastRow.repoRev,
                };
            }
            else {
                cursor = undefined;
            }
        } while (cursor);
    }
    async getBlockRange(since, cursor) {
        const { ref } = this.db.db.dynamic;
        let builder = this.db.db
            .selectFrom('repo_block')
            .select(['cid', 'repoRev', 'content'])
            .orderBy('repoRev', 'desc')
            .orderBy('cid', 'desc')
            .limit(500);
        if (cursor) {
            // use this syntax to ensure we hit the index
            builder = builder.where((0, kysely_1.sql) `((${ref('repoRev')}, ${ref('cid')}) < (${cursor.rev}, ${cursor.cid.toString()}))`);
        }
        if (since) {
            builder = builder.where('repoRev', '>', since);
        }
        return builder.execute();
    }
    async countBlocks() {
        const res = await this.db.db
            .selectFrom('repo_block')
            .select(db_1.countAll.as('count'))
            .executeTakeFirst();
        return res?.count ?? 0;
    }
    async destroy() {
        throw new Error('Destruction of SQL repo storage not allowed at runtime');
    }
}
exports.SqlRepoReader = SqlRepoReader;
class RepoRootNotFoundError extends Error {
}
exports.RepoRootNotFoundError = RepoRootNotFoundError;
//# sourceMappingURL=sql-repo-reader.js.map