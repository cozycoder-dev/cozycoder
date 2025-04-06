import { SupportedEncodings } from 'uint8arrays/to-string';
import { Keypair } from '../types';
export type P256KeypairOptions = {
    exportable: boolean;
};
export declare class P256Keypair implements Keypair {
    private privateKey;
    private exportable;
    jwtAlg: string;
    private publicKey;
    constructor(privateKey: Uint8Array, exportable: boolean);
    static create(opts?: Partial<P256KeypairOptions>): Promise<P256Keypair>;
    static import(privKey: Uint8Array | string, opts?: Partial<P256KeypairOptions>): Promise<P256Keypair>;
    publicKeyBytes(): Uint8Array;
    publicKeyStr(encoding?: SupportedEncodings): string;
    did(): string;
    sign(msg: Uint8Array): Promise<Uint8Array>;
    export(): Promise<Uint8Array>;
}
//# sourceMappingURL=keypair.d.ts.map