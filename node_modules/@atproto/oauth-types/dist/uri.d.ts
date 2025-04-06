import { TypeOf, z } from 'zod';
/**
 * Valid, but potentially dangerous URL (`data:`, `file:`, `javascript:`, etc.).
 *
 * Any value that matches this schema is safe to parse using `new URL()`.
 */
export declare const dangerousUriSchema: z.ZodEffects<z.ZodString, `${string}:${string}`, string>;
/**
 * Valid, but potentially dangerous URL (`data:`, `file:`, `javascript:`, etc.).
 */
export type DangerousUrl = TypeOf<typeof dangerousUriSchema>;
export declare const loopbackUriSchema: z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}`, string>;
export type LoopbackUri = TypeOf<typeof loopbackUriSchema>;
export declare const httpsUriSchema: z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `https://${string}`, string>;
export type HttpsUri = TypeOf<typeof httpsUriSchema>;
export declare const webUriSchema: z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>;
export type WebUri = TypeOf<typeof webUriSchema>;
export declare const privateUseUriSchema: z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `${string}.${string}:/${string}`, string>;
export type PrivateUseUri = TypeOf<typeof privateUseUriSchema>;
//# sourceMappingURL=uri.d.ts.map