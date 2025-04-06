import { z } from 'zod';
export declare const oauthClientCredentialsGrantTokenRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"client_credentials">;
}, "strip", z.ZodTypeAny, {
    grant_type: "client_credentials";
}, {
    grant_type: "client_credentials";
}>;
export type OAuthClientCredentialsGrantTokenRequest = z.infer<typeof oauthClientCredentialsGrantTokenRequestSchema>;
//# sourceMappingURL=oauth-client-credentials-grant-token-request.d.ts.map