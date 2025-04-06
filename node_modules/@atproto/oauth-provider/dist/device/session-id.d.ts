import { z } from 'zod';
export declare const SESSION_ID_LENGTH: number;
export declare const sessionIdSchema: z.ZodEffects<z.ZodString, `ses-${string}`, string>;
export type SessionId = z.infer<typeof sessionIdSchema>;
export declare const generateSessionId: () => Promise<SessionId>;
//# sourceMappingURL=session-id.d.ts.map