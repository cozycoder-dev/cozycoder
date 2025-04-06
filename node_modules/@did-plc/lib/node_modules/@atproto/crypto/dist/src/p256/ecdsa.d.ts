import * as ucan from '@ucans/core';
export declare type EcdsaKeypairOptions = {
    exportable: boolean;
};
export declare class EcdsaKeypair implements ucan.DidableKey {
    jwtAlg: string;
    private publicKey;
    private keypair;
    private exportable;
    constructor(keypair: CryptoKeyPair, publicKey: Uint8Array, exportable: boolean);
    static create(opts?: Partial<EcdsaKeypairOptions>): Promise<EcdsaKeypair>;
    static import(jwk: JsonWebKey, opts?: Partial<EcdsaKeypairOptions>): Promise<EcdsaKeypair>;
    publicKeyBytes(): Uint8Array;
    publicKeyStr(encoding?: ucan.Encodings): string;
    did(): string;
    sign(msg: Uint8Array): Promise<Uint8Array>;
    export(): Promise<JsonWebKey>;
}
export default EcdsaKeypair;
