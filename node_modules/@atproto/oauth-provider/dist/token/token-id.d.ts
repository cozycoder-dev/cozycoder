import { z } from 'zod';
export declare const TOKEN_ID_LENGTH: number;
export declare const tokenIdSchema: z.ZodEffects<z.ZodString, `tok-${string}`, string>;
export type TokenId = z.infer<typeof tokenIdSchema>;
export declare const generateTokenId: () => Promise<TokenId>;
export declare const isTokenId: (data: unknown) => data is TokenId;
//# sourceMappingURL=token-id.d.ts.map