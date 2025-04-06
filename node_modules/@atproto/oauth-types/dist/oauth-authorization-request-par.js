"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationRequestParSchema = void 0;
const zod_1 = require("zod");
const oauth_authorization_request_jar_js_1 = require("./oauth-authorization-request-jar.js");
const oauth_authorization_request_parameters_js_1 = require("./oauth-authorization-request-parameters.js");
exports.oauthAuthorizationRequestParSchema = zod_1.z.union([
    oauth_authorization_request_parameters_js_1.oauthAuthorizationRequestParametersSchema,
    oauth_authorization_request_jar_js_1.oauthAuthorizationRequestJarSchema,
]);
//# sourceMappingURL=oauth-authorization-request-par.js.map