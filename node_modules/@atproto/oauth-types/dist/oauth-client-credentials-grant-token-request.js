"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthClientCredentialsGrantTokenRequestSchema = void 0;
const zod_1 = require("zod");
exports.oauthClientCredentialsGrantTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('client_credentials'),
});
//# sourceMappingURL=oauth-client-credentials-grant-token-request.js.map