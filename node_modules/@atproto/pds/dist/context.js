"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const plc = __importStar(require("@did-plc/lib"));
const nodemailer = __importStar(require("nodemailer"));
const ui8 = __importStar(require("uint8arrays"));
const undici = __importStar(require("undici"));
const api_1 = require("@atproto/api");
const aws_1 = require("@atproto/aws");
const crypto = __importStar(require("@atproto/crypto"));
const identity_1 = require("@atproto/identity");
const oauth_provider_1 = require("@atproto/oauth-provider");
const xrpc_server_1 = require("@atproto/xrpc-server");
const fetch_node_1 = require("@atproto-labs/fetch-node");
const account_manager_1 = require("./account-manager/account-manager");
const oauth_store_1 = require("./account-manager/oauth-store");
const actor_store_1 = require("./actor-store/actor-store");
const proxy_1 = require("./api/proxy");
const auth_verifier_1 = require("./auth-verifier");
const background_1 = require("./background");
const bsky_app_view_1 = require("./bsky-app-view");
const crawlers_1 = require("./crawlers");
const did_cache_1 = require("./did-cache");
const disk_blobstore_1 = require("./disk-blobstore");
const image_url_builder_1 = require("./image/image-url-builder");
const logger_1 = require("./logger");
const mailer_1 = require("./mailer");
const moderation_1 = require("./mailer/moderation");
const viewer_1 = require("./read-after-write/viewer");
const redis_1 = require("./redis");
const sequencer_1 = require("./sequencer");
class AppContext {
    constructor(opts) {
        Object.defineProperty(this, "actorStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "blobstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localViewer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mailer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "moderationMailer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "didCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plcClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sequencer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redisScratch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ratelimitCreator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "crawlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bskyAppView", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "moderationAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reportingAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entrywayAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entrywayAdminAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "proxyAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "safeFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "authVerifier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "oauthProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plcRotationKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.actorStore = opts.actorStore;
        this.blobstore = opts.blobstore;
        this.localViewer = opts.localViewer;
        this.mailer = opts.mailer;
        this.moderationMailer = opts.moderationMailer;
        this.didCache = opts.didCache;
        this.idResolver = opts.idResolver;
        this.plcClient = opts.plcClient;
        this.accountManager = opts.accountManager;
        this.sequencer = opts.sequencer;
        this.backgroundQueue = opts.backgroundQueue;
        this.redisScratch = opts.redisScratch;
        this.ratelimitCreator = opts.ratelimitCreator;
        this.crawlers = opts.crawlers;
        this.bskyAppView = opts.bskyAppView;
        this.moderationAgent = opts.moderationAgent;
        this.reportingAgent = opts.reportingAgent;
        this.entrywayAgent = opts.entrywayAgent;
        this.entrywayAdminAgent = opts.entrywayAdminAgent;
        this.proxyAgent = opts.proxyAgent;
        this.safeFetch = opts.safeFetch;
        this.authVerifier = opts.authVerifier;
        this.oauthProvider = opts.oauthProvider;
        this.plcRotationKey = opts.plcRotationKey;
        this.cfg = opts.cfg;
    }
    static async fromConfig(cfg, secrets, overrides) {
        const blobstore = cfg.blobstore.provider === 's3'
            ? aws_1.S3BlobStore.creator({
                bucket: cfg.blobstore.bucket,
                region: cfg.blobstore.region,
                endpoint: cfg.blobstore.endpoint,
                forcePathStyle: cfg.blobstore.forcePathStyle,
                credentials: cfg.blobstore.credentials,
                uploadTimeoutMs: cfg.blobstore.uploadTimeoutMs,
            })
            : disk_blobstore_1.DiskBlobStore.creator(cfg.blobstore.location, cfg.blobstore.tempLocation);
        const mailTransport = cfg.email !== null
            ? nodemailer.createTransport(cfg.email.smtpUrl)
            : nodemailer.createTransport({ jsonTransport: true });
        const mailer = new mailer_1.ServerMailer(mailTransport, cfg);
        const modMailTransport = cfg.moderationEmail !== null
            ? nodemailer.createTransport(cfg.moderationEmail.smtpUrl)
            : nodemailer.createTransport({ jsonTransport: true });
        const moderationMailer = new moderation_1.ModerationMailer(modMailTransport, cfg);
        const didCache = new did_cache_1.DidSqliteCache(cfg.db.didCacheDbLoc, cfg.identity.cacheStaleTTL, cfg.identity.cacheMaxTTL, cfg.db.disableWalAutoCheckpoint);
        await didCache.migrateOrThrow();
        const idResolver = new identity_1.IdResolver({
            plcUrl: cfg.identity.plcUrl,
            didCache,
            timeout: cfg.identity.resolverTimeout,
            backupNameservers: cfg.identity.handleBackupNameservers,
        });
        const plcClient = new plc.Client(cfg.identity.plcUrl);
        const backgroundQueue = new background_1.BackgroundQueue();
        const crawlers = new crawlers_1.Crawlers(cfg.service.hostname, cfg.crawlers, backgroundQueue);
        const sequencer = new sequencer_1.Sequencer(cfg.db.sequencerDbLoc, crawlers, undefined, cfg.db.disableWalAutoCheckpoint);
        const redisScratch = cfg.redis
            ? (0, redis_1.getRedisClient)(cfg.redis.address, cfg.redis.password)
            : undefined;
        let ratelimitCreator = undefined;
        if (cfg.rateLimits.enabled) {
            const bypassSecret = cfg.rateLimits.bypassKey;
            const bypassIps = cfg.rateLimits.bypassIps;
            if (cfg.rateLimits.mode === 'redis') {
                if (!redisScratch) {
                    throw new Error('Redis not set up for ratelimiting mode: `redis`');
                }
                ratelimitCreator = (opts) => xrpc_server_1.RateLimiter.redis(redisScratch, {
                    bypassSecret,
                    bypassIps,
                    ...opts,
                });
            }
            else {
                ratelimitCreator = (opts) => xrpc_server_1.RateLimiter.memory({
                    bypassSecret,
                    bypassIps,
                    ...opts,
                });
            }
        }
        const bskyAppView = cfg.bskyAppView
            ? new bsky_app_view_1.BskyAppView(cfg.bskyAppView)
            : undefined;
        const moderationAgent = cfg.modService
            ? new api_1.AtpAgent({ service: cfg.modService.url })
            : undefined;
        const reportingAgent = cfg.reportService
            ? new api_1.AtpAgent({ service: cfg.reportService.url })
            : undefined;
        const entrywayAgent = cfg.entryway
            ? new api_1.AtpAgent({ service: cfg.entryway.url })
            : undefined;
        let entrywayAdminAgent;
        if (cfg.entryway && secrets.entrywayAdminToken) {
            entrywayAdminAgent = new api_1.AtpAgent({ service: cfg.entryway.url });
            entrywayAdminAgent.api.setHeader('authorization', basicAuthHeader('admin', secrets.entrywayAdminToken));
        }
        const jwtSecretKey = (0, auth_verifier_1.createSecretKeyObject)(secrets.jwtSecret);
        const jwtPublicKey = cfg.entryway
            ? (0, auth_verifier_1.createPublicKeyObject)(cfg.entryway.jwtPublicKeyHex)
            : null;
        const imageUrlBuilder = new image_url_builder_1.ImageUrlBuilder(cfg.service.hostname, bskyAppView);
        const actorStore = new actor_store_1.ActorStore(cfg.actorStore, {
            blobstore,
            backgroundQueue,
        });
        const accountManager = new account_manager_1.AccountManager(idResolver, jwtSecretKey, cfg.service.did, cfg.identity.serviceHandleDomains, cfg.db);
        await accountManager.migrateOrThrow();
        const plcRotationKey = secrets.plcRotationKey.provider === 'kms'
            ? await aws_1.KmsKeypair.load({
                keyId: secrets.plcRotationKey.keyId,
            })
            : await crypto.Secp256k1Keypair.import(secrets.plcRotationKey.privateKeyHex);
        const localViewer = viewer_1.LocalViewer.creator(accountManager, imageUrlBuilder, bskyAppView);
        // An agent for performing HTTP requests based on user provided URLs.
        const proxyAgentBase = new undici.Agent({
            allowH2: cfg.proxy.allowHTTP2, // This is experimental
            headersTimeout: cfg.proxy.headersTimeout,
            maxResponseSize: cfg.proxy.maxResponseSize,
            bodyTimeout: cfg.proxy.bodyTimeout,
            factory: cfg.proxy.disableSsrfProtection
                ? undefined
                : (origin, opts) => {
                    const { protocol, hostname } = origin instanceof URL ? origin : new URL(origin);
                    if (protocol !== 'https:') {
                        throw new Error(`Forbidden protocol "${protocol}"`);
                    }
                    if ((0, fetch_node_1.isUnicastIp)(hostname) === false) {
                        throw new Error('Hostname resolved to non-unicast address');
                    }
                    return new undici.Pool(origin, opts);
                },
            connect: {
                lookup: cfg.proxy.disableSsrfProtection ? undefined : fetch_node_1.unicastLookup,
            },
        });
        const proxyAgent = cfg.proxy.maxRetries > 0
            ? new undici.RetryAgent(proxyAgentBase, {
                statusCodes: [], // Only retry on socket errors
                methods: ['GET', 'HEAD'],
                maxRetries: cfg.proxy.maxRetries,
            })
            : proxyAgentBase;
        // A fetch() function that protects against SSRF attacks, large responses &
        // known bad domains. This function can safely be used to fetch user
        // provided URLs (unless "disableSsrfProtection" is true, of course).
        const safeFetch = (0, fetch_node_1.loggedFetch)({
            fetch: (0, fetch_node_1.safeFetchWrap)({
                // Using globalThis.fetch allows safeFetchWrap to use keep-alive. See
                // unicastFetchWrap().
                fetch: globalThis.fetch,
                allowIpHost: false,
                responseMaxSize: cfg.fetch.maxResponseSize,
                ssrfProtection: !cfg.fetch.disableSsrfProtection,
            }),
            logRequest: ({ method, url }) => {
                logger_1.fetchLogger.debug({ method, uri: url }, 'fetch');
            },
            logResponse: false,
            logError: false,
        });
        const oauthProvider = cfg.oauth.provider
            ? new oauth_provider_1.OAuthProvider({
                issuer: cfg.oauth.issuer,
                keyset: [await oauth_provider_1.JoseKey.fromKeyLike(jwtSecretKey, undefined, 'HS256')],
                store: new oauth_store_1.OAuthStore(accountManager, actorStore, imageUrlBuilder, backgroundQueue, mailer, sequencer, plcClient, plcRotationKey, cfg.service.publicUrl, cfg.identity.recoveryDidKey),
                redis: redisScratch,
                dpopSecret: secrets.dpopSecret,
                inviteCodeRequired: cfg.invites.required,
                availableUserDomains: cfg.identity.serviceHandleDomains,
                hcaptcha: cfg.oauth.provider.hcaptcha,
                branding: cfg.oauth.provider.branding,
                safeFetch,
                metadata: {
                    protected_resources: [new URL(cfg.oauth.issuer).origin],
                    scopes_supported: ['transition:generic', 'transition:chat.bsky'],
                },
                // If the PDS is both an authorization server & resource server (no
                // entryway), there is no need to use JWTs as access tokens. Instead,
                // the PDS can use tokenId as access tokens. This allows the PDS to
                // always use up-to-date token data from the token store.
                accessTokenType: oauth_provider_1.AccessTokenType.id,
            })
            : undefined;
        const oauthVerifier = oauthProvider ?? // OAuthProvider extends OAuthVerifier
            new oauth_provider_1.OAuthVerifier({
                issuer: cfg.oauth.issuer,
                keyset: [await oauth_provider_1.JoseKey.fromKeyLike(jwtPublicKey, undefined, 'ES256K')],
                dpopSecret: secrets.dpopSecret,
                redis: redisScratch,
            });
        const authVerifier = new auth_verifier_1.AuthVerifier(accountManager, idResolver, oauthVerifier, {
            publicUrl: cfg.service.publicUrl,
            jwtKey: jwtPublicKey ?? jwtSecretKey,
            adminPass: secrets.adminPassword,
            dids: {
                pds: cfg.service.did,
                entryway: cfg.entryway?.did,
                modService: cfg.modService?.did,
            },
        });
        return new AppContext({
            actorStore,
            blobstore,
            localViewer,
            mailer,
            moderationMailer,
            didCache,
            idResolver,
            plcClient,
            accountManager,
            sequencer,
            backgroundQueue,
            redisScratch,
            ratelimitCreator,
            crawlers,
            bskyAppView,
            moderationAgent,
            reportingAgent,
            entrywayAgent,
            entrywayAdminAgent,
            proxyAgent,
            safeFetch,
            authVerifier,
            oauthProvider,
            plcRotationKey,
            cfg,
            ...(overrides ?? {}),
        });
    }
    async appviewAuthHeaders(did, lxm) {
        (0, node_assert_1.default)(this.bskyAppView);
        return this.serviceAuthHeaders(did, this.bskyAppView.did, lxm);
    }
    async entrywayAuthHeaders(req, did, lxm) {
        (0, node_assert_1.default)(this.cfg.entryway);
        const headers = await this.serviceAuthHeaders(did, this.cfg.entryway.did, lxm);
        return (0, proxy_1.forwardedFor)(req, headers);
    }
    entrywayPassthruHeaders(req) {
        return (0, proxy_1.forwardedFor)(req, (0, proxy_1.authPassthru)(req));
    }
    async serviceAuthHeaders(did, aud, lxm) {
        const keypair = await this.actorStore.keypair(did);
        return (0, xrpc_server_1.createServiceAuthHeaders)({
            iss: did,
            aud,
            lxm,
            keypair,
        });
    }
    async serviceAuthJwt(did, aud, lxm) {
        const keypair = await this.actorStore.keypair(did);
        return (0, xrpc_server_1.createServiceJwt)({
            iss: did,
            aud,
            lxm,
            keypair,
        });
    }
}
exports.AppContext = AppContext;
const basicAuthHeader = (username, password) => {
    const encoded = ui8.toString(ui8.fromString(`${username}:${password}`, 'utf8'), 'base64pad');
    return `Basic ${encoded}`;
};
exports.default = AppContext;
//# sourceMappingURL=context.js.map