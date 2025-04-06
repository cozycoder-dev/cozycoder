"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureHandleServiceConstraints = exports.isServiceDomain = exports.baseNormalizeAndValidate = void 0;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const reserved_1 = require("./reserved");
const baseNormalizeAndValidate = (handle) => {
    try {
        return (0, syntax_1.normalizeAndEnsureValidHandle)(handle);
    }
    catch (err) {
        if (err instanceof syntax_1.InvalidHandleError) {
            throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidHandle');
        }
        throw err;
    }
};
exports.baseNormalizeAndValidate = baseNormalizeAndValidate;
const isServiceDomain = (handle, availableUserDomains) => {
    return availableUserDomains.some((domain) => handle.endsWith(domain));
};
exports.isServiceDomain = isServiceDomain;
const ensureHandleServiceConstraints = (handle, availableUserDomains, allowReserved = false) => {
    const supportedDomain = availableUserDomains.find((domain) => handle.endsWith(domain)) ?? '';
    const front = handle.slice(0, handle.length - supportedDomain.length);
    if (front.includes('.')) {
        throw new xrpc_server_1.InvalidRequestError('Invalid characters in handle', 'InvalidHandle');
    }
    if (front.length < 3) {
        throw new xrpc_server_1.InvalidRequestError('Handle too short', 'InvalidHandle');
    }
    if (front.length > 18) {
        throw new xrpc_server_1.InvalidRequestError('Handle too long', 'InvalidHandle');
    }
    if (!allowReserved && reserved_1.reservedSubdomains[front]) {
        throw new xrpc_server_1.InvalidRequestError('Reserved handle', 'HandleNotAvailable');
    }
};
exports.ensureHandleServiceConstraints = ensureHandleServiceConstraints;
//# sourceMappingURL=index.js.map