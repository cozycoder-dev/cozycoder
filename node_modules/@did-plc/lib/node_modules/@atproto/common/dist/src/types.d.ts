import * as mf from 'multiformats/cid';
import { z } from 'zod';
export declare const isCid: (str: string) => boolean;
declare const bytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
export declare type Bytes = z.infer<typeof bytes>;
export declare const def: {
    string: z.ZodString;
    cid: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, mf.CID, any>;
    strToCid: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, mf.CID, string>;
    bytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    strToInt: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, number, string>;
    strToBool: z.ZodEffects<z.ZodString, boolean, string>;
};
export {};
