import { z } from 'zod';
export declare const oidcEntityTypeSchema: z.ZodEnum<["userinfo", "id_token"]>;
export type OidcEntityType = z.infer<typeof oidcEntityTypeSchema>;
//# sourceMappingURL=oidc-entity-type.d.ts.map