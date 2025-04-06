"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationRequestUriSchema = void 0;
const zod_1 = require("zod");
const oauth_request_uri_js_1 = require("./oauth-request-uri.js");
exports.oauthAuthorizationRequestUriSchema = zod_1.z.object({
    request_uri: oauth_request_uri_js_1.oauthRequestUriSchema,
});
//# sourceMappingURL=oauth-authorization-request-uri.js.map