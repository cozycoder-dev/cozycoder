"use strict";
/**
 * GENERATED CODE - DO NOT MODIFY
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.is$typed = is$typed;
exports.maybe$typed = maybe$typed;
exports.asPredicate = asPredicate;
function isObject(v) {
    return v != null && typeof v === 'object';
}
function is$type($type, id, hash) {
    return hash === 'main'
        ? $type === id
        : // $type === `${id}#${hash}`
            typeof $type === 'string' &&
                $type.length === id.length + 1 + hash.length &&
                $type.charCodeAt(id.length) === 35 /* '#' */ &&
                $type.startsWith(id) &&
                $type.endsWith(hash);
}
function is$typed(v, id, hash) {
    return isObject(v) && '$type' in v && is$type(v.$type, id, hash);
}
function maybe$typed(v, id, hash) {
    return (isObject(v) &&
        ('$type' in v ? v.$type === undefined || is$type(v.$type, id, hash) : true));
}
/**
 * Utility function that allows to convert a "validate*" utility function into a
 * type predicate.
 */
function asPredicate(validate) {
    return function (v) {
        return validate(v).success;
    };
}
//# sourceMappingURL=util.js.map