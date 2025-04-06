import { z } from 'zod';
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9396#section-2 | RFC 9396, Section 2}
 */
export declare const oauthAuthorizationDetailSchema: z.ZodObject<{
    type: z.ZodString;
    /**
     * An array of strings representing the location of the resource or RS. These
     * strings are typically URIs identifying the location of the RS.
     */
    locations: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, "many">>;
    /**
     * An array of strings representing the kinds of actions to be taken at the
     * resource.
     */
    actions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * An array of strings representing the kinds of data being requested from the
     * resource.
     */
    datatypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * A string identifier indicating a specific resource available at the API.
     */
    identifier: z.ZodOptional<z.ZodString>;
    /**
     * An array of strings representing the types or levels of privilege being
     * requested at the resource.
     */
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
}>;
export type OAuthAuthorizationDetail = z.infer<typeof oauthAuthorizationDetailSchema>;
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9396#section-2 | RFC 9396, Section 2}
 */
export declare const oauthAuthorizationDetailsSchema: z.ZodArray<z.ZodObject<{
    type: z.ZodString;
    /**
     * An array of strings representing the location of the resource or RS. These
     * strings are typically URIs identifying the location of the RS.
     */
    locations: z.ZodOptional<z.ZodArray<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, "many">>;
    /**
     * An array of strings representing the kinds of actions to be taken at the
     * resource.
     */
    actions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * An array of strings representing the kinds of data being requested from the
     * resource.
     */
    datatypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * A string identifier indicating a specific resource available at the API.
     */
    identifier: z.ZodOptional<z.ZodString>;
    /**
     * An array of strings representing the types or levels of privilege being
     * requested at the resource.
     */
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
}>, "many">;
export type OAuthAuthorizationDetails = z.infer<typeof oauthAuthorizationDetailsSchema>;
//# sourceMappingURL=oauth-authorization-details.d.ts.map