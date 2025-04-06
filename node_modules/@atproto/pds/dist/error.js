"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const oauth_provider_1 = require("@atproto/oauth-provider");
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("./logger");
const handler = (err, _req, res, next) => {
    logger_1.httpLogger.error(err, 'unexpected internal server error');
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof oauth_provider_1.OAuthError) {
        res.status(err.status).json(err.toJSON());
        return;
    }
    const serverError = xrpc_server_1.XRPCError.fromError(err);
    res.status(serverError.type).json(serverError.payload);
};
exports.handler = handler;
//# sourceMappingURL=error.js.map