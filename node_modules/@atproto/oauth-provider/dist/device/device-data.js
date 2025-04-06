"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceDataSchema = void 0;
const zod_1 = require("zod");
const session_id_js_1 = require("./session-id.js");
exports.deviceDataSchema = zod_1.z.object({
    sessionId: session_id_js_1.sessionIdSchema,
    lastSeenAt: zod_1.z.date(),
    userAgent: zod_1.z.string().nullable(),
    ipAddress: zod_1.z.string(),
});
//# sourceMappingURL=device-data.js.map