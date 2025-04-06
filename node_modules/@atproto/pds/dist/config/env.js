"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnv = void 0;
const common_1 = require("@atproto/common");
const readEnv = () => {
    return {
        // service
        port: (0, common_1.envInt)('PDS_PORT'),
        hostname: (0, common_1.envStr)('PDS_HOSTNAME'),
        serviceDid: (0, common_1.envStr)('PDS_SERVICE_DID'),
        serviceName: (0, common_1.envStr)('PDS_SERVICE_NAME'),
        version: (0, common_1.envStr)('PDS_VERSION'),
        homeUrl: (0, common_1.envStr)('PDS_HOME_URL'),
        logoUrl: (0, common_1.envStr)('PDS_LOGO_URL'),
        privacyPolicyUrl: (0, common_1.envStr)('PDS_PRIVACY_POLICY_URL'),
        supportUrl: (0, common_1.envStr)('PDS_SUPPORT_URL'),
        termsOfServiceUrl: (0, common_1.envStr)('PDS_TERMS_OF_SERVICE_URL'),
        contactEmailAddress: (0, common_1.envStr)('PDS_CONTACT_EMAIL_ADDRESS'),
        acceptingImports: (0, common_1.envBool)('PDS_ACCEPTING_REPO_IMPORTS'),
        blobUploadLimit: (0, common_1.envInt)('PDS_BLOB_UPLOAD_LIMIT'),
        devMode: (0, common_1.envBool)('PDS_DEV_MODE'),
        // OAuth
        hcaptchaSiteKey: (0, common_1.envStr)('PDS_HCAPTCHA_SITE_KEY'),
        hcaptchaSecretKey: (0, common_1.envStr)('PDS_HCAPTCHA_SECRET_KEY'),
        hcaptchaTokenSalt: (0, common_1.envStr)('PDS_HCAPTCHA_TOKEN_SALT'),
        // branding
        brandColor: (0, common_1.envStr)('PDS_PRIMARY_COLOR'),
        errorColor: (0, common_1.envStr)('PDS_ERROR_COLOR'),
        warningColor: (0, common_1.envStr)('PDS_WARNING_COLOR'),
        successColor: (0, common_1.envStr)('PDS_SUCCESS_COLOR'),
        // database
        dataDirectory: (0, common_1.envStr)('PDS_DATA_DIRECTORY'),
        disableWalAutoCheckpoint: (0, common_1.envBool)('PDS_SQLITE_DISABLE_WAL_AUTO_CHECKPOINT'),
        accountDbLocation: (0, common_1.envStr)('PDS_ACCOUNT_DB_LOCATION'),
        sequencerDbLocation: (0, common_1.envStr)('PDS_SEQUENCER_DB_LOCATION'),
        didCacheDbLocation: (0, common_1.envStr)('PDS_DID_CACHE_DB_LOCATION'),
        // actor store
        actorStoreDirectory: (0, common_1.envStr)('PDS_ACTOR_STORE_DIRECTORY'),
        actorStoreCacheSize: (0, common_1.envInt)('PDS_ACTOR_STORE_CACHE_SIZE'),
        // blobstore: one required
        // s3
        blobstoreS3Bucket: (0, common_1.envStr)('PDS_BLOBSTORE_S3_BUCKET'),
        blobstoreS3Region: (0, common_1.envStr)('PDS_BLOBSTORE_S3_REGION'),
        blobstoreS3Endpoint: (0, common_1.envStr)('PDS_BLOBSTORE_S3_ENDPOINT'),
        blobstoreS3ForcePathStyle: (0, common_1.envBool)('PDS_BLOBSTORE_S3_FORCE_PATH_STYLE'),
        blobstoreS3AccessKeyId: (0, common_1.envStr)('PDS_BLOBSTORE_S3_ACCESS_KEY_ID'),
        blobstoreS3SecretAccessKey: (0, common_1.envStr)('PDS_BLOBSTORE_S3_SECRET_ACCESS_KEY'),
        blobstoreS3UploadTimeoutMs: (0, common_1.envInt)('PDS_BLOBSTORE_S3_UPLOAD_TIMEOUT_MS'),
        // disk
        blobstoreDiskLocation: (0, common_1.envStr)('PDS_BLOBSTORE_DISK_LOCATION'),
        blobstoreDiskTmpLocation: (0, common_1.envStr)('PDS_BLOBSTORE_DISK_TMP_LOCATION'),
        // identity
        didPlcUrl: (0, common_1.envStr)('PDS_DID_PLC_URL'),
        didCacheStaleTTL: (0, common_1.envInt)('PDS_DID_CACHE_STALE_TTL'),
        didCacheMaxTTL: (0, common_1.envInt)('PDS_DID_CACHE_MAX_TTL'),
        resolverTimeout: (0, common_1.envInt)('PDS_ID_RESOLVER_TIMEOUT'),
        recoveryDidKey: (0, common_1.envStr)('PDS_RECOVERY_DID_KEY'),
        serviceHandleDomains: (0, common_1.envList)('PDS_SERVICE_HANDLE_DOMAINS'),
        handleBackupNameservers: (0, common_1.envList)('PDS_HANDLE_BACKUP_NAMESERVERS'),
        enableDidDocWithSession: (0, common_1.envBool)('PDS_ENABLE_DID_DOC_WITH_SESSION'),
        // entryway
        entrywayUrl: (0, common_1.envStr)('PDS_ENTRYWAY_URL'),
        entrywayDid: (0, common_1.envStr)('PDS_ENTRYWAY_DID'),
        entrywayJwtVerifyKeyK256PublicKeyHex: (0, common_1.envStr)('PDS_ENTRYWAY_JWT_VERIFY_KEY_K256_PUBLIC_KEY_HEX'),
        entrywayPlcRotationKey: (0, common_1.envStr)('PDS_ENTRYWAY_PLC_ROTATION_KEY'),
        // invites
        inviteRequired: (0, common_1.envBool)('PDS_INVITE_REQUIRED'),
        inviteInterval: (0, common_1.envInt)('PDS_INVITE_INTERVAL'),
        inviteEpoch: (0, common_1.envInt)('PDS_INVITE_EPOCH'),
        // email
        emailSmtpUrl: (0, common_1.envStr)('PDS_EMAIL_SMTP_URL'),
        emailFromAddress: (0, common_1.envStr)('PDS_EMAIL_FROM_ADDRESS'),
        moderationEmailSmtpUrl: (0, common_1.envStr)('PDS_MODERATION_EMAIL_SMTP_URL'),
        moderationEmailAddress: (0, common_1.envStr)('PDS_MODERATION_EMAIL_ADDRESS'),
        // subscription
        maxSubscriptionBuffer: (0, common_1.envInt)('PDS_MAX_SUBSCRIPTION_BUFFER'),
        repoBackfillLimitMs: (0, common_1.envInt)('PDS_REPO_BACKFILL_LIMIT_MS'),
        // appview
        bskyAppViewUrl: (0, common_1.envStr)('PDS_BSKY_APP_VIEW_URL'),
        bskyAppViewDid: (0, common_1.envStr)('PDS_BSKY_APP_VIEW_DID'),
        bskyAppViewCdnUrlPattern: (0, common_1.envStr)('PDS_BSKY_APP_VIEW_CDN_URL_PATTERN'),
        // mod service
        modServiceUrl: (0, common_1.envStr)('PDS_MOD_SERVICE_URL'),
        modServiceDid: (0, common_1.envStr)('PDS_MOD_SERVICE_DID'),
        // report service
        reportServiceUrl: (0, common_1.envStr)('PDS_REPORT_SERVICE_URL'),
        reportServiceDid: (0, common_1.envStr)('PDS_REPORT_SERVICE_DID'),
        // rate limits
        rateLimitsEnabled: (0, common_1.envBool)('PDS_RATE_LIMITS_ENABLED'),
        rateLimitBypassKey: (0, common_1.envStr)('PDS_RATE_LIMIT_BYPASS_KEY'),
        rateLimitBypassIps: (0, common_1.envList)('PDS_RATE_LIMIT_BYPASS_IPS'),
        // redis
        redisScratchAddress: (0, common_1.envStr)('PDS_REDIS_SCRATCH_ADDRESS'),
        redisScratchPassword: (0, common_1.envStr)('PDS_REDIS_SCRATCH_PASSWORD'),
        // crawlers
        crawlers: (0, common_1.envList)('PDS_CRAWLERS'),
        // secrets
        dpopSecret: (0, common_1.envStr)('PDS_DPOP_SECRET'),
        jwtSecret: (0, common_1.envStr)('PDS_JWT_SECRET'),
        adminPassword: (0, common_1.envStr)('PDS_ADMIN_PASSWORD'),
        entrywayAdminToken: (0, common_1.envStr)('PDS_ENTRYWAY_ADMIN_TOKEN'),
        // kms
        plcRotationKeyKmsKeyId: (0, common_1.envStr)('PDS_PLC_ROTATION_KEY_KMS_KEY_ID'),
        // memory
        plcRotationKeyK256PrivateKeyHex: (0, common_1.envStr)('PDS_PLC_ROTATION_KEY_K256_PRIVATE_KEY_HEX'),
        // user provided url http requests
        disableSsrfProtection: (0, common_1.envBool)('PDS_DISABLE_SSRF_PROTECTION'),
        // fetch
        fetchMaxResponseSize: (0, common_1.envInt)('PDS_FETCH_MAX_RESPONSE_SIZE'),
        // proxy
        proxyAllowHTTP2: (0, common_1.envBool)('PDS_PROXY_ALLOW_HTTP2'),
        proxyHeadersTimeout: (0, common_1.envInt)('PDS_PROXY_HEADERS_TIMEOUT'),
        proxyBodyTimeout: (0, common_1.envInt)('PDS_PROXY_BODY_TIMEOUT'),
        proxyMaxResponseSize: (0, common_1.envInt)('PDS_PROXY_MAX_RESPONSE_SIZE'),
        proxyMaxRetries: (0, common_1.envInt)('PDS_PROXY_MAX_RETRIES'),
        proxyPreferCompressed: (0, common_1.envBool)('PDS_PROXY_PREFER_COMPRESSED'),
    };
};
exports.readEnv = readEnv;
//# sourceMappingURL=env.js.map