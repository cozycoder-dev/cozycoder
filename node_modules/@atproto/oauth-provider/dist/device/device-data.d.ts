import { z } from 'zod';
export declare const deviceDataSchema: z.ZodObject<{
    sessionId: z.ZodEffects<z.ZodString, `ses-${string}`, string>;
    lastSeenAt: z.ZodDate;
    userAgent: z.ZodNullable<z.ZodString>;
    ipAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: `ses-${string}`;
    lastSeenAt: Date;
    userAgent: string | null;
    ipAddress: string;
}, {
    sessionId: string;
    lastSeenAt: Date;
    userAgent: string | null;
    ipAddress: string;
}>;
export type DeviceData = z.infer<typeof deviceDataSchema>;
//# sourceMappingURL=device-data.d.ts.map