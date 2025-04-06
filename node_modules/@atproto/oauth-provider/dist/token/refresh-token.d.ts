import { z } from 'zod';
export declare const REFRESH_TOKEN_LENGTH: number;
export declare const refreshTokenSchema: z.ZodEffects<z.ZodString, `ref-${string}`, string>;
export declare const isRefreshToken: (data: unknown) => data is RefreshToken;
export type RefreshToken = z.infer<typeof refreshTokenSchema>;
export declare const generateRefreshToken: () => Promise<RefreshToken>;
//# sourceMappingURL=refresh-token.d.ts.map