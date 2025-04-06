import { z } from 'zod';
export declare const CODE_LENGTH: number;
export declare const codeSchema: z.ZodEffects<z.ZodString, `cod-${string}`, string>;
export declare const isCode: (data: unknown) => data is Code;
export type Code = z.infer<typeof codeSchema>;
export declare const generateCode: () => Promise<Code>;
//# sourceMappingURL=code.d.ts.map