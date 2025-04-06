"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthRefreshTokenGrantTokenRequestSchema = void 0;
const zod_1 = require("zod");
const oauth_refresh_token_js_1 = require("./oauth-refresh-token.js");
exports.oauthRefreshTokenGrantTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('refresh_token'),
    refresh_token: oauth_refresh_token_js_1.oauthRefreshTokenSchema,
});
//# sourceMappingURL=oauth-refresh-token-grant-token-request.js.map