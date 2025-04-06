"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthPasswordGrantTokenRequestSchema = void 0;
const zod_1 = require("zod");
exports.oauthPasswordGrantTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('password'),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
//# sourceMappingURL=oauth-password-grant-token-request.js.map