"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envToSecrets = void 0;
const envToSecrets = (env) => {
    let plcRotationKey;
    if (env.plcRotationKeyKmsKeyId && env.plcRotationKeyK256PrivateKeyHex) {
        throw new Error('Cannot set both kms & memory keys for plc rotation key');
    }
    else if (env.plcRotationKeyKmsKeyId) {
        plcRotationKey = {
            provider: 'kms',
            keyId: env.plcRotationKeyKmsKeyId,
        };
    }
    else if (env.plcRotationKeyK256PrivateKeyHex) {
        plcRotationKey = {
            provider: 'memory',
            privateKeyHex: env.plcRotationKeyK256PrivateKeyHex,
        };
    }
    else {
        throw new Error('Must configure plc rotation key');
    }
    if (!env.jwtSecret) {
        throw new Error('Must provide a JWT secret');
    }
    if (!env.adminPassword) {
        throw new Error('Must provide an admin password');
    }
    return {
        dpopSecret: env.dpopSecret,
        jwtSecret: env.jwtSecret,
        adminPassword: env.adminPassword,
        plcRotationKey,
        entrywayAdminToken: env.entrywayAdminToken ?? env.adminPassword,
    };
};
exports.envToSecrets = envToSecrets;
//# sourceMappingURL=secrets.js.map