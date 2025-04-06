"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.oauthLogger = exports.fetchLogger = exports.httpLogger = exports.crawlerLogger = exports.labelerLogger = exports.mailerLogger = exports.seqLogger = exports.redisLogger = exports.readStickyLogger = exports.didCacheLogger = exports.dbLogger = void 0;
const pino_1 = require("pino");
const pino_http_1 = require("pino-http");
const common_1 = require("@atproto/common");
exports.dbLogger = (0, common_1.subsystemLogger)('pds:db');
exports.didCacheLogger = (0, common_1.subsystemLogger)('pds:did-cache');
exports.readStickyLogger = (0, common_1.subsystemLogger)('pds:read-sticky');
exports.redisLogger = (0, common_1.subsystemLogger)('pds:redis');
exports.seqLogger = (0, common_1.subsystemLogger)('pds:sequencer');
exports.mailerLogger = (0, common_1.subsystemLogger)('pds:mailer');
exports.labelerLogger = (0, common_1.subsystemLogger)('pds:labeler');
exports.crawlerLogger = (0, common_1.subsystemLogger)('pds:crawler');
exports.httpLogger = (0, common_1.subsystemLogger)('pds');
exports.fetchLogger = (0, common_1.subsystemLogger)('pds:fetch');
exports.oauthLogger = (0, common_1.subsystemLogger)('pds:oauth');
exports.loggerMiddleware = (0, pino_http_1.pinoHttp)({
    logger: exports.httpLogger,
    serializers: {
        err: (err) => ({
            code: err?.['code'],
            message: err?.['message'],
        }),
        req: (req) => {
            const serialized = pino_1.stdSerializers.req(req);
            const headers = (0, common_1.obfuscateHeaders)(serialized.headers);
            return { ...serialized, headers };
        },
    },
});
//# sourceMappingURL=logger.js.map