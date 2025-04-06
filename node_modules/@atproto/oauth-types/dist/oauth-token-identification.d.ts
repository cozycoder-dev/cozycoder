import { z } from 'zod';
export declare const oauthTokenIdentificationSchema: z.ZodObject<{
    token: z.ZodUnion<[z.ZodString, z.ZodString]>;
    token_type_hint: z.ZodOptional<z.ZodEnum<["access_token", "refresh_token"]>>;
}, "strip", z.ZodTypeAny, {
    token: string;
    token_type_hint?: "refresh_token" | "access_token" | undefined;
}, {
    token: string;
    token_type_hint?: "refresh_token" | "access_token" | undefined;
}>;
export type OAuthTokenIdentification = z.infer<typeof oauthTokenIdentificationSchema>;
//# sourceMappingURL=oauth-token-identification.d.ts.map