"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthResponseModeSchema = void 0;
const zod_1 = require("zod");
exports.oauthResponseModeSchema = zod_1.z.enum([
    'query',
    'fragment',
    'form_post',
]);
//# sourceMappingURL=oauth-response-mode.js.map