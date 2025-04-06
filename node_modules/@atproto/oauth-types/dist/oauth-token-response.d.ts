import { z } from 'zod';
/**
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1 | RFC 6749 (OAuth2), Section 5.1}
 */
export declare const oauthTokenResponseSchema: z.ZodObject<{
    access_token: z.ZodString;
    token_type: z.ZodUnion<[z.ZodEffects<z.ZodString, "DPoP", string>, z.ZodEffects<z.ZodString, "Bearer", string>]>;
    scope: z.ZodOptional<z.ZodString>;
    refresh_token: z.ZodOptional<z.ZodString>;
    expires_in: z.ZodOptional<z.ZodNumber>;
    id_token: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>>;
    authorization_details: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        locations: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, "many">>;
        actions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        datatypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        identifier: z.ZodOptional<z.ZodString>;
        privileges: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        locations?: `${string}:${string}`[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }, {
        type: string;
        locations?: string[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }>, "many">>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    access_token: z.ZodString;
    token_type: z.ZodUnion<[z.ZodEffects<z.ZodString, "DPoP", string>, z.ZodEffects<z.ZodString, "Bearer", string>]>;
    scope: z.ZodOptional<z.ZodString>;
    refresh_token: z.ZodOptional<z.ZodString>;
    expires_in: z.ZodOptional<z.ZodNumber>;
    id_token: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>>;
    authorization_details: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        locations: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, "many">>;
        actions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        datatypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        identifier: z.ZodOptional<z.ZodString>;
        privileges: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        locations?: `${string}:${string}`[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }, {
        type: string;
        locations?: string[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    access_token: z.ZodString;
    token_type: z.ZodUnion<[z.ZodEffects<z.ZodString, "DPoP", string>, z.ZodEffects<z.ZodString, "Bearer", string>]>;
    scope: z.ZodOptional<z.ZodString>;
    refresh_token: z.ZodOptional<z.ZodString>;
    expires_in: z.ZodOptional<z.ZodNumber>;
    id_token: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, `${string}.${string}.${string}`, string>>;
    authorization_details: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        locations: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, "many">>;
        actions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        datatypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        identifier: z.ZodOptional<z.ZodString>;
        privileges: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        locations?: `${string}:${string}`[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }, {
        type: string;
        locations?: string[] | undefined;
        actions?: string[] | undefined;
        datatypes?: string[] | undefined;
        identifier?: string | undefined;
        privileges?: string[] | undefined;
    }>, "many">>;
}, z.ZodTypeAny, "passthrough">>;
/**
 * @see {@link oauthTokenResponseSchema}
 */
export type OAuthTokenResponse = z.infer<typeof oauthTokenResponseSchema>;
//# sourceMappingURL=oauth-token-response.d.ts.map