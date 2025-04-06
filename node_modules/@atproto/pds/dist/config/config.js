"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envToCfg = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const node_path_1 = __importDefault(require("node:path"));
const common_1 = require("@atproto/common");
// off-config but still from env:
// logging: LOG_LEVEL, LOG_SYSTEMS, LOG_ENABLED, LOG_DESTINATION
const envToCfg = (env) => {
    const port = env.port ?? 2583;
    const hostname = env.hostname ?? 'localhost';
    const publicUrl = hostname === 'localhost'
        ? `http://localhost:${port}`
        : `https://${hostname}`;
    const did = env.serviceDid ?? `did:web:${hostname}`;
    const serviceCfg = {
        port,
        hostname,
        publicUrl,
        did,
        version: env.version, // default?
        privacyPolicyUrl: env.privacyPolicyUrl,
        termsOfServiceUrl: env.termsOfServiceUrl,
        contactEmailAddress: env.contactEmailAddress,
        acceptingImports: env.acceptingImports ?? true,
        blobUploadLimit: env.blobUploadLimit ?? 5 * 1024 * 1024, // 5mb
        devMode: env.devMode ?? false,
    };
    const dbLoc = (name) => {
        return env.dataDirectory ? node_path_1.default.join(env.dataDirectory, name) : name;
    };
    const disableWalAutoCheckpoint = env.disableWalAutoCheckpoint ?? false;
    const dbCfg = {
        accountDbLoc: env.accountDbLocation ?? dbLoc('account.sqlite'),
        sequencerDbLoc: env.sequencerDbLocation ?? dbLoc('sequencer.sqlite'),
        didCacheDbLoc: env.didCacheDbLocation ?? dbLoc('did_cache.sqlite'),
        disableWalAutoCheckpoint,
    };
    const actorStoreCfg = {
        directory: env.actorStoreDirectory ?? dbLoc('actors'),
        cacheSize: env.actorStoreCacheSize ?? 100,
        disableWalAutoCheckpoint,
    };
    let blobstoreCfg;
    if (env.blobstoreS3Bucket && env.blobstoreDiskLocation) {
        throw new Error('Cannot set both S3 and disk blobstore env vars');
    }
    if (env.blobstoreS3Bucket) {
        blobstoreCfg = {
            provider: 's3',
            bucket: env.blobstoreS3Bucket,
            uploadTimeoutMs: env.blobstoreS3UploadTimeoutMs || 20000,
            region: env.blobstoreS3Region,
            endpoint: env.blobstoreS3Endpoint,
            forcePathStyle: env.blobstoreS3ForcePathStyle,
        };
        if (env.blobstoreS3AccessKeyId || env.blobstoreS3SecretAccessKey) {
            if (!env.blobstoreS3AccessKeyId || !env.blobstoreS3SecretAccessKey) {
                throw new Error('Must specify both S3 access key id and secret access key blobstore env vars');
            }
            blobstoreCfg.credentials = {
                accessKeyId: env.blobstoreS3AccessKeyId,
                secretAccessKey: env.blobstoreS3SecretAccessKey,
            };
        }
    }
    else if (env.blobstoreDiskLocation) {
        blobstoreCfg = {
            provider: 'disk',
            location: env.blobstoreDiskLocation,
            tempLocation: env.blobstoreDiskTmpLocation,
        };
    }
    else {
        throw new Error('Must configure either S3 or disk blobstore');
    }
    let serviceHandleDomains;
    if (env.serviceHandleDomains && env.serviceHandleDomains.length > 0) {
        serviceHandleDomains = env.serviceHandleDomains;
    }
    else {
        if (hostname === 'localhost') {
            serviceHandleDomains = ['.test'];
        }
        else {
            serviceHandleDomains = [`.${hostname}`];
        }
    }
    const invalidDomain = serviceHandleDomains.find((domain) => domain.length < 1 || !domain.startsWith('.'));
    if (invalidDomain) {
        throw new Error(`Invalid handle domain: ${invalidDomain}`);
    }
    const identityCfg = {
        plcUrl: env.didPlcUrl ?? 'https://plc.directory',
        cacheMaxTTL: env.didCacheMaxTTL ?? common_1.DAY,
        cacheStaleTTL: env.didCacheStaleTTL ?? common_1.HOUR,
        resolverTimeout: env.resolverTimeout ?? 3 * common_1.SECOND,
        recoveryDidKey: env.recoveryDidKey ?? null,
        serviceHandleDomains,
        handleBackupNameservers: env.handleBackupNameservers,
        enableDidDocWithSession: !!env.enableDidDocWithSession,
    };
    let entrywayCfg = null;
    if (env.entrywayUrl) {
        (0, node_assert_1.default)(env.entrywayJwtVerifyKeyK256PublicKeyHex &&
            env.entrywayPlcRotationKey &&
            env.entrywayDid, 'if entryway url is configured, must include all required entryway configuration');
        entrywayCfg = {
            url: env.entrywayUrl,
            did: env.entrywayDid,
            jwtPublicKeyHex: env.entrywayJwtVerifyKeyK256PublicKeyHex,
            plcRotationKey: env.entrywayPlcRotationKey,
        };
    }
    // default to being required if left undefined
    const invitesCfg = env.inviteRequired === false
        ? {
            required: false,
        }
        : {
            required: true,
            interval: env.inviteInterval ?? null,
            epoch: env.inviteEpoch ?? 0,
        };
    let emailCfg;
    if (!env.emailFromAddress && !env.emailSmtpUrl) {
        emailCfg = null;
    }
    else {
        if (!env.emailFromAddress || !env.emailSmtpUrl) {
            throw new Error('Partial email config, must set both emailFromAddress and emailSmtpUrl');
        }
        emailCfg = {
            smtpUrl: env.emailSmtpUrl,
            fromAddress: env.emailFromAddress,
        };
    }
    let moderationEmailCfg;
    if (!env.moderationEmailAddress && !env.moderationEmailSmtpUrl) {
        moderationEmailCfg = null;
    }
    else {
        if (!env.moderationEmailAddress || !env.moderationEmailSmtpUrl) {
            throw new Error('Partial moderation email config, must set both emailFromAddress and emailSmtpUrl');
        }
        moderationEmailCfg = {
            smtpUrl: env.moderationEmailSmtpUrl,
            fromAddress: env.moderationEmailAddress,
        };
    }
    const subscriptionCfg = {
        maxBuffer: env.maxSubscriptionBuffer ?? 500,
        repoBackfillLimitMs: env.repoBackfillLimitMs ?? common_1.DAY,
    };
    let bskyAppViewCfg = null;
    if (env.bskyAppViewUrl) {
        (0, node_assert_1.default)(env.bskyAppViewDid, 'if bsky appview service url is configured, must configure its did as well.');
        bskyAppViewCfg = {
            url: env.bskyAppViewUrl,
            did: env.bskyAppViewDid,
            cdnUrlPattern: env.bskyAppViewCdnUrlPattern,
        };
    }
    let modServiceCfg = null;
    if (env.modServiceUrl) {
        (0, node_assert_1.default)(env.modServiceDid, 'if mod service url is configured, must configure its did as well.');
        modServiceCfg = {
            url: env.modServiceUrl,
            did: env.modServiceDid,
        };
    }
    let reportServiceCfg = null;
    if (env.reportServiceUrl) {
        (0, node_assert_1.default)(env.reportServiceDid, 'if report service url is configured, must configure its did as well.');
        reportServiceCfg = {
            url: env.reportServiceUrl,
            did: env.reportServiceDid,
        };
    }
    // if there's a mod service, default report service into it
    if (modServiceCfg && !reportServiceCfg) {
        reportServiceCfg = modServiceCfg;
    }
    const redisCfg = env.redisScratchAddress
        ? {
            address: env.redisScratchAddress,
            password: env.redisScratchPassword,
        }
        : null;
    const rateLimitsCfg = env.rateLimitsEnabled
        ? {
            enabled: true,
            mode: redisCfg !== null ? 'redis' : 'memory',
            bypassKey: env.rateLimitBypassKey,
            bypassIps: env.rateLimitBypassIps?.map((ipOrCidr) => ipOrCidr.split('/')[0]?.trim()),
        }
        : { enabled: false };
    const crawlersCfg = env.crawlers ?? [];
    const fetchCfg = {
        disableSsrfProtection: env.disableSsrfProtection ?? env.devMode ?? false,
        maxResponseSize: env.fetchMaxResponseSize ?? 512 * 1024, // 512kb
    };
    const proxyCfg = {
        disableSsrfProtection: env.disableSsrfProtection ?? env.devMode ?? false,
        allowHTTP2: env.proxyAllowHTTP2 ?? false,
        headersTimeout: env.proxyHeadersTimeout ?? 10e3,
        bodyTimeout: env.proxyBodyTimeout ?? 30e3,
        maxResponseSize: env.proxyMaxResponseSize ?? 10 * 1024 * 1024, // 10mb
        maxRetries: env.proxyMaxRetries != null && env.proxyMaxRetries > 0
            ? env.proxyMaxRetries
            : 0,
        preferCompressed: env.proxyPreferCompressed ?? false,
    };
    const oauthCfg = entrywayCfg
        ? {
            issuer: entrywayCfg.url,
            provider: false,
        }
        : {
            issuer: serviceCfg.publicUrl,
            provider: {
                hcaptcha: env.hcaptchaSiteKey &&
                    env.hcaptchaSecretKey &&
                    env.hcaptchaTokenSalt
                    ? {
                        siteKey: env.hcaptchaSiteKey,
                        secretKey: env.hcaptchaSecretKey,
                        tokenSalt: env.hcaptchaTokenSalt,
                    }
                    : undefined,
                branding: {
                    name: env.serviceName ?? 'Personal PDS',
                    logo: env.logoUrl,
                    colors: {
                        brand: env.brandColor,
                        error: env.errorColor,
                        success: env.successColor,
                        warning: env.warningColor,
                    },
                    links: [
                        {
                            title: { en: 'Home', fr: 'Accueil' },
                            href: env.homeUrl,
                            rel: 'canonical', // Prevents login page from being indexed
                        },
                        {
                            title: { en: 'Terms of Service' },
                            href: env.termsOfServiceUrl,
                            rel: 'terms-of-service',
                        },
                        {
                            title: { en: 'Privacy Policy' },
                            href: env.privacyPolicyUrl,
                            rel: 'privacy-policy',
                        },
                        {
                            title: { en: 'Support' },
                            href: env.supportUrl,
                            rel: 'help',
                        },
                    ].filter((f) => f.href != null && f.href !== ''),
                },
            },
        };
    return {
        service: serviceCfg,
        db: dbCfg,
        actorStore: actorStoreCfg,
        blobstore: blobstoreCfg,
        identity: identityCfg,
        entryway: entrywayCfg,
        invites: invitesCfg,
        email: emailCfg,
        moderationEmail: moderationEmailCfg,
        subscription: subscriptionCfg,
        bskyAppView: bskyAppViewCfg,
        modService: modServiceCfg,
        reportService: reportServiceCfg,
        redis: redisCfg,
        rateLimits: rateLimitsCfg,
        crawlers: crawlersCfg,
        fetch: fetchCfg,
        proxy: proxyCfg,
        oauth: oauthCfg,
    };
};
exports.envToCfg = envToCfg;
//# sourceMappingURL=config.js.map