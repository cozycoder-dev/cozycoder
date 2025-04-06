"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthParResponseSchema = void 0;
const zod_1 = require("zod");
exports.oauthParResponseSchema = zod_1.z.object({
    request_uri: zod_1.z.string(),
    expires_in: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=oauth-par-response.js.map