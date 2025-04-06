import { z } from 'zod';
export declare const oauthGrantTypeSchema: z.ZodEnum<["authorization_code", "implicit", "refresh_token", "password", "client_credentials", "urn:ietf:params:oauth:grant-type:jwt-bearer", "urn:ietf:params:oauth:grant-type:saml2-bearer"]>;
export type OAuthGrantType = z.infer<typeof oauthGrantTypeSchema>;
//# sourceMappingURL=oauth-grant-type.d.ts.map