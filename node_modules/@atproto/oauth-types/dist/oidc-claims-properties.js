"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcClaimsPropertiesSchema = void 0;
const zod_1 = require("zod");
const oidcClaimsValueSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]);
exports.oidcClaimsPropertiesSchema = zod_1.z.object({
    essential: zod_1.z.boolean().optional(),
    value: oidcClaimsValueSchema.optional(),
    values: zod_1.z.array(oidcClaimsValueSchema).optional(),
});
//# sourceMappingURL=oidc-claims-properties.js.map