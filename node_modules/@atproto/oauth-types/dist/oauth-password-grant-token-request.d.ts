import { z } from 'zod';
export declare const oauthPasswordGrantTokenRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"password">;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    grant_type: "password";
    username: string;
}, {
    password: string;
    grant_type: "password";
    username: string;
}>;
export type OAuthPasswordGrantTokenRequest = z.infer<typeof oauthPasswordGrantTokenRequestSchema>;
//# sourceMappingURL=oauth-password-grant-token-request.d.ts.map