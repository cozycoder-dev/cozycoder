"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtVerifyError = exports.JwtCreateError = exports.JwkError = exports.ERR_JWT_VERIFY = exports.ERR_JWT_CREATE = exports.ERR_JWT_INVALID = exports.ERR_JWK_NOT_FOUND = exports.ERR_JWK_INVALID = exports.ERR_JWKS_NO_MATCHING_KEY = void 0;
exports.ERR_JWKS_NO_MATCHING_KEY = 'ERR_JWKS_NO_MATCHING_KEY';
exports.ERR_JWK_INVALID = 'ERR_JWK_INVALID';
exports.ERR_JWK_NOT_FOUND = 'ERR_JWK_NOT_FOUND';
exports.ERR_JWT_INVALID = 'ERR_JWT_INVALID';
exports.ERR_JWT_CREATE = 'ERR_JWT_CREATE';
exports.ERR_JWT_VERIFY = 'ERR_JWT_VERIFY';
class JwkError extends TypeError {
    constructor(message = 'JWK error', code = exports.ERR_JWK_INVALID, options) {
        super(message, options);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: code
        });
    }
}
exports.JwkError = JwkError;
class JwtCreateError extends Error {
    constructor(message = 'Unable to create JWT', code = exports.ERR_JWT_CREATE, options) {
        super(message, options);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: code
        });
    }
    static from(cause, code, message) {
        if (cause instanceof JwtCreateError)
            return cause;
        if (cause instanceof JwkError) {
            return new JwtCreateError(message, cause.code, { cause });
        }
        return new JwtCreateError(message, code, { cause });
    }
}
exports.JwtCreateError = JwtCreateError;
class JwtVerifyError extends Error {
    constructor(message = 'Invalid JWT', code = exports.ERR_JWT_VERIFY, options) {
        super(message, options);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: code
        });
    }
    static from(cause, code, message) {
        if (cause instanceof JwtVerifyError)
            return cause;
        if (cause instanceof JwkError) {
            return new JwtVerifyError(message, cause.code, { cause });
        }
        return new JwtVerifyError(message, code, { cause });
    }
}
exports.JwtVerifyError = JwtVerifyError;
//# sourceMappingURL=errors.js.map