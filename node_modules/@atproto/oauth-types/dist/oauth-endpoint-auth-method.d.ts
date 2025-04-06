import { z } from 'zod';
export declare const oauthEndpointAuthMethod: z.ZodEnum<["client_secret_basic", "client_secret_jwt", "client_secret_post", "none", "private_key_jwt", "self_signed_tls_client_auth", "tls_client_auth"]>;
export type OauthEndpointAuthMethod = z.infer<typeof oauthEndpointAuthMethod>;
//# sourceMappingURL=oauth-endpoint-auth-method.d.ts.map