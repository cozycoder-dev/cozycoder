"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRequestTransformer = toRequestTransformer;
exports.asRequest = asRequest;
function toRequestTransformer(requestTransformer) {
    return function (input, init) {
        return requestTransformer.call(this, asRequest(input, init));
    };
}
function asRequest(input, init) {
    if (!init && input instanceof Request)
        return input;
    return new Request(input, init);
}
//# sourceMappingURL=fetch.js.map