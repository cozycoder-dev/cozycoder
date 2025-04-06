import { BrandingInput, HcaptchaConfig } from '@atproto/oauth-provider';
import { ServerEnvironment } from './env';
export declare const envToCfg: (env: ServerEnvironment) => ServerConfig;
export type ServerConfig = {
    service: ServiceConfig;
    db: DatabaseConfig;
    actorStore: ActorStoreConfig;
    blobstore: S3BlobstoreConfig | DiskBlobstoreConfig;
    identity: IdentityConfig;
    entryway: EntrywayConfig | null;
    invites: InvitesConfig;
    email: EmailConfig | null;
    moderationEmail: EmailConfig | null;
    subscription: SubscriptionConfig;
    bskyAppView: BksyAppViewConfig | null;
    modService: ModServiceConfig | null;
    reportService: ReportServiceConfig | null;
    redis: RedisScratchConfig | null;
    rateLimits: RateLimitsConfig;
    crawlers: string[];
    fetch: FetchConfig;
    proxy: ProxyConfig;
    oauth: OAuthConfig;
};
export type ServiceConfig = {
    port: number;
    hostname: string;
    publicUrl: string;
    did: string;
    version?: string;
    privacyPolicyUrl?: string;
    termsOfServiceUrl?: string;
    acceptingImports: boolean;
    blobUploadLimit: number;
    contactEmailAddress?: string;
    devMode: boolean;
};
export type DatabaseConfig = {
    accountDbLoc: string;
    sequencerDbLoc: string;
    didCacheDbLoc: string;
    disableWalAutoCheckpoint: boolean;
};
export type ActorStoreConfig = {
    directory: string;
    cacheSize: number;
    disableWalAutoCheckpoint: boolean;
};
export type S3BlobstoreConfig = {
    provider: 's3';
    bucket: string;
    region?: string;
    endpoint?: string;
    forcePathStyle?: boolean;
    uploadTimeoutMs?: number;
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
    };
};
export type DiskBlobstoreConfig = {
    provider: 'disk';
    location: string;
    tempLocation?: string;
};
export type IdentityConfig = {
    plcUrl: string;
    resolverTimeout: number;
    cacheStaleTTL: number;
    cacheMaxTTL: number;
    recoveryDidKey: string | null;
    serviceHandleDomains: string[];
    handleBackupNameservers?: string[];
    enableDidDocWithSession: boolean;
};
export type EntrywayConfig = {
    url: string;
    did: string;
    jwtPublicKeyHex: string;
    plcRotationKey: string;
};
export type FetchConfig = {
    disableSsrfProtection: boolean;
    maxResponseSize: number;
};
export type ProxyConfig = {
    disableSsrfProtection: boolean;
    allowHTTP2: boolean;
    headersTimeout: number;
    bodyTimeout: number;
    maxResponseSize: number;
    maxRetries: number;
    /**
     * When proxying requests that might get intercepted (for read-after-write) we
     * negotiate the encoding based on the client's preferences. We will however
     * use or own weights in order to be able to better control if the PDS will
     * need to perform content decoding. This settings allows to prefer compressed
     * content over uncompressed one.
     */
    preferCompressed: boolean;
};
export type OAuthConfig = {
    issuer: string;
    provider: false | {
        hcaptcha?: HcaptchaConfig;
        branding: BrandingInput;
    };
};
export type InvitesConfig = {
    required: true;
    interval: number | null;
    epoch: number;
} | {
    required: false;
};
export type EmailConfig = {
    smtpUrl: string;
    fromAddress: string;
};
export type SubscriptionConfig = {
    maxBuffer: number;
    repoBackfillLimitMs: number;
};
export type RedisScratchConfig = {
    address: string;
    password?: string;
};
export type RateLimitsConfig = {
    enabled: true;
    mode: 'memory' | 'redis';
    bypassKey?: string;
    bypassIps?: string[];
} | {
    enabled: false;
};
export type BksyAppViewConfig = {
    url: string;
    did: string;
    cdnUrlPattern?: string;
};
export type ModServiceConfig = {
    url: string;
    did: string;
};
export type ReportServiceConfig = {
    url: string;
    did: string;
};
//# sourceMappingURL=config.d.ts.map