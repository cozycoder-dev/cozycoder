"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthEndpointAuthMethod = void 0;
const zod_1 = require("zod");
exports.oauthEndpointAuthMethod = zod_1.z.enum([
    'client_secret_basic',
    'client_secret_jwt',
    'client_secret_post',
    'none',
    'private_key_jwt',
    'self_signed_tls_client_auth',
    'tls_client_auth',
]);
//# sourceMappingURL=oauth-endpoint-auth-method.js.map