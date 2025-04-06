export interface RefreshToken {
    id: string;
    did: string;
    expiresAt: string;
    appPasswordName: string | null;
    nextId: string | null;
}
export declare const tableName = "refresh_token";
export type PartialDB = {
    [tableName]: RefreshToken;
};
//# sourceMappingURL=refresh-token.d.ts.map