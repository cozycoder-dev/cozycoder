"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestDataAuthorized = void 0;
const isRequestDataAuthorized = (data) => data.sub !== null && data.deviceId !== null;
exports.isRequestDataAuthorized = isRequestDataAuthorized;
//# sourceMappingURL=request-data.js.map