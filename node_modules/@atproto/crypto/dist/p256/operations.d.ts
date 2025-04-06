import { VerifyOptions } from '../types';
export declare const verifyDidSig: (did: string, data: Uint8Array, sig: Uint8Array, opts?: VerifyOptions) => Promise<boolean>;
export declare const verifySig: (publicKey: Uint8Array, data: Uint8Array, sig: Uint8Array, opts?: VerifyOptions) => Promise<boolean>;
export declare const isCompactFormat: (sig: Uint8Array) => boolean;
//# sourceMappingURL=operations.d.ts.map