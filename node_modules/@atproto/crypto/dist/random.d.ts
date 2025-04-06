import * as noble from '@noble/hashes/utils';
import { SupportedEncodings } from 'uint8arrays/to-string';
export declare const randomBytes: typeof noble.randomBytes;
export declare const randomStr: (byteLength: number, encoding: SupportedEncodings) => string;
export declare const randomIntFromSeed: (seed: string, high: number, low?: number) => Promise<number>;
//# sourceMappingURL=random.d.ts.map