"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsafeDecodeJwt = unsafeDecodeJwt;
const errors_js_1 = require("./errors.js");
const jwt_js_1 = require("./jwt.js");
const util_js_1 = require("./util.js");
function unsafeDecodeJwt(jwt) {
    const { 0: headerEnc, 1: payloadEnc, length } = jwt.split('.');
    if (length > 3 || length < 2) {
        throw new errors_js_1.JwtVerifyError(undefined, errors_js_1.ERR_JWT_INVALID);
    }
    const header = jwt_js_1.jwtHeaderSchema.parse((0, util_js_1.parseB64uJson)(headerEnc));
    if (length === 2 && header?.alg !== 'none') {
        throw new errors_js_1.JwtVerifyError(undefined, errors_js_1.ERR_JWT_INVALID);
    }
    const payload = jwt_js_1.jwtPayloadSchema.parse((0, util_js_1.parseB64uJson)(payloadEnc));
    return { header, payload };
}
//# sourceMappingURL=jwt-decode.js.map