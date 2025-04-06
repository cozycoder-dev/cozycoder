import { z } from 'zod';
export declare const oauthClientCredentialsJwtBearerSchema: z.ZodObject<{
    client_id: z.ZodString;
    client_assertion_type: z.ZodLiteral<"urn:ietf:params:oauth:client-assertion-type:jwt-bearer">;
    /**
     * - "sub" the subject MUST be the "client_id" of the OAuth client
     * - "iat" is required and MUST be less than one minute
     * - "aud" must containing a value that identifies the authorization server
     * - The JWT MAY contain a "jti" (JWT ID) claim that provides a unique identifier for the token.
     * - Note that the authorization server may reject JWTs with an "exp" claim value that is unreasonably far in the future.
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7523#section-3}
     */
    client_assertion: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>;
}, "strip", z.ZodTypeAny, {
    client_id: string;
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    client_assertion: `${string}.${string}.${string}`;
}, {
    client_id: string;
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    client_assertion: string;
}>;
export type OAuthClientCredentialsJwtBearer = z.infer<typeof oauthClientCredentialsJwtBearerSchema>;
export declare const oauthClientCredentialsSecretPostSchema: z.ZodObject<{
    client_id: z.ZodString;
    client_secret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    client_id: string;
    client_secret: string;
}, {
    client_id: string;
    client_secret: string;
}>;
export type OAuthClientCredentialsSecretPost = z.infer<typeof oauthClientCredentialsSecretPostSchema>;
export declare const oauthClientCredentialsNoneSchema: z.ZodObject<{
    client_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    client_id: string;
}, {
    client_id: string;
}>;
export type OAuthClientCredentialsNone = z.infer<typeof oauthClientCredentialsNoneSchema>;
export declare const oauthClientCredentialsSchema: z.ZodUnion<[z.ZodObject<{
    client_id: z.ZodString;
    client_assertion_type: z.ZodLiteral<"urn:ietf:params:oauth:client-assertion-type:jwt-bearer">;
    /**
     * - "sub" the subject MUST be the "client_id" of the OAuth client
     * - "iat" is required and MUST be less than one minute
     * - "aud" must containing a value that identifies the authorization server
     * - The JWT MAY contain a "jti" (JWT ID) claim that provides a unique identifier for the token.
     * - Note that the authorization server may reject JWTs with an "exp" claim value that is unreasonably far in the future.
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7523#section-3}
     */
    client_assertion: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>;
}, "strip", z.ZodTypeAny, {
    client_id: string;
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    client_assertion: `${string}.${string}.${string}`;
}, {
    client_id: string;
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
    client_assertion: string;
}>, z.ZodObject<{
    client_id: z.ZodString;
    client_secret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    client_id: string;
    client_secret: string;
}, {
    client_id: string;
    client_secret: string;
}>, z.ZodObject<{
    client_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    client_id: string;
}, {
    client_id: string;
}>]>;
export type OAuthClientCredentials = z.infer<typeof oauthClientCredentialsSchema>;
//# sourceMappingURL=oauth-client-credentials.d.ts.map