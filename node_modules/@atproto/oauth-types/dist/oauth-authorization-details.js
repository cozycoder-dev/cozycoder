"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationDetailsSchema = exports.oauthAuthorizationDetailSchema = void 0;
const zod_1 = require("zod");
const uri_js_1 = require("./uri.js");
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9396#section-2 | RFC 9396, Section 2}
 */
exports.oauthAuthorizationDetailSchema = zod_1.z.object({
    type: zod_1.z.string(),
    /**
     * An array of strings representing the location of the resource or RS. These
     * strings are typically URIs identifying the location of the RS.
     */
    locations: zod_1.z.array(uri_js_1.dangerousUriSchema).optional(),
    /**
     * An array of strings representing the kinds of actions to be taken at the
     * resource.
     */
    actions: zod_1.z.array(zod_1.z.string()).optional(),
    /**
     * An array of strings representing the kinds of data being requested from the
     * resource.
     */
    datatypes: zod_1.z.array(zod_1.z.string()).optional(),
    /**
     * A string identifier indicating a specific resource available at the API.
     */
    identifier: zod_1.z.string().optional(),
    /**
     * An array of strings representing the types or levels of privilege being
     * requested at the resource.
     */
    privileges: zod_1.z.array(zod_1.z.string()).optional(),
});
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9396#section-2 | RFC 9396, Section 2}
 */
exports.oauthAuthorizationDetailsSchema = zod_1.z.array(exports.oauthAuthorizationDetailSchema);
//# sourceMappingURL=oauth-authorization-details.js.map