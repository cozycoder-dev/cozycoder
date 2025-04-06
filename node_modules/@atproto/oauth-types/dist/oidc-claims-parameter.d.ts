import { z } from 'zod';
export declare const oidcClaimsParameterSchema: z.ZodEnum<["auth_time", "nonce", "acr", "name", "family_name", "given_name", "middle_name", "nickname", "preferred_username", "gender", "picture", "profile", "website", "birthdate", "zoneinfo", "locale", "updated_at", "email", "email_verified", "phone_number", "phone_number_verified", "address"]>;
export type OidcClaimsParameter = z.infer<typeof oidcClaimsParameterSchema>;
//# sourceMappingURL=oidc-claims-parameter.d.ts.map