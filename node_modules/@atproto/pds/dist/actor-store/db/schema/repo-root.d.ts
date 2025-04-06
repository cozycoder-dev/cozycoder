export interface RepoRoot {
    did: string;
    cid: string;
    rev: string;
    indexedAt: string;
}
declare const tableName = "repo_root";
export type PartialDB = {
    [tableName]: RepoRoot;
};
export {};
//# sourceMappingURL=repo-root.d.ts.map