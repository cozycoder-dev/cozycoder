export interface RepoBlock {
    cid: string;
    repoRev: string;
    size: number;
    content: Uint8Array;
}
export declare const tableName = "repo_block";
export type PartialDB = {
    [tableName]: RepoBlock;
};
//# sourceMappingURL=repo-block.d.ts.map