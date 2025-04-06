"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDpopProofError = void 0;
const www_authenticate_error_js_1 = require("./www-authenticate-error.js");
class InvalidDpopProofError extends www_authenticate_error_js_1.WWWAuthenticateError {
    constructor(error_description, cause) {
        const error = 'invalid_dpop_proof';
        super(error, error_description, { DPoP: { error, error_description } }, cause);
    }
}
exports.InvalidDpopProofError = InvalidDpopProofError;
//# sourceMappingURL=invalid-dpop-proof-error.js.map