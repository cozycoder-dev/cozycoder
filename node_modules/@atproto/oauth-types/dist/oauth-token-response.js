"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthTokenResponseSchema = void 0;
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
const oauth_authorization_details_js_1 = require("./oauth-authorization-details.js");
const oauth_token_type_js_1 = require("./oauth-token-type.js");
/**
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1 | RFC 6749 (OAuth2), Section 5.1}
 */
exports.oauthTokenResponseSchema = zod_1.z
    .object({
    // https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1
    access_token: zod_1.z.string(),
    token_type: oauth_token_type_js_1.oauthTokenTypeSchema,
    scope: zod_1.z.string().optional(),
    refresh_token: zod_1.z.string().optional(),
    expires_in: zod_1.z.number().optional(),
    // https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
    id_token: jwk_1.signedJwtSchema.optional(),
    // https://datatracker.ietf.org/doc/html/rfc9396#name-enriched-authorization-deta
    authorization_details: oauth_authorization_details_js_1.oauthAuthorizationDetailsSchema.optional(),
})
    // https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1
    // > The client MUST ignore unrecognized value names in the response.
    .passthrough();
//# sourceMappingURL=oauth-token-response.js.map