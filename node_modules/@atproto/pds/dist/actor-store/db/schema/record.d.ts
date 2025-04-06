export interface Record {
    uri: string;
    cid: string;
    collection: string;
    rkey: string;
    repoRev: string;
    indexedAt: string;
    takedownRef: string | null;
}
export declare const tableName = "record";
export type PartialDB = {
    [tableName]: Record;
};
//# sourceMappingURL=record.d.ts.map