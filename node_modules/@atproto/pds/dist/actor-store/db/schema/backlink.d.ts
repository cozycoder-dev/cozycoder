export interface Backlink {
    uri: string;
    path: string;
    linkTo: string;
}
export declare const tableName = "backlink";
export type PartialDB = {
    [tableName]: Backlink;
};
//# sourceMappingURL=backlink.d.ts.map