import { z } from 'zod';
export declare const oauthResponseModeSchema: z.ZodEnum<["query", "fragment", "form_post"]>;
export type OAuthResponseMode = z.infer<typeof oauthResponseModeSchema>;
//# sourceMappingURL=oauth-response-mode.d.ts.map