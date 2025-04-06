"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClientStore = void 0;
exports.ifClientStore = ifClientStore;
exports.asClientStore = asClientStore;
const type_js_1 = require("../lib/util/type.js");
// Export all types needed to implement the ClientStore interface
__exportStar(require("./client-data.js"), exports);
__exportStar(require("./client-id.js"), exports);
exports.isClientStore = (0, type_js_1.buildInterfaceChecker)([
    'findClient', //
]);
function ifClientStore(implementation) {
    if (implementation && (0, exports.isClientStore)(implementation)) {
        return implementation;
    }
    return undefined;
}
function asClientStore(implementation) {
    const store = ifClientStore(implementation);
    if (store)
        return store;
    throw new Error('Invalid ClientStore implementation');
}
//# sourceMappingURL=client-store.js.map