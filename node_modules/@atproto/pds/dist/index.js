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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDS = exports.scripts = exports.repoPrepare = exports.sequencer = exports.createLexiconServer = exports.createSecretKeyObject = exports.httpLogger = exports.AppContext = exports.DiskBlobStore = exports.Database = void 0;
// catch errors that get thrown in async route handlers
// this is a relatively non-invasive change to express
// they get handled in the error.handler middleware
// leave at top of file before importing Routes
require("express-async-errors");
const node_events_1 = __importDefault(require("node:events"));
const lib_1 = require("@did-plc/lib");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_terminator_1 = require("http-terminator");
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const api_1 = __importDefault(require("./api"));
const authRoutes = __importStar(require("./auth-routes"));
const basicRoutes = __importStar(require("./basic-routes"));
const context_1 = require("./context");
const error = __importStar(require("./error"));
const lexicon_1 = require("./lexicon");
const logger_1 = require("./logger");
const pipethrough_1 = require("./pipethrough");
const compression_1 = __importDefault(require("./util/compression"));
const wellKnown = __importStar(require("./well-known"));
__exportStar(require("./config"), exports);
var db_1 = require("./db");
Object.defineProperty(exports, "Database", { enumerable: true, get: function () { return db_1.Database; } });
var disk_blobstore_1 = require("./disk-blobstore");
Object.defineProperty(exports, "DiskBlobStore", { enumerable: true, get: function () { return disk_blobstore_1.DiskBlobStore; } });
var context_2 = require("./context");
Object.defineProperty(exports, "AppContext", { enumerable: true, get: function () { return context_2.AppContext; } });
var logger_2 = require("./logger");
Object.defineProperty(exports, "httpLogger", { enumerable: true, get: function () { return logger_2.httpLogger; } });
var auth_verifier_1 = require("./auth-verifier");
Object.defineProperty(exports, "createSecretKeyObject", { enumerable: true, get: function () { return auth_verifier_1.createSecretKeyObject; } });
var lexicon_2 = require("./lexicon");
Object.defineProperty(exports, "createLexiconServer", { enumerable: true, get: function () { return lexicon_2.createServer; } });
exports.sequencer = __importStar(require("./sequencer"));
exports.repoPrepare = __importStar(require("./repo/prepare"));
var scripts_1 = require("./scripts");
Object.defineProperty(exports, "scripts", { enumerable: true, get: function () { return scripts_1.scripts; } });
class PDS {
    constructor(opts) {
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "terminator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dbStatsInterval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sequencerStatsInterval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ctx = opts.ctx;
        this.app = opts.app;
    }
    static async create(cfg, secrets, overrides) {
        const ctx = await context_1.AppContext.fromConfig(cfg, secrets, overrides);
        const xrpcOpts = {
            validateResponse: false,
            payload: {
                jsonLimit: 150 * 1024, // 150kb
                textLimit: 100 * 1024, // 100kb
                blobLimit: cfg.service.blobUploadLimit,
            },
            catchall: (0, pipethrough_1.proxyHandler)(ctx),
            errorParser: (err) => {
                if (err instanceof lib_1.PlcClientError) {
                    const payloadMessage = typeof err.data === 'object' &&
                        err.data != null &&
                        'message' in err.data &&
                        typeof err.data.message === 'string' &&
                        err.data.message;
                    const type = err.status >= 500
                        ? xrpc_server_1.ResponseType.UpstreamFailure
                        : xrpc_server_1.ResponseType.InvalidRequest;
                    return new xrpc_server_1.XRPCError(type, payloadMessage || 'Unable to perform PLC operation');
                }
                return xrpc_server_1.XRPCError.fromError(err);
            },
            rateLimits: ctx.ratelimitCreator
                ? {
                    creator: ctx.ratelimitCreator,
                    global: [
                        {
                            name: 'global-ip',
                            durationMs: 5 * common_1.MINUTE,
                            points: 3000,
                        },
                    ],
                    shared: [
                        {
                            name: 'repo-write-hour',
                            durationMs: common_1.HOUR,
                            points: 5000, // creates=3, puts=2, deletes=1
                        },
                        {
                            name: 'repo-write-day',
                            durationMs: common_1.DAY,
                            points: 35000, // creates=3, puts=2, deletes=1
                        },
                    ],
                }
                : undefined,
        };
        let server = (0, lexicon_1.createServer)(xrpcOpts);
        server = (0, api_1.default)(server, ctx);
        const app = (0, express_1.default)();
        app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
        app.use(logger_1.loggerMiddleware);
        app.use((0, compression_1.default)());
        app.use(authRoutes.createRouter(ctx)); // Before CORS
        app.use((0, cors_1.default)({ maxAge: common_1.DAY / common_1.SECOND }));
        app.use(basicRoutes.createRouter(ctx));
        app.use(wellKnown.createRouter(ctx));
        app.use(server.xrpc.router);
        app.use(error.handler);
        return new PDS({
            ctx,
            app,
        });
    }
    async start() {
        await this.ctx.sequencer.start();
        const server = this.app.listen(this.ctx.cfg.service.port);
        this.server = server;
        this.server.keepAliveTimeout = 90000;
        this.terminator = (0, http_terminator_1.createHttpTerminator)({ server });
        await node_events_1.default.once(server, 'listening');
        return server;
    }
    async destroy() {
        await this.ctx.sequencer.destroy();
        await this.terminator?.terminate();
        await this.ctx.backgroundQueue.destroy();
        await this.ctx.accountManager.close();
        await this.ctx.redisScratch?.quit();
        await this.ctx.proxyAgent.destroy();
        clearInterval(this.dbStatsInterval);
        clearInterval(this.sequencerStatsInterval);
    }
}
exports.PDS = PDS;
exports.default = PDS;
//# sourceMappingURL=index.js.map