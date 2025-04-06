"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthIssuerIdentifierSchema = void 0;
const zod_1 = require("zod");
const uri_js_1 = require("./uri.js");
exports.oauthIssuerIdentifierSchema = uri_js_1.webUriSchema.superRefine((value, ctx) => {
    // Validate the issuer (MIX-UP attacks)
    if (value.endsWith('/')) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Issuer URL must not end with a slash',
        });
        return false;
    }
    const url = new URL(value);
    if (url.username || url.password) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Issuer URL must not contain a username or password',
        });
        return false;
    }
    if (url.hash || url.search) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Issuer URL must not contain a query or fragment',
        });
        return false;
    }
    const canonicalValue = url.pathname === '/' ? url.origin : url.href;
    if (value !== canonicalValue) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Issuer URL must be in the canonical form',
        });
        return false;
    }
    return true;
});
//# sourceMappingURL=oauth-issuer-identifier.js.map