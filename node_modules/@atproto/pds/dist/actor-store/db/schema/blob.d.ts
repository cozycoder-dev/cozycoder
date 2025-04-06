export interface Blob {
    cid: string;
    mimeType: string;
    size: number;
    tempKey: string | null;
    width: number | null;
    height: number | null;
    createdAt: string;
    takedownRef: string | null;
}
export declare const tableName = "blob";
export type PartialDB = {
    [tableName]: Blob;
};
//# sourceMappingURL=blob.d.ts.map