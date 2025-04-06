import { z } from 'zod';
export declare const oauthResponseTypeSchema: z.ZodEnum<["code", "token", "none", "code id_token token", "code id_token", "code token", "id_token token", "id_token"]>;
export type OAuthResponseType = z.infer<typeof oauthResponseTypeSchema>;
//# sourceMappingURL=oauth-response-type.d.ts.map