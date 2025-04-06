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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashAppPassword = exports.getDerivedHash = exports.verify = exports.hashWithSalt = exports.genSaltAndHash = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const ui8 = __importStar(require("uint8arrays"));
const crypto_1 = require("@atproto/crypto");
const genSaltAndHash = (password) => {
    const salt = node_crypto_1.default.randomBytes(16).toString('hex');
    return (0, exports.hashWithSalt)(password, salt);
};
exports.genSaltAndHash = genSaltAndHash;
const hashWithSalt = (password, salt) => {
    return new Promise((resolve, reject) => {
        node_crypto_1.default.scrypt(password, salt, 64, (err, hash) => {
            if (err)
                return reject(err);
            resolve(salt + ':' + hash.toString('hex'));
        });
    });
};
exports.hashWithSalt = hashWithSalt;
const verify = async (password, storedHash) => {
    const [salt, hash] = storedHash.split(':');
    const derivedHash = await (0, exports.getDerivedHash)(password, salt);
    return hash === derivedHash;
};
exports.verify = verify;
const getDerivedHash = (password, salt) => {
    return new Promise((resolve, reject) => {
        node_crypto_1.default.scrypt(password, salt, 64, (err, derivedHash) => {
            if (err)
                return reject(err);
            resolve(derivedHash.toString('hex'));
        });
    });
};
exports.getDerivedHash = getDerivedHash;
const hashAppPassword = async (did, password) => {
    const sha = await (0, crypto_1.sha256)(did);
    const salt = ui8.toString(sha.slice(0, 16), 'hex');
    return (0, exports.hashWithSalt)(password, salt);
};
exports.hashAppPassword = hashAppPassword;
//# sourceMappingURL=scrypt.js.map