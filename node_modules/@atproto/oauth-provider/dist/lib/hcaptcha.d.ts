import { z } from 'zod';
import { Fetch, FetchBound } from '@atproto-labs/fetch';
export declare const hcaptchaTokenSchema: z.ZodString;
export type HcaptchaToken = z.infer<typeof hcaptchaTokenSchema>;
export declare const hcaptchaConfigSchema: z.ZodObject<{
    /**
     * The hCaptcha site key to use for the sign-up form.
     */
    siteKey: z.ZodString;
    /**
     * The hCaptcha secret key to use for the sign-up form.
     */
    secretKey: z.ZodString;
    /**
     * A salt to use when hashing client tokens.
     */
    tokenSalt: z.ZodString;
    /**
     * The risk score above which the user is considered a threat and will be
     * denied access. This will be ignored if the enterprise features are not
     * available.
     *
     * Note: Score values ranges from 0.0 (no risk) to 1.0 (confirmed threat).
     */
    scoreThreshold: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    siteKey: string;
    secretKey: string;
    tokenSalt: string;
    scoreThreshold?: number | undefined;
}, {
    siteKey: string;
    secretKey: string;
    tokenSalt: string;
    scoreThreshold?: number | undefined;
}>;
export type HcaptchaConfig = z.infer<typeof hcaptchaConfigSchema>;
/**
 * @see {@link https://docs.hcaptcha.com/#verify-the-user-response-server-side hCaptcha API}
 */
export declare const hcaptchaVerifyResultSchema: z.ZodObject<{
    /**
     * is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
     */
    success: z.ZodBoolean;
    /**
     * timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     */
    challenge_ts: z.ZodString;
    /**
     * the hostname of the site where the challenge was passed
     */
    hostname: z.ZodNullable<z.ZodString>;
    /**
     * optional: any error codes returned by the hCaptcha API.
     * @see {@link https://docs.hcaptcha.com/#siteverify-error-codes-table}
     */
    'error-codes': z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * ENTERPRISE feature: a score denoting malicious activity. Value ranges from
     * 0.0 (no risk) to 1.0 (confirmed threat).
     */
    score: z.ZodOptional<z.ZodNumber>;
    /**
     * ENTERPRISE feature: reason(s) for score.
     */
    score_reason: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * sitekey of the request
     */
    sitekey: z.ZodOptional<z.ZodString>;
    /**
     * obj of form: {'ip_device': 1, .. etc}
     */
    behavior_counts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    /**
     * how similar is this? (0.0 - 1.0, -1 on err)
     */
    similarity: z.ZodOptional<z.ZodNumber>;
    /**
     * count of similar_tokens not processed
     */
    similarity_failures: z.ZodOptional<z.ZodNumber>;
    /**
     * array of strings for any similarity errors
     */
    similarity_error_details: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /**
     * encoded clientID
     */
    scoped_uid_0: z.ZodOptional<z.ZodString>;
    /**
     * encoded IP
     */
    scoped_uid_1: z.ZodOptional<z.ZodString>;
    /**
     * encoded IP (APT)
     */
    scoped_uid_2: z.ZodOptional<z.ZodString>;
    /**
     * Risk Insights (APT + RI)
     */
    risk_insights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    /**
     * Advanced Threat Signatures (APT)
     */
    sigs: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    /**
     * tags added via Rules
     */
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    hostname: string | null;
    success: boolean;
    challenge_ts: string;
    'error-codes'?: string[] | undefined;
    score?: number | undefined;
    score_reason?: string[] | undefined;
    sitekey?: string | undefined;
    behavior_counts?: Record<string, unknown> | undefined;
    similarity?: number | undefined;
    similarity_failures?: number | undefined;
    similarity_error_details?: string[] | undefined;
    scoped_uid_0?: string | undefined;
    scoped_uid_1?: string | undefined;
    scoped_uid_2?: string | undefined;
    risk_insights?: Record<string, unknown> | undefined;
    sigs?: Record<string, unknown> | undefined;
    tags?: string[] | undefined;
}, {
    hostname: string | null;
    success: boolean;
    challenge_ts: string;
    'error-codes'?: string[] | undefined;
    score?: number | undefined;
    score_reason?: string[] | undefined;
    sitekey?: string | undefined;
    behavior_counts?: Record<string, unknown> | undefined;
    similarity?: number | undefined;
    similarity_failures?: number | undefined;
    similarity_error_details?: string[] | undefined;
    scoped_uid_0?: string | undefined;
    scoped_uid_1?: string | undefined;
    scoped_uid_2?: string | undefined;
    risk_insights?: Record<string, unknown> | undefined;
    sigs?: Record<string, unknown> | undefined;
    tags?: string[] | undefined;
}>;
export type HcaptchaVerifyResult = z.infer<typeof hcaptchaVerifyResultSchema>;
export type HcaptchaClientTokens = {
    hashedIp: string;
    hashedHandle: string;
    hashedUserAgent?: string;
};
export declare class HCaptchaClient {
    readonly hostname: string;
    readonly config: HcaptchaConfig;
    protected readonly fetch: FetchBound;
    constructor(hostname: string, config: HcaptchaConfig, fetch?: Fetch);
    verify(behaviorType: 'login' | 'signup', response: string, remoteip: string, clientTokens: HcaptchaClientTokens): Promise<{
        hostname: string | null;
        success: boolean;
        challenge_ts: string;
        'error-codes'?: string[] | undefined;
        score?: number | undefined;
        score_reason?: string[] | undefined;
        sitekey?: string | undefined;
        behavior_counts?: Record<string, unknown> | undefined;
        similarity?: number | undefined;
        similarity_failures?: number | undefined;
        similarity_error_details?: string[] | undefined;
        scoped_uid_0?: string | undefined;
        scoped_uid_1?: string | undefined;
        scoped_uid_2?: string | undefined;
        risk_insights?: Record<string, unknown> | undefined;
        sigs?: Record<string, unknown> | undefined;
        tags?: string[] | undefined;
    }>;
    checkVerifyResult(result: HcaptchaVerifyResult, tokens: HcaptchaClientTokens): void;
    buildClientTokens(remoteip: string, handle: string, userAgent?: string): HcaptchaClientTokens;
    protected hashToken(value: string): string;
}
export declare class HCaptchaVerifyError extends Error {
    readonly result: HcaptchaVerifyResult;
    readonly tokens: HcaptchaClientTokens;
    constructor(result: HcaptchaVerifyResult, tokens: HcaptchaClientTokens, message?: string);
}
//# sourceMappingURL=hcaptcha.d.ts.map