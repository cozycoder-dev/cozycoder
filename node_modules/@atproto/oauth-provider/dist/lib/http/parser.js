"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = void 0;
exports.parseContentType = parseContentType;
const bourne_1 = require("@hapi/bourne");
const content_1 = require("@hapi/content");
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * Parse a content-type string into its components.
 *
 * @throws {TypeError} If the content-type is invalid.
 */
function parseContentType(type) {
    if (typeof type !== 'string') {
        throw (0, http_errors_1.default)(415, `Invalid content-type: ${type == null ? String(type) : typeof type}`);
    }
    try {
        return (0, content_1.type)(type);
    }
    catch (err) {
        // De-boomify the error
        throw (0, http_errors_1.default)(415, err instanceof Error ? err.message : 'Invalid content-type');
    }
}
exports.parsers = [
    {
        name: 'json',
        test: (mime) => {
            return /^application\/(?:.+\+)?json$/.test(mime);
        },
        parse: (buffer, { charset }) => {
            if (charset != null && !/^utf-?8$/i.test(charset)) {
                throw (0, http_errors_1.default)(415, 'Unsupported charset');
            }
            try {
                return (0, bourne_1.parse)(buffer.toString());
            }
            catch (err) {
                throw (0, http_errors_1.default)(400, 'Invalid JSON', { cause: err });
            }
        },
    },
    {
        name: 'urlencoded',
        test: (mime) => {
            return mime === 'application/x-www-form-urlencoded';
        },
        parse: (buffer, { charset }) => {
            if (charset != null && !/^utf-?8$/i.test(charset)) {
                throw (0, http_errors_1.default)(415, 'Unsupported charset');
            }
            try {
                if (!buffer.length)
                    return {};
                const params = new URLSearchParams(buffer.toString());
                if (params.has('__proto__'))
                    throw new TypeError('Invalid key');
                return Object.fromEntries(params);
            }
            catch (err) {
                throw (0, http_errors_1.default)(400, 'Invalid URL-encoded data', { cause: err });
            }
        },
    },
    {
        name: 'bytes',
        test: (mime) => {
            return mime === 'application/octet-stream';
        },
        parse: (buffer) => buffer,
    },
];
//# sourceMappingURL=parser.js.map