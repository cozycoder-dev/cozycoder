"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oidcEntityTypeSchema = void 0;
const zod_1 = require("zod");
exports.oidcEntityTypeSchema = zod_1.z.enum(['userinfo', 'id_token']);
//# sourceMappingURL=oidc-entity-type.js.map