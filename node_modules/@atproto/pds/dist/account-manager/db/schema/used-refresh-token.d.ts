import { Selectable } from 'kysely';
import { RefreshToken } from '@atproto/oauth-provider';
export interface UsedRefreshToken {
    tokenId: number;
    refreshToken: RefreshToken;
}
export type UsedRefreshTokenEntry = Selectable<UsedRefreshToken>;
export declare const tableName = "used_refresh_token";
export type PartialDB = {
    [tableName]: UsedRefreshToken;
};
//# sourceMappingURL=used-refresh-token.d.ts.map