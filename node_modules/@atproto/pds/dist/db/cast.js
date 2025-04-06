"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonObject = exports.toJsonObject = exports.fromJsonArray = exports.toJsonArray = exports.isJsonArray = exports.fromJson = exports.toJson = exports.fromDateISO = exports.toDateISO = void 0;
exports.assertJsonArray = assertJsonArray;
const toDateISO = (date) => date.toISOString();
exports.toDateISO = toDateISO;
const fromDateISO = (date) => new Date(date);
exports.fromDateISO = fromDateISO;
const toJson = (obj) => {
    const json = JSON.stringify(obj);
    if (json === undefined)
        throw new TypeError('Input not JSONifyable');
    return json;
};
exports.toJson = toJson;
const fromJson = (json) => {
    try {
        return JSON.parse(json);
    }
    catch (cause) {
        throw new TypeError('Database contains invalid JSON', { cause });
    }
};
exports.fromJson = fromJson;
const isJsonArray = (json) => 
// Although the JSON in the DB should have been encoded using toJson,
// there should not be any leading or trailing whitespace. We will still trim
// the string to protect against any manual editing of the DB.
json.trimStart().startsWith('[') && json.trimEnd().endsWith(']');
exports.isJsonArray = isJsonArray;
function assertJsonArray(json) {
    if (!(0, exports.isJsonArray)(json))
        throw new TypeError('Not an Array');
}
const toJsonArray = (obj) => {
    const json = (0, exports.toJson)(obj);
    assertJsonArray(json);
    return json;
};
exports.toJsonArray = toJsonArray;
const fromJsonArray = (json) => {
    assertJsonArray(json);
    return (0, exports.fromJson)(json);
};
exports.fromJsonArray = fromJsonArray;
const isJsonObject = (json) => 
// Although the JSON in the DB should have been encoded using toJson,
// there should not be any leading or trailing whitespace. We will still trim
// the string to protect against any manual editing of the DB.
json.trimStart().startsWith('{') && json.trimEnd().endsWith('}');
function assertJsonObject(json) {
    if (!isJsonObject(json))
        throw new TypeError('Not an Object');
}
const toJsonObject = (obj) => {
    const json = (0, exports.toJson)(obj);
    assertJsonObject(json);
    return json;
};
exports.toJsonObject = toJsonObject;
const fromJsonObject = (json) => {
    assertJsonObject(json);
    return (0, exports.fromJson)(json);
};
exports.fromJsonObject = fromJsonObject;
//# sourceMappingURL=cast.js.map