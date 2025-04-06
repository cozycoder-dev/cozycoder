import { z } from 'zod';
export declare const oauthAuthorizationRequestJarSchema: z.ZodObject<{
    /**
     * AuthorizationRequest inside a JWT:
     * - "iat" is required and **MUST** be less than one minute
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc9101}
     */
    request: z.ZodUnion<[z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}`, string>]>;
}, "strip", z.ZodTypeAny, {
    request: `${string}.${string}` | `${string}.${string}.${string}`;
}, {
    request: string;
}>;
export type OAuthAuthorizationRequestJar = z.infer<typeof oauthAuthorizationRequestJarSchema>;
//# sourceMappingURL=oauth-authorization-request-jar.d.ts.map