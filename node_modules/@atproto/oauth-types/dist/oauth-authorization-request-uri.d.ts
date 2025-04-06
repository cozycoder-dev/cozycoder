import { z } from 'zod';
export declare const oauthAuthorizationRequestUriSchema: z.ZodObject<{
    request_uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    request_uri: string;
}, {
    request_uri: string;
}>;
export type OAuthAuthorizationRequestUri = z.infer<typeof oauthAuthorizationRequestUriSchema>;
//# sourceMappingURL=oauth-authorization-request-uri.d.ts.map