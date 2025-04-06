import { ServerEnvironment } from './env';
export declare const envToSecrets: (env: ServerEnvironment) => ServerSecrets;
export type ServerSecrets = {
    dpopSecret?: string;
    jwtSecret: string;
    adminPassword: string;
    plcRotationKey: SigningKeyKms | SigningKeyMemory;
    entrywayAdminToken?: string;
};
export type SigningKeyKms = {
    provider: 'kms';
    keyId: string;
};
export type SigningKeyMemory = {
    provider: 'memory';
    privateKeyHex: string;
};
//# sourceMappingURL=secrets.d.ts.map