"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexicons = void 0;
const types_1 = require("./types");
const util_1 = require("./util");
const validation_1 = require("./validation");
const complex_1 = require("./validators/complex");
/**
 * A collection of compiled lexicons.
 */
class Lexicons {
    constructor(docs) {
        Object.defineProperty(this, "docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "defs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        if (docs) {
            for (const doc of docs) {
                this.add(doc);
            }
        }
    }
    /**
     * @example clone a lexicon:
     * ```ts
     * const clone = new Lexicons(originalLexicon)
     * ```
     *
     * @example get docs array:
     * ```ts
     * const docs = Array.from(lexicons)
     * ```
     */
    [Symbol.iterator]() {
        return this.docs.values();
    }
    /**
     * Add a lexicon doc.
     */
    add(doc) {
        const uri = (0, util_1.toLexUri)(doc.id);
        if (this.docs.has(uri)) {
            throw new Error(`${uri} has already been registered`);
        }
        // WARNING
        // mutates the object
        // -prf
        resolveRefUris(doc, uri);
        this.docs.set(uri, doc);
        for (const [defUri, def] of iterDefs(doc)) {
            this.defs.set(defUri, def);
        }
    }
    /**
     * Remove a lexicon doc.
     */
    remove(uri) {
        uri = (0, util_1.toLexUri)(uri);
        const doc = this.docs.get(uri);
        if (!doc) {
            throw new Error(`Unable to remove "${uri}": does not exist`);
        }
        for (const [defUri, _def] of iterDefs(doc)) {
            this.defs.delete(defUri);
        }
        this.docs.delete(uri);
    }
    /**
     * Get a lexicon doc.
     */
    get(uri) {
        uri = (0, util_1.toLexUri)(uri);
        return this.docs.get(uri);
    }
    /**
     * Get a definition.
     */
    getDef(uri) {
        uri = (0, util_1.toLexUri)(uri);
        return this.defs.get(uri);
    }
    getDefOrThrow(uri, types) {
        const def = this.getDef(uri);
        if (!def) {
            throw new types_1.LexiconDefNotFoundError(`Lexicon not found: ${uri}`);
        }
        if (types && !types.includes(def.type)) {
            throw new types_1.InvalidLexiconError(`Not a ${types.join(' or ')} lexicon: ${uri}`);
        }
        return def;
    }
    /**
     * Validate a record or object.
     */
    validate(lexUri, value) {
        if (!(0, types_1.isObj)(value)) {
            throw new types_1.ValidationError(`Value must be an object`);
        }
        const lexUriNormalized = (0, util_1.toLexUri)(lexUri);
        const def = this.getDefOrThrow(lexUriNormalized, ['record', 'object']);
        if (def.type === 'record') {
            return (0, complex_1.object)(this, 'Record', def.record, value);
        }
        else if (def.type === 'object') {
            return (0, complex_1.object)(this, 'Object', def, value);
        }
        else {
            // shouldn't happen
            throw new types_1.InvalidLexiconError('Definition must be a record or object');
        }
    }
    /**
     * Validate a record and throw on any error.
     */
    assertValidRecord(lexUri, value) {
        if (!(0, types_1.isObj)(value)) {
            throw new types_1.ValidationError(`Record must be an object`);
        }
        if (!('$type' in value)) {
            throw new types_1.ValidationError(`Record/$type must be a string`);
        }
        const { $type } = value;
        if (typeof $type !== 'string') {
            throw new types_1.ValidationError(`Record/$type must be a string`);
        }
        const lexUriNormalized = (0, util_1.toLexUri)(lexUri);
        if ((0, util_1.toLexUri)($type) !== lexUriNormalized) {
            throw new types_1.ValidationError(`Invalid $type: must be ${lexUriNormalized}, got ${$type}`);
        }
        const def = this.getDefOrThrow(lexUriNormalized, ['record']);
        return (0, validation_1.assertValidRecord)(this, def, value);
    }
    /**
     * Validate xrpc query params and throw on any error.
     */
    assertValidXrpcParams(lexUri, value) {
        lexUri = (0, util_1.toLexUri)(lexUri);
        const def = this.getDefOrThrow(lexUri, [
            'query',
            'procedure',
            'subscription',
        ]);
        return (0, validation_1.assertValidXrpcParams)(this, def, value);
    }
    /**
     * Validate xrpc input body and throw on any error.
     */
    assertValidXrpcInput(lexUri, value) {
        lexUri = (0, util_1.toLexUri)(lexUri);
        const def = this.getDefOrThrow(lexUri, ['procedure']);
        return (0, validation_1.assertValidXrpcInput)(this, def, value);
    }
    /**
     * Validate xrpc output body and throw on any error.
     */
    assertValidXrpcOutput(lexUri, value) {
        lexUri = (0, util_1.toLexUri)(lexUri);
        const def = this.getDefOrThrow(lexUri, ['query', 'procedure']);
        return (0, validation_1.assertValidXrpcOutput)(this, def, value);
    }
    /**
     * Validate xrpc subscription message and throw on any error.
     */
    assertValidXrpcMessage(lexUri, value) {
        lexUri = (0, util_1.toLexUri)(lexUri);
        const def = this.getDefOrThrow(lexUri, ['subscription']);
        return (0, validation_1.assertValidXrpcMessage)(this, def, value);
    }
    /**
     * Resolve a lex uri given a ref
     */
    resolveLexUri(lexUri, ref) {
        lexUri = (0, util_1.toLexUri)(lexUri);
        return (0, util_1.toLexUri)(ref, lexUri);
    }
}
exports.Lexicons = Lexicons;
function* iterDefs(doc) {
    for (const defId in doc.defs) {
        yield [`lex:${doc.id}#${defId}`, doc.defs[defId]];
        if (defId === 'main') {
            yield [`lex:${doc.id}`, doc.defs[defId]];
        }
    }
}
// WARNING
// this method mutates objects
// -prf
function resolveRefUris(obj, baseUri) {
    for (const k in obj) {
        if (obj.type === 'ref') {
            obj.ref = (0, util_1.toLexUri)(obj.ref, baseUri);
        }
        else if (obj.type === 'union') {
            obj.refs = obj.refs.map((ref) => (0, util_1.toLexUri)(ref, baseUri));
        }
        else if (Array.isArray(obj[k])) {
            obj[k] = obj[k].map((item) => {
                if (typeof item === 'string') {
                    return item.startsWith('#') ? (0, util_1.toLexUri)(item, baseUri) : item;
                }
                else if (item && typeof item === 'object') {
                    return resolveRefUris(item, baseUri);
                }
                return item;
            });
        }
        else if (obj[k] && typeof obj[k] === 'object') {
            obj[k] = resolveRefUris(obj[k], baseUri);
        }
    }
    return obj;
}
//# sourceMappingURL=lexicons.js.map