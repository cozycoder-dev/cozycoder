"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthTokenIdentificationSchema = void 0;
const zod_1 = require("zod");
const oauth_access_token_js_1 = require("./oauth-access-token.js");
const oauth_refresh_token_js_1 = require("./oauth-refresh-token.js");
exports.oauthTokenIdentificationSchema = zod_1.z.object({
    token: zod_1.z.union([oauth_access_token_js_1.oauthAccessTokenSchema, oauth_refresh_token_js_1.oauthRefreshTokenSchema]),
    token_type_hint: zod_1.z.enum(['access_token', 'refresh_token']).optional(),
});
//# sourceMappingURL=oauth-token-identification.js.map