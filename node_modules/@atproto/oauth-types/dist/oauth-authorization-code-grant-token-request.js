"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationCodeGrantTokenRequestSchema = void 0;
const zod_1 = require("zod");
const oauth_redirect_uri_js_1 = require("./oauth-redirect-uri.js");
exports.oauthAuthorizationCodeGrantTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('authorization_code'),
    code: zod_1.z.string().min(1),
    redirect_uri: oauth_redirect_uri_js_1.oauthRedirectUriSchema,
    /** @see {@link https://datatracker.ietf.org/doc/html/rfc7636#section-4.1} */
    code_verifier: zod_1.z
        .string()
        .min(43)
        .max(128)
        .regex(/^[a-zA-Z0-9-._~]+$/)
        .optional(),
});
//# sourceMappingURL=oauth-authorization-code-grant-token-request.js.map