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
var _SimpleStoreMemory_cache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleStoreMemory = void 0;
const lru_cache_1 = require("lru-cache");
const util_js_1 = require("./util.js");
// LRUCache does not allow storing "null", so we use a symbol to represent it.
const nullSymbol = Symbol('nullItem');
const toLruValue = (value) => (value === null ? nullSymbol : value);
const fromLruValue = (value) => (value === nullSymbol ? null : value);
class SimpleStoreMemory {
    constructor({ sizeCalculation, ...options }) {
        _SimpleStoreMemory_cache.set(this, void 0);
        __classPrivateFieldSet(this, _SimpleStoreMemory_cache, new lru_cache_1.LRUCache({
            ...options,
            allowStale: false,
            updateAgeOnGet: false,
            updateAgeOnHas: false,
            sizeCalculation: sizeCalculation
                ? (value, key) => sizeCalculation(fromLruValue(value), key)
                : options.maxEntrySize != null || options.maxSize != null
                    ? // maxEntrySize and maxSize require a size calculation function.
                        util_js_1.roughSizeOfObject
                    : undefined,
        }), "f");
    }
    get(key) {
        const value = __classPrivateFieldGet(this, _SimpleStoreMemory_cache, "f").get(key);
        if (value === undefined)
            return undefined;
        return fromLruValue(value);
    }
    set(key, value) {
        __classPrivateFieldGet(this, _SimpleStoreMemory_cache, "f").set(key, toLruValue(value));
    }
    del(key) {
        __classPrivateFieldGet(this, _SimpleStoreMemory_cache, "f").delete(key);
    }
    clear() {
        __classPrivateFieldGet(this, _SimpleStoreMemory_cache, "f").clear();
    }
}
exports.SimpleStoreMemory = SimpleStoreMemory;
_SimpleStoreMemory_cache = new WeakMap();
//# sourceMappingURL=index.js.map