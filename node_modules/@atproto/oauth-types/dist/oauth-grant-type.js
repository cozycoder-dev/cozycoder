"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthGrantTypeSchema = void 0;
const zod_1 = require("zod");
exports.oauthGrantTypeSchema = zod_1.z.enum([
    'authorization_code',
    'implicit',
    'refresh_token',
    'password', // Not part of OAuth 2.1
    'client_credentials',
    'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'urn:ietf:params:oauth:grant-type:saml2-bearer',
]);
//# sourceMappingURL=oauth-grant-type.js.map