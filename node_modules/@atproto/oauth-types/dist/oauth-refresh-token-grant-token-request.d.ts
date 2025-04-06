import { z } from 'zod';
export declare const oauthRefreshTokenGrantTokenRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"refresh_token">;
    refresh_token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refresh_token: string;
    grant_type: "refresh_token";
}, {
    refresh_token: string;
    grant_type: "refresh_token";
}>;
export type OAuthRefreshTokenGrantTokenRequest = z.infer<typeof oauthRefreshTokenGrantTokenRequestSchema>;
//# sourceMappingURL=oauth-refresh-token-grant-token-request.d.ts.map