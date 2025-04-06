"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthTokenTypeSchema = void 0;
const zod_1 = require("zod");
// Case insensitive input, normalized output
exports.oauthTokenTypeSchema = zod_1.z.union([
    zod_1.z
        .string()
        .regex(/^DPoP$/i)
        .transform(() => 'DPoP'),
    zod_1.z
        .string()
        .regex(/^Bearer$/i)
        .transform(() => 'Bearer'),
]);
//# sourceMappingURL=oauth-token-type.js.map