import { z } from 'zod';
export declare const oauthTokenTypeSchema: z.ZodUnion<[z.ZodEffects<z.ZodString, "DPoP", string>, z.ZodEffects<z.ZodString, "Bearer", string>]>;
export type OAuthTokenType = z.infer<typeof oauthTokenTypeSchema>;
//# sourceMappingURL=oauth-token-type.d.ts.map