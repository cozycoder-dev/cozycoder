import 'express-async-errors';
import http from 'node:http';
import express from 'express';
import { ServerConfig, ServerSecrets } from './config';
import { AppContext, AppContextOptions } from './context';
export * from './config';
export { Database } from './db';
export { DiskBlobStore } from './disk-blobstore';
export { AppContext } from './context';
export { httpLogger } from './logger';
export { createSecretKeyObject } from './auth-verifier';
export { type Handler as SkeletonHandler } from './lexicon/types/app/bsky/feed/getFeedSkeleton';
export { createServer as createLexiconServer } from './lexicon';
export * as sequencer from './sequencer';
export { type CommitDataWithOps, type PreparedWrite } from './repo';
export * as repoPrepare from './repo/prepare';
export { scripts } from './scripts';
export declare class PDS {
    ctx: AppContext;
    app: express.Application;
    server?: http.Server;
    private terminator?;
    private dbStatsInterval?;
    private sequencerStatsInterval?;
    constructor(opts: {
        ctx: AppContext;
        app: express.Application;
    });
    static create(cfg: ServerConfig, secrets: ServerSecrets, overrides?: Partial<AppContextOptions>): Promise<PDS>;
    start(): Promise<http.Server>;
    destroy(): Promise<void>;
}
export default PDS;
//# sourceMappingURL=index.d.ts.map