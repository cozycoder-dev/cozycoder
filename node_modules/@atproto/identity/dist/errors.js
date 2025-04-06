"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedDidWebPathError = exports.PoorlyFormattedDidDocumentError = exports.UnsupportedDidMethodError = exports.PoorlyFormattedDidError = exports.DidNotFoundError = void 0;
class DidNotFoundError extends Error {
    constructor(did) {
        super(`Could not resolve DID: ${did}`);
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
    }
}
exports.DidNotFoundError = DidNotFoundError;
class PoorlyFormattedDidError extends Error {
    constructor(did) {
        super(`Poorly formatted DID: ${did}`);
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
    }
}
exports.PoorlyFormattedDidError = PoorlyFormattedDidError;
class UnsupportedDidMethodError extends Error {
    constructor(did) {
        super(`Unsupported DID method: ${did}`);
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
    }
}
exports.UnsupportedDidMethodError = UnsupportedDidMethodError;
class PoorlyFormattedDidDocumentError extends Error {
    constructor(did, doc) {
        super(`Poorly formatted DID Document: ${doc}`);
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "doc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: doc
        });
    }
}
exports.PoorlyFormattedDidDocumentError = PoorlyFormattedDidDocumentError;
class UnsupportedDidWebPathError extends Error {
    constructor(did) {
        super(`Unsupported did:web paths: ${did}`);
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
    }
}
exports.UnsupportedDidWebPathError = UnsupportedDidWebPathError;
//# sourceMappingURL=errors.js.map