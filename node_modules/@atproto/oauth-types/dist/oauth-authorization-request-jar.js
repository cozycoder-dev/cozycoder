"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationRequestJarSchema = void 0;
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
exports.oauthAuthorizationRequestJarSchema = zod_1.z.object({
    /**
     * AuthorizationRequest inside a JWT:
     * - "iat" is required and **MUST** be less than one minute
     *
     * @see {@link https://datatracker.ietf.org/doc/html/rfc9101}
     */
    request: zod_1.z.union([jwk_1.signedJwtSchema, jwk_1.unsignedJwtSchema]),
});
//# sourceMappingURL=oauth-authorization-request-jar.js.map