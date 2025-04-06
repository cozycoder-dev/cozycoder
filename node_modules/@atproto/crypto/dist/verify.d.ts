import { VerifyOptions } from './types';
export declare const verifySignature: (didKey: string, data: Uint8Array, sig: Uint8Array, opts?: VerifyOptions & {
    jwtAlg?: string;
}) => Promise<boolean>;
export declare const verifySignatureUtf8: (didKey: string, data: string, sig: string, opts?: VerifyOptions) => Promise<boolean>;
//# sourceMappingURL=verify.d.ts.map