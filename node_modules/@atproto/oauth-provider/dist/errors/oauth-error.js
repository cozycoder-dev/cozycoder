"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthError = void 0;
class OAuthError extends Error {
    error;
    error_description;
    status;
    expose;
    constructor(error, error_description, status = 400, cause) {
        super(error_description, { cause });
        this.error = error;
        this.error_description = error_description;
        this.status = status;
        Error.captureStackTrace?.(this, this.constructor);
        this.name = this.constructor.name;
        this.expose = status < 500;
    }
    get statusCode() {
        return this.status;
    }
    toJSON() {
        return {
            error: this.error,
            error_description: this.error_description,
        };
    }
}
exports.OAuthError = OAuthError;
//# sourceMappingURL=oauth-error.js.map