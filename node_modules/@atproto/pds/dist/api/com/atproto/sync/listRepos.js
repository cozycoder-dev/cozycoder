"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeDidKeyset = void 0;
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_manager_1 = require("../../../../account-manager/account-manager");
const pagination_1 = require("../../../../db/pagination");
function default_1(server, ctx) {
    server.com.atproto.sync.listRepos(async ({ params }) => {
        const { limit, cursor } = params;
        const db = ctx.accountManager.db;
        const { ref } = db.db.dynamic;
        let builder = db.db
            .selectFrom('actor')
            .innerJoin('repo_root', 'repo_root.did', 'actor.did')
            .select([
            'actor.did as did',
            'repo_root.cid as head',
            'repo_root.rev as rev',
            'actor.createdAt as createdAt',
            'actor.deactivatedAt as deactivatedAt',
            'actor.takedownRef as takedownRef',
        ]);
        const keyset = new TimeDidKeyset(ref('actor.createdAt'), ref('actor.did'));
        builder = (0, pagination_1.paginate)(builder, {
            limit,
            cursor,
            keyset,
            direction: 'asc',
            tryIndex: true,
        });
        const res = await builder.execute();
        const repos = res.map((row) => {
            const { active, status } = (0, account_manager_1.formatAccountStatus)(row);
            return {
                did: row.did,
                head: row.head,
                rev: row.rev ?? '',
                active,
                status,
            };
        });
        return {
            encoding: 'application/json',
            body: {
                cursor: keyset.packFromResult(res),
                repos,
            },
        };
    });
}
class TimeDidKeyset extends pagination_1.GenericKeyset {
    labelResult(result) {
        return { primary: result.createdAt, secondary: result.did };
    }
    labeledResultToCursor(labeled) {
        return {
            primary: new Date(labeled.primary).getTime().toString(),
            secondary: labeled.secondary,
        };
    }
    cursorToLabeledResult(cursor) {
        const primaryDate = new Date(parseInt(cursor.primary, 10));
        if (isNaN(primaryDate.getTime())) {
            throw new xrpc_server_1.InvalidRequestError('Malformed cursor');
        }
        return {
            primary: primaryDate.toISOString(),
            secondary: cursor.secondary,
        };
    }
}
exports.TimeDidKeyset = TimeDidKeyset;
//# sourceMappingURL=listRepos.js.map