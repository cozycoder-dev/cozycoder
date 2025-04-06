"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.array = array;
exports.object = object;
exports.validateOneOf = validateOneOf;
const types_1 = require("../types");
const util_1 = require("../util");
const blob_1 = require("./blob");
const primitives_1 = require("./primitives");
function validate(lexicons, path, def, value) {
    switch (def.type) {
        case 'object':
            return object(lexicons, path, def, value);
        case 'array':
            return array(lexicons, path, def, value);
        case 'blob':
            return (0, blob_1.blob)(lexicons, path, def, value);
        default:
            return (0, primitives_1.validate)(lexicons, path, def, value);
    }
}
function array(lexicons, path, def, value) {
    // type
    if (!Array.isArray(value)) {
        return {
            success: false,
            error: new types_1.ValidationError(`${path} must be an array`),
        };
    }
    // maxLength
    if (typeof def.maxLength === 'number') {
        if (value.length > def.maxLength) {
            return {
                success: false,
                error: new types_1.ValidationError(`${path} must not have more than ${def.maxLength} elements`),
            };
        }
    }
    // minLength
    if (typeof def.minLength === 'number') {
        if (value.length < def.minLength) {
            return {
                success: false,
                error: new types_1.ValidationError(`${path} must not have fewer than ${def.minLength} elements`),
            };
        }
    }
    // items
    const itemsDef = def.items;
    for (let i = 0; i < value.length; i++) {
        const itemValue = value[i];
        const itemPath = `${path}/${i}`;
        const res = validateOneOf(lexicons, itemPath, itemsDef, itemValue);
        if (!res.success) {
            return res;
        }
    }
    return { success: true, value };
}
function object(lexicons, path, def, value) {
    // type
    if (!(0, types_1.isObj)(value)) {
        return {
            success: false,
            error: new types_1.ValidationError(`${path} must be an object`),
        };
    }
    // properties
    let resultValue = value;
    if ('properties' in def && def.properties != null) {
        for (const key in def.properties) {
            const keyValue = value[key];
            if (keyValue === null && def.nullable?.includes(key)) {
                continue;
            }
            const propDef = def.properties[key];
            if (keyValue === undefined && !def.required?.includes(key)) {
                // Fast path for non-required undefined props.
                if (propDef.type === 'integer' ||
                    propDef.type === 'boolean' ||
                    propDef.type === 'string') {
                    if (propDef.default === undefined) {
                        continue;
                    }
                }
                else {
                    // Other types have no defaults.
                    continue;
                }
            }
            const propPath = `${path}/${key}`;
            const validated = validateOneOf(lexicons, propPath, propDef, keyValue);
            const propValue = validated.success ? validated.value : keyValue;
            // Return error for bad validation, giving required rule precedence
            if (propValue === undefined) {
                if (def.required?.includes(key)) {
                    return {
                        success: false,
                        error: new types_1.ValidationError(`${path} must have the property "${key}"`),
                    };
                }
            }
            else {
                if (!validated.success) {
                    return validated;
                }
            }
            // Adjust value based on e.g. applied defaults, cloning shallowly if there was a changed value
            if (propValue !== keyValue) {
                if (resultValue === value) {
                    // Lazy shallow clone
                    resultValue = { ...value };
                }
                resultValue[key] = propValue;
            }
        }
    }
    return { success: true, value: resultValue };
}
function validateOneOf(lexicons, path, def, value, mustBeObj = false) {
    let concreteDef;
    if (def.type === 'union') {
        if (!(0, types_1.isDiscriminatedObject)(value)) {
            return {
                success: false,
                error: new types_1.ValidationError(`${path} must be an object which includes the "$type" property`),
            };
        }
        if (!refsContainType(def.refs, value.$type)) {
            if (def.closed) {
                return {
                    success: false,
                    error: new types_1.ValidationError(`${path} $type must be one of ${def.refs.join(', ')}`),
                };
            }
            return { success: true, value };
        }
        else {
            concreteDef = lexicons.getDefOrThrow(value.$type);
        }
    }
    else if (def.type === 'ref') {
        concreteDef = lexicons.getDefOrThrow(def.ref);
    }
    else {
        concreteDef = def;
    }
    return mustBeObj
        ? object(lexicons, path, concreteDef, value)
        : validate(lexicons, path, concreteDef, value);
}
// to avoid bugs like #0189 this needs to handle both
// explicit and implicit #main
const refsContainType = (refs, type) => {
    const lexUri = (0, util_1.toLexUri)(type);
    if (refs.includes(lexUri)) {
        return true;
    }
    if (lexUri.endsWith('#main')) {
        return refs.includes(lexUri.slice(0, -5));
    }
    else {
        return !lexUri.includes('#') && refs.includes(`${lexUri}#main`);
    }
};
//# sourceMappingURL=complex.js.map