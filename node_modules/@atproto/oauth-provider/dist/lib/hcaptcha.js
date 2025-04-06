"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HCaptchaVerifyError = exports.HCaptchaClient = exports.hcaptchaVerifyResultSchema = exports.hcaptchaConfigSchema = exports.hcaptchaTokenSchema = void 0;
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const fetch_1 = require("@atproto-labs/fetch");
const pipe_1 = require("@atproto-labs/pipe");
exports.hcaptchaTokenSchema = zod_1.z.string().min(1);
exports.hcaptchaConfigSchema = zod_1.z.object({
    /**
     * The hCaptcha site key to use for the sign-up form.
     */
    siteKey: zod_1.z.string().min(1),
    /**
     * The hCaptcha secret key to use for the sign-up form.
     */
    secretKey: zod_1.z.string().min(1),
    /**
     * A salt to use when hashing client tokens.
     */
    tokenSalt: zod_1.z.string().min(1),
    /**
     * The risk score above which the user is considered a threat and will be
     * denied access. This will be ignored if the enterprise features are not
     * available.
     *
     * Note: Score values ranges from 0.0 (no risk) to 1.0 (confirmed threat).
     */
    scoreThreshold: zod_1.z.number().optional(),
});
/**
 * @see {@link https://docs.hcaptcha.com/#verify-the-user-response-server-side hCaptcha API}
 */
exports.hcaptchaVerifyResultSchema = zod_1.z.object({
    /**
     * is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
     */
    success: zod_1.z.boolean(),
    /**
     * timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     */
    challenge_ts: zod_1.z.string(),
    /**
     * the hostname of the site where the challenge was passed
     */
    hostname: zod_1.z.string().nullable(),
    /**
     * optional: any error codes returned by the hCaptcha API.
     * @see {@link https://docs.hcaptcha.com/#siteverify-error-codes-table}
     */
    'error-codes': zod_1.z.array(zod_1.z.string()).optional(),
    /**
     * ENTERPRISE feature: a score denoting malicious activity. Value ranges from
     * 0.0 (no risk) to 1.0 (confirmed threat).
     */
    score: zod_1.z.number().optional(),
    /**
     * ENTERPRISE feature: reason(s) for score.
     */
    score_reason: zod_1.z.array(zod_1.z.string()).optional(),
    /**
     * sitekey of the request
     */
    sitekey: zod_1.z.string().optional(),
    /**
     * obj of form: {'ip_device': 1, .. etc}
     */
    behavior_counts: zod_1.z.record(zod_1.z.unknown()).optional(),
    /**
     * how similar is this? (0.0 - 1.0, -1 on err)
     */
    similarity: zod_1.z.number().optional(),
    /**
     * count of similar_tokens not processed
     */
    similarity_failures: zod_1.z.number().optional(),
    /**
     * array of strings for any similarity errors
     */
    similarity_error_details: zod_1.z.array(zod_1.z.string()).optional(),
    /**
     * encoded clientID
     */
    scoped_uid_0: zod_1.z.string().optional(),
    /**
     * encoded IP
     */
    scoped_uid_1: zod_1.z.string().optional(),
    /**
     * encoded IP (APT)
     */
    scoped_uid_2: zod_1.z.string().optional(),
    /**
     * Risk Insights (APT + RI)
     */
    risk_insights: zod_1.z.record(zod_1.z.unknown()).optional(),
    /**
     * Advanced Threat Signatures (APT)
     */
    sigs: zod_1.z.record(zod_1.z.unknown()).optional(),
    /**
     * tags added via Rules
     */
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
const fetchSuccessHandler = (0, pipe_1.pipe)((0, fetch_1.fetchOkProcessor)(), (0, fetch_1.fetchJsonProcessor)(), (0, fetch_1.fetchJsonZodProcessor)(exports.hcaptchaVerifyResultSchema));
class HCaptchaClient {
    hostname;
    config;
    fetch;
    constructor(hostname, config, fetch = globalThis.fetch) {
        this.hostname = hostname;
        this.config = config;
        this.fetch = (0, fetch_1.bindFetch)(fetch);
    }
    async verify(behaviorType, response, remoteip, clientTokens) {
        return this.fetch('https://api.hcaptcha.com/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: this.config.secretKey,
                sitekey: this.config.siteKey,
                behavior_type: behaviorType,
                response,
                remoteip,
                client_tokens: JSON.stringify(clientTokens),
            }).toString(),
        }).then(fetchSuccessHandler);
    }
    checkVerifyResult(result, tokens) {
        const { success, score } = result;
        if (success !== true) {
            throw new HCaptchaVerifyError(result, tokens, 'Expected success to be true');
        }
        // https://docs.hcaptcha.com/#verify-the-user-response-server-side
        // Please [...] note that the hostname field is derived from the user's
        // browser, and should not be used for authentication of any kind; it is
        // primarily useful as a statistical metric. Additionally, in the event that
        // your site experiences unusually high challenge traffic, the hostname
        // field may be returned as "not-provided" rather than the usual value; all
        // other fields will return their normal values.
        if (
        // Ignore if enterprise feature is not enabled
        score != null &&
            // Ignore if disabled through config
            this.config.scoreThreshold != null &&
            score >= this.config.scoreThreshold) {
            throw new HCaptchaVerifyError(result, tokens, `Score ${score} is above the threshold ${this.config.scoreThreshold}`);
        }
    }
    buildClientTokens(remoteip, handle, userAgent) {
        return {
            hashedIp: this.hashToken(remoteip),
            hashedHandle: this.hashToken(handle),
            hashedUserAgent: userAgent ? this.hashToken(userAgent) : undefined,
        };
    }
    hashToken(value) {
        const hash = (0, node_crypto_1.createHash)('sha256');
        hash.update(this.config.tokenSalt);
        hash.update(value);
        return hash.digest().toString('base64');
    }
}
exports.HCaptchaClient = HCaptchaClient;
class HCaptchaVerifyError extends Error {
    result;
    tokens;
    constructor(result, tokens, message) {
        super(message);
        this.result = result;
        this.tokens = tokens;
    }
}
exports.HCaptchaVerifyError = HCaptchaVerifyError;
//# sourceMappingURL=hcaptcha.js.map