import * as plc from '@did-plc/lib';
import express from 'express';
import { Redis } from 'ioredis';
import * as undici from 'undici';
import { AtpAgent } from '@atproto/api';
import * as crypto from '@atproto/crypto';
import { IdResolver } from '@atproto/identity';
import { OAuthProvider } from '@atproto/oauth-provider';
import { BlobStore } from '@atproto/repo';
import { RateLimiterCreator } from '@atproto/xrpc-server';
import { Fetch } from '@atproto-labs/fetch-node';
import { AccountManager } from './account-manager/account-manager';
import { ActorStore } from './actor-store/actor-store';
import { AuthVerifier } from './auth-verifier';
import { BackgroundQueue } from './background';
import { BskyAppView } from './bsky-app-view';
import { ServerConfig, ServerSecrets } from './config';
import { Crawlers } from './crawlers';
import { DidSqliteCache } from './did-cache';
import { ServerMailer } from './mailer';
import { ModerationMailer } from './mailer/moderation';
import { LocalViewerCreator } from './read-after-write/viewer';
import { Sequencer } from './sequencer';
export type AppContextOptions = {
    actorStore: ActorStore;
    blobstore: (did: string) => BlobStore;
    localViewer: LocalViewerCreator;
    mailer: ServerMailer;
    moderationMailer: ModerationMailer;
    didCache: DidSqliteCache;
    idResolver: IdResolver;
    plcClient: plc.Client;
    accountManager: AccountManager;
    sequencer: Sequencer;
    backgroundQueue: BackgroundQueue;
    redisScratch?: Redis;
    ratelimitCreator?: RateLimiterCreator;
    crawlers: Crawlers;
    bskyAppView?: BskyAppView;
    moderationAgent?: AtpAgent;
    reportingAgent?: AtpAgent;
    entrywayAgent?: AtpAgent;
    entrywayAdminAgent?: AtpAgent;
    proxyAgent: undici.Dispatcher;
    safeFetch: Fetch;
    oauthProvider?: OAuthProvider;
    authVerifier: AuthVerifier;
    plcRotationKey: crypto.Keypair;
    cfg: ServerConfig;
};
export declare class AppContext {
    actorStore: ActorStore;
    blobstore: (did: string) => BlobStore;
    localViewer: LocalViewerCreator;
    mailer: ServerMailer;
    moderationMailer: ModerationMailer;
    didCache: DidSqliteCache;
    idResolver: IdResolver;
    plcClient: plc.Client;
    accountManager: AccountManager;
    sequencer: Sequencer;
    backgroundQueue: BackgroundQueue;
    redisScratch?: Redis;
    ratelimitCreator?: RateLimiterCreator;
    crawlers: Crawlers;
    bskyAppView?: BskyAppView;
    moderationAgent: AtpAgent | undefined;
    reportingAgent: AtpAgent | undefined;
    entrywayAgent: AtpAgent | undefined;
    entrywayAdminAgent: AtpAgent | undefined;
    proxyAgent: undici.Dispatcher;
    safeFetch: Fetch;
    authVerifier: AuthVerifier;
    oauthProvider?: OAuthProvider;
    plcRotationKey: crypto.Keypair;
    cfg: ServerConfig;
    constructor(opts: AppContextOptions);
    static fromConfig(cfg: ServerConfig, secrets: ServerSecrets, overrides?: Partial<AppContextOptions>): Promise<AppContext>;
    appviewAuthHeaders(did: string, lxm: string): Promise<{
        headers: {
            authorization: string;
        };
    }>;
    entrywayAuthHeaders(req: express.Request, did: string, lxm: string): Promise<{
        headers: Record<string, string>;
    }>;
    entrywayPassthruHeaders(req: express.Request): {
        headers: Record<string, string>;
    };
    serviceAuthHeaders(did: string, aud: string, lxm: string): Promise<{
        headers: {
            authorization: string;
        };
    }>;
    serviceAuthJwt(did: string, aud: string, lxm: string): Promise<string>;
}
export default AppContext;
//# sourceMappingURL=context.d.ts.map