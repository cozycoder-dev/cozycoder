import { z } from 'zod';
export declare const REQUEST_ID_LENGTH: number;
export declare const requestIdSchema: z.ZodEffects<z.ZodString, `req-${string}`, string>;
export type RequestId = z.infer<typeof requestIdSchema>;
export declare const generateRequestId: () => Promise<RequestId>;
//# sourceMappingURL=request-id.d.ts.map