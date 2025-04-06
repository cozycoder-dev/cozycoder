"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthCodeChallengeMethodSchema = void 0;
const zod_1 = require("zod");
exports.oauthCodeChallengeMethodSchema = zod_1.z.enum(['S256', 'plain']);
//# sourceMappingURL=oauth-code-challenge-method.js.map