import { AnyQb, DbRef } from './util';
export type Cursor = {
    primary: string;
    secondary: string;
};
export type LabeledResult = {
    primary: string | number;
    secondary: string | number;
};
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
export declare abstract class GenericKeyset<R, LR extends LabeledResult> {
    primary: DbRef;
    secondary: DbRef;
    constructor(primary: DbRef, secondary: DbRef);
    abstract labelResult(result: R): LR;
    abstract labeledResultToCursor(labeled: LR): Cursor;
    abstract cursorToLabeledResult(cursor: Cursor): LR;
    packFromResult(results: R | R[]): string | undefined;
    pack(labeled?: LR): string | undefined;
    unpack(cursorStr?: string): LR | undefined;
    packCursor(cursor?: Cursor): string | undefined;
    unpackCursor(cursorStr?: string): Cursor | undefined;
    getSql(labeled?: LR, direction?: 'asc' | 'desc', tryIndex?: boolean): import("kysely").RawBuilder<unknown> | undefined;
}
type CreatedAtCidResult = {
    createdAt: string;
    cid: string;
};
type TimeCidLabeledResult = Cursor;
export declare class TimeCidKeyset<TimeCidResult = CreatedAtCidResult> extends GenericKeyset<TimeCidResult, TimeCidLabeledResult> {
    labelResult(result: TimeCidResult): TimeCidLabeledResult;
    labeledResultToCursor(labeled: TimeCidLabeledResult): {
        primary: string;
        secondary: string;
    };
    cursorToLabeledResult(cursor: Cursor): {
        primary: string;
        secondary: string;
    };
}
export declare const paginate: <QB extends AnyQb, K extends GenericKeyset<unknown, any>>(qb: QB, opts: {
    limit?: number;
    cursor?: string;
    direction?: "asc" | "desc";
    keyset: K;
    tryIndex?: boolean;
}) => QB;
export {};
//# sourceMappingURL=pagination.d.ts.map