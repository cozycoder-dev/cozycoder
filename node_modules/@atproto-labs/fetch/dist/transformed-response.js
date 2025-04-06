"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TransformedResponse_response;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformedResponse = void 0;
class TransformedResponse extends Response {
    constructor(response, transform) {
        if (!response.body) {
            throw new TypeError('Response body is not available');
        }
        if (response.bodyUsed) {
            throw new TypeError('Response body is already used');
        }
        super(response.body.pipeThrough(transform), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
        _TransformedResponse_response.set(this, void 0);
        __classPrivateFieldSet(this, _TransformedResponse_response, response, "f");
    }
    /**
     * Some props can't be set through ResponseInit, so we need to proxy them
     */
    get url() {
        return __classPrivateFieldGet(this, _TransformedResponse_response, "f").url;
    }
    get redirected() {
        return __classPrivateFieldGet(this, _TransformedResponse_response, "f").redirected;
    }
    get type() {
        return __classPrivateFieldGet(this, _TransformedResponse_response, "f").type;
    }
    get statusText() {
        return __classPrivateFieldGet(this, _TransformedResponse_response, "f").statusText;
    }
}
exports.TransformedResponse = TransformedResponse;
_TransformedResponse_response = new WeakMap();
//# sourceMappingURL=transformed-response.js.map