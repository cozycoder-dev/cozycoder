import * as aws from '@aws-sdk/client-kms';
import * as crypto from '@atproto/crypto';
export type KmsConfig = {
    keyId: string;
} & Omit<aws.KMSClientConfig, 'apiVersion'>;
export declare class KmsKeypair implements crypto.Keypair {
    private client;
    private keyId;
    private publicKey;
    jwtAlg: string;
    constructor(client: aws.KMS, keyId: string, publicKey: Uint8Array);
    static load(cfg: KmsConfig): Promise<KmsKeypair>;
    did(): string;
    sign(msg: Uint8Array): Promise<Uint8Array>;
}
export default KmsKeypair;
//# sourceMappingURL=kms.d.ts.map