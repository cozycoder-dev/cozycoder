"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthClientCredentialsSchema = exports.oauthClientCredentialsNoneSchema = exports.oauthClientCredentialsSecretPostSchema = exports.oauthClientCredentialsJwtBearerSchema = void 0;
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
const constants_js_1 = require("./constants.js");
const oauth_client_id_js_1 = require("./oauth-client-id.js");
exports.oauthClientCredentialsJwtBearerSchema = zod_1.z.object({
    client_id: oauth_client_id_js_1.oauthClientIdSchema,
    client_assertion_type: zod_1.z.literal(constants_js_1.CLIENT_ASSERTION_TYPE_JWT_BEARER),
    /**
     * - "sub" the subject MUST be the "client_id" of the OAuth client
     * - "iat" is required and MUST be less than one minute
     * - "aud" must containing a value that identifies the authorization server
     * - The JWT MAY contain a "jti" (JWT ID) claim that provides a unique identifier for the token.
     * - Note that the authorization server may reject JWTs with an "exp" claim value that is unreasonably far in the future.
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7523#section-3}
     */
    client_assertion: jwk_1.signedJwtSchema,
});
exports.oauthClientCredentialsSecretPostSchema = zod_1.z.object({
    client_id: oauth_client_id_js_1.oauthClientIdSchema,
    client_secret: zod_1.z.string(),
});
exports.oauthClientCredentialsNoneSchema = zod_1.z.object({
    client_id: oauth_client_id_js_1.oauthClientIdSchema,
});
//
exports.oauthClientCredentialsSchema = zod_1.z.union([
    exports.oauthClientCredentialsJwtBearerSchema,
    exports.oauthClientCredentialsSecretPostSchema,
    // Must be last since it is less specific
    exports.oauthClientCredentialsNoneSchema,
]);
//# sourceMappingURL=oauth-client-credentials.js.map