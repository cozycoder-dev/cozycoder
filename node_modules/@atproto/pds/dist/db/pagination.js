"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.TimeCidKeyset = exports.GenericKeyset = void 0;
const kysely_1 = require("kysely");
const xrpc_server_1 = require("@atproto/xrpc-server");
/**
 * The GenericKeyset is an abstract class that sets-up the interface and partial implementation
 * of a keyset-paginated cursor with two parts. There are three types involved:
 *  - Result: a raw result (i.e. a row from the db) containing data that will make-up a cursor.
 *    - E.g. { createdAt: '2022-01-01T12:00:00Z', cid: 'bafyx' }
 *  - LabeledResult: a Result processed such that the "primary" and "secondary" parts of the cursor are labeled.
 *    - E.g. { primary: '2022-01-01T12:00:00Z', secondary: 'bafyx' }
 *  - Cursor: the two string parts that make-up the packed/string cursor.
 *    - E.g. packed cursor '1641038400000::bafyx' in parts { primary: '1641038400000', secondary: 'bafyx' }
 *
 * These types relate as such. Implementers define the relations marked with a *:
 *   Result -*-> LabeledResult <-*-> Cursor <--> packed/string cursor
 *                     ↳ SQL Condition
 */
class GenericKeyset {
    constructor(primary, secondary) {
        Object.defineProperty(this, "primary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: primary
        });
        Object.defineProperty(this, "secondary", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: secondary
        });
    }
    packFromResult(results) {
        const result = Array.isArray(results) ? results.at(-1) : results;
        if (!result)
            return;
        return this.pack(this.labelResult(result));
    }
    pack(labeled) {
        if (!labeled)
            return;
        const cursor = this.labeledResultToCursor(labeled);
        return this.packCursor(cursor);
    }
    unpack(cursorStr) {
        const cursor = this.unpackCursor(cursorStr);
        if (!cursor)
            return;
        return this.cursorToLabeledResult(cursor);
    }
    packCursor(cursor) {
        if (!cursor)
            return;
        return `${cursor.primary}::${cursor.secondary}`;
    }
    unpackCursor(cursorStr) {
        if (!cursorStr)
            return;
        const result = cursorStr.split('::');
        const [primary, secondary, ...others] = result;
        if (!primary || !secondary || others.length > 0) {
            throw new xrpc_server_1.InvalidRequestError('Malformed cursor');
        }
        return {
            primary,
            secondary,
        };
    }
    getSql(labeled, direction, tryIndex) {
        if (labeled === undefined)
            return;
        if (tryIndex) {
            // The tryIndex param will likely disappear and become the default implementation: here for now for gradual rollout query-by-query.
            if (direction === 'asc') {
                return (0, kysely_1.sql) `((${this.primary}, ${this.secondary}) > (${labeled.primary}, ${labeled.secondary}))`;
            }
            else {
                return (0, kysely_1.sql) `((${this.primary}, ${this.secondary}) < (${labeled.primary}, ${labeled.secondary}))`;
            }
        }
        else {
            // @NOTE this implementation can struggle to use an index on (primary, secondary) for pagination due to the "or" usage.
            if (direction === 'asc') {
                return (0, kysely_1.sql) `((${this.primary} > ${labeled.primary}) or (${this.primary} = ${labeled.primary} and ${this.secondary} > ${labeled.secondary}))`;
            }
            else {
                return (0, kysely_1.sql) `((${this.primary} < ${labeled.primary}) or (${this.primary} = ${labeled.primary} and ${this.secondary} < ${labeled.secondary}))`;
            }
        }
    }
}
exports.GenericKeyset = GenericKeyset;
class TimeCidKeyset extends GenericKeyset {
    labelResult(result) {
        return { primary: result.createdAt, secondary: result.cid };
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
exports.TimeCidKeyset = TimeCidKeyset;
const paginate = (qb, opts) => {
    const { limit, cursor, keyset, direction = 'desc', tryIndex } = opts;
    const keysetSql = keyset.getSql(keyset.unpack(cursor), direction, tryIndex);
    return qb
        .if(!!limit, (q) => q.limit(limit))
        .orderBy(keyset.primary, direction)
        .orderBy(keyset.secondary, direction)
        .if(!!keysetSql, (qb) => (keysetSql ? qb.where(keysetSql) : qb));
};
exports.paginate = paginate;
//# sourceMappingURL=pagination.js.map