"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthTokenRequestSchema = void 0;
const zod_1 = require("zod");
const oauth_authorization_code_grant_token_request_js_1 = require("./oauth-authorization-code-grant-token-request.js");
const oauth_client_credentials_grant_token_request_js_1 = require("./oauth-client-credentials-grant-token-request.js");
const oauth_password_grant_token_request_js_1 = require("./oauth-password-grant-token-request.js");
const oauth_refresh_token_grant_token_request_js_1 = require("./oauth-refresh-token-grant-token-request.js");
exports.oauthTokenRequestSchema = zod_1.z.discriminatedUnion('grant_type', [
    oauth_authorization_code_grant_token_request_js_1.oauthAuthorizationCodeGrantTokenRequestSchema,
    oauth_refresh_token_grant_token_request_js_1.oauthRefreshTokenGrantTokenRequestSchema,
    oauth_password_grant_token_request_js_1.oauthPasswordGrantTokenRequestSchema,
    oauth_client_credentials_grant_token_request_js_1.oauthClientCredentialsGrantTokenRequestSchema,
]);
//# sourceMappingURL=oauth-token-request.js.map