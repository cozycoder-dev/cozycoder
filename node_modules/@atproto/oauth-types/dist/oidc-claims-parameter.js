"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcClaimsParameterSchema = void 0;
const zod_1 = require("zod");
exports.oidcClaimsParameterSchema = zod_1.z.enum([
    // https://openid.net/specs/openid-provider-authentication-policy-extension-1_0.html#rfc.section.5.2
    // if client metadata "require_auth_time" is true, this *must* be provided
    'auth_time',
    // OIDC
    'nonce',
    'acr',
    // OpenID: "profile" scope
    'name',
    'family_name',
    'given_name',
    'middle_name',
    'nickname',
    'preferred_username',
    'gender',
    'picture',
    'profile',
    'website',
    'birthdate',
    'zoneinfo',
    'locale',
    'updated_at',
    // OpenID: "email" scope
    'email',
    'email_verified',
    // OpenID: "phone" scope
    'phone_number',
    'phone_number_verified',
    // OpenID: "address" scope
    'address',
]);
//# sourceMappingURL=oidc-claims-parameter.js.map