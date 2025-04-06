"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROTECTED_METHODS = exports.PRIVILEGED_METHODS = exports.parseProxyHeader = exports.proxyHandler = void 0;
exports.pipethrough = pipethrough;
exports.parseProxyInfo = parseProxyInfo;
exports.isJsonContentType = isJsonContentType;
exports.asPipeThroughBuffer = asPipeThroughBuffer;
const node_stream_1 = require("node:stream");
const common_1 = require("@atproto/common");
const xrpc_1 = require("@atproto/xrpc");
const xrpc_server_1 = require("@atproto/xrpc-server");
const xrpc_utils_1 = require("@atproto-labs/xrpc-utils");
const lexicons_1 = require("./lexicon/lexicons");
const logger_1 = require("./logger");
const proxyHandler = (ctx) => {
    const accessStandard = ctx.authVerifier.accessStandard();
    return async (req, res, next) => {
        // /!\ Hot path
        try {
            if (req.method !== 'GET' &&
                req.method !== 'HEAD' &&
                req.method !== 'POST') {
                throw new xrpc_server_1.XRPCError(xrpc_1.ResponseType.InvalidRequest, 'XRPC requests only supports GET and POST');
            }
            const body = req.method === 'POST' ? req : undefined;
            if (body != null && !body.readable) {
                // Body was already consumed by a previous middleware
                throw new xrpc_server_1.InternalServerError('Request body is not readable');
            }
            const lxm = (0, xrpc_server_1.parseReqNsid)(req);
            if (exports.PROTECTED_METHODS.has(lxm)) {
                throw new xrpc_server_1.InvalidRequestError('Bad token method', 'InvalidToken');
            }
            const auth = await accessStandard({ req, res });
            if (!auth.credentials.isPrivileged && exports.PRIVILEGED_METHODS.has(lxm)) {
                throw new xrpc_server_1.InvalidRequestError('Bad token method', 'InvalidToken');
            }
            const { url: origin, did: aud } = await parseProxyInfo(ctx, req, lxm);
            const headers = {
                'accept-encoding': req.headers['accept-encoding'] || 'identity',
                'accept-language': req.headers['accept-language'],
                'atproto-accept-labelers': req.headers['atproto-accept-labelers'],
                'x-bsky-topics': req.headers['x-bsky-topics'],
                'content-type': body && req.headers['content-type'],
                'content-encoding': body && req.headers['content-encoding'],
                'content-length': body && req.headers['content-length'],
                authorization: auth.credentials.did
                    ? `Bearer ${await ctx.serviceAuthJwt(auth.credentials.did, aud, lxm)}`
                    : undefined,
            };
            const dispatchOptions = {
                origin,
                method: req.method,
                path: req.originalUrl,
                body,
                headers,
            };
            await pipethroughStream(ctx, dispatchOptions, (upstream) => {
                res.status(upstream.statusCode);
                for (const [name, val] of responseHeaders(upstream.headers)) {
                    res.setHeader(name, val);
                }
                // Note that we should not need to manually handle errors here (e.g. by
                // destroying the response), as the http server will handle them for us.
                res.on('error', logResponseError);
                // Tell undici to write the upstream response directly to the response
                return res;
            });
        }
        catch (err) {
            next(err);
        }
    };
};
exports.proxyHandler = proxyHandler;
async function pipethrough(ctx, req, options) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        // pipethrough() is used from within xrpcServer handlers, which means that
        // the request body either has been parsed or is a readable stream that has
        // been piped for decoding & size limiting. Because of this, forwarding the
        // request body requires re-encoding it. Since we currently do not use
        // pipethrough() with procedures, proxying of request body is not
        // implemented.
        throw new xrpc_server_1.InternalServerError(`Proxying of ${req.method} requests is not supported`);
    }
    const lxm = (0, xrpc_server_1.parseReqNsid)(req);
    const { url: origin, did: aud } = await parseProxyInfo(ctx, req, lxm);
    const dispatchOptions = {
        origin,
        method: req.method,
        path: req.originalUrl,
        headers: {
            'accept-language': req.headers['accept-language'],
            'atproto-accept-labelers': req.headers['atproto-accept-labelers'],
            'x-bsky-topics': req.headers['x-bsky-topics'],
            // Because we sometimes need to interpret the response (e.g. during
            // read-after-write, through asPipeThroughBuffer()), we need to ask the
            // upstream server for an encoding that both the requester and the PDS can
            // understand. Since we might have to do the decoding ourselves, we will
            // use our own preferences (and weight) to negotiate the encoding.
            'accept-encoding': (0, xrpc_utils_1.buildProxiedContentEncoding)(req.headers['accept-encoding'], ctx.cfg.proxy.preferCompressed),
            authorization: options?.iss
                ? `Bearer ${await ctx.serviceAuthJwt(options.iss, options.aud ?? aud, options.lxm ?? lxm)}`
                : undefined,
        },
        // Use a high water mark to buffer more data while performing async
        // operations before this stream is consumed. This is especially useful
        // while processing read-after-write operations.
        highWaterMark: 2 * 65536, // twice the default (64KiB)
    };
    const { headers, body } = await pipethroughRequest(ctx, dispatchOptions);
    return {
        encoding: safeString(headers['content-type']) ?? 'application/json',
        headers: Object.fromEntries(responseHeaders(headers)),
        stream: body,
    };
}
// Request setup/formatting
// -------------------
async function parseProxyInfo(ctx, req, lxm) {
    // /!\ Hot path
    const proxyToHeader = req.header('atproto-proxy');
    if (proxyToHeader)
        return (0, exports.parseProxyHeader)(ctx, proxyToHeader);
    const defaultProxy = defaultService(ctx, lxm);
    if (defaultProxy)
        return defaultProxy;
    throw new xrpc_server_1.InvalidRequestError(`No service configured for ${lxm}`);
}
const parseProxyHeader = async (
// Using subset of AppContext for testing purposes
ctx, proxyTo) => {
    // /!\ Hot path
    const hashIndex = proxyTo.indexOf('#');
    if (hashIndex === 0) {
        throw new xrpc_server_1.InvalidRequestError('no did specified in proxy header');
    }
    if (hashIndex === -1 || hashIndex === proxyTo.length - 1) {
        throw new xrpc_server_1.InvalidRequestError('no service id specified in proxy header');
    }
    // More than one hash
    if (proxyTo.indexOf('#', hashIndex + 1) !== -1) {
        throw new xrpc_server_1.InvalidRequestError('invalid proxy header format');
    }
    // Basic validation
    if (proxyTo.includes(' ')) {
        throw new xrpc_server_1.InvalidRequestError('proxy header cannot contain spaces');
    }
    const did = proxyTo.slice(0, hashIndex);
    const didDoc = await ctx.idResolver.did.resolve(did);
    if (!didDoc) {
        throw new xrpc_server_1.InvalidRequestError('could not resolve proxy did');
    }
    const serviceId = proxyTo.slice(hashIndex);
    const url = (0, common_1.getServiceEndpoint)(didDoc, { id: serviceId });
    if (!url) {
        throw new xrpc_server_1.InvalidRequestError('could not resolve proxy did service url');
    }
    // Special case a configured appview, while still proxying correctly any other appview
    if (ctx.cfg.bskyAppView &&
        proxyTo === `${ctx.cfg.bskyAppView.did}#bsky_appview`) {
        return { did, url: ctx.cfg.bskyAppView.url };
    }
    return { did, url };
};
exports.parseProxyHeader = parseProxyHeader;
/**
 * Utility function that wraps the undici stream() function and handles request
 * and response errors by wrapping them in XRPCError instances. This function is
 * more efficient than "pipethroughRequest" when a writable stream to pipe the
 * upstream response to is available.
 */
async function pipethroughStream(ctx, dispatchOptions, successStreamFactory) {
    return new Promise((resolve, reject) => {
        void ctx.proxyAgent
            .stream(dispatchOptions, (upstream) => {
            if (upstream.statusCode >= 400) {
                const passThrough = new node_stream_1.PassThrough();
                void tryParsingError(upstream.headers, passThrough).then((parsed) => {
                    const xrpcError = new xrpc_1.XRPCError(upstream.statusCode === 500
                        ? xrpc_1.ResponseType.UpstreamFailure
                        : upstream.statusCode, parsed.error, parsed.message, Object.fromEntries(responseHeaders(upstream.headers, false)), { cause: dispatchOptions });
                    reject(xrpcError);
                }, reject);
                return passThrough;
            }
            const writable = successStreamFactory(upstream);
            // As soon as the control was passed to the writable stream (i.e. by
            // returning the writable hereafter), pipethroughStream() is considered
            // to have succeeded. Any error occurring while writing upstream data to
            // the writable stream should be handled through the stream's error
            // state (i.e. successStreamFactory() must ensure that error events on
            // the returned writable will be handled).
            resolve();
            return writable;
        })
            // The following catch block will be triggered with either network errors
            // or writable stream errors. In the latter case, the promise will already
            // be resolved, and reject()ing it there after will have no effect. Those
            // error would still be logged by the successStreamFactory() function.
            .catch(handleUpstreamRequestError)
            .catch(reject);
    });
}
/**
 * Utility function that wraps the undici request() function and handles request
 * and response errors by wrapping them in XRPCError instances.
 */
async function pipethroughRequest(ctx, dispatchOptions) {
    // HandlerPipeThroughStream requires a readable stream to be returned, so we
    // use the (less efficient) request() function instead.
    const upstream = await ctx.proxyAgent
        .request(dispatchOptions)
        .catch(handleUpstreamRequestError);
    if (upstream.statusCode >= 400) {
        const parsed = await tryParsingError(upstream.headers, upstream.body);
        // Note "XRPCClientError" is used instead of "XRPCServerError" in order to
        // allow users of this function to capture & handle these errors (namely in
        // "app.bsky.feed.getPostThread").
        throw new xrpc_1.XRPCError(upstream.statusCode === 500
            ? xrpc_1.ResponseType.UpstreamFailure
            : upstream.statusCode, parsed.error, parsed.message, Object.fromEntries(responseHeaders(upstream.headers, false)), { cause: dispatchOptions });
    }
    return upstream;
}
function handleUpstreamRequestError(err, message = 'Upstream service unreachable') {
    logger_1.httpLogger.error({ err }, message);
    throw new xrpc_server_1.XRPCError(xrpc_1.ResponseType.UpstreamFailure, message, undefined, {
        cause: err,
    });
}
// Request parsing/forwarding
// -------------------
function isJsonContentType(contentType) {
    if (!contentType)
        return undefined;
    return /application\/(?:\w+\+)?json/i.test(contentType);
}
async function tryParsingError(headers, readable) {
    if (isJsonContentType(headers['content-type']) === false) {
        // We don't known how to parse non JSON content types so we can discard the
        // whole response.
        //
        // @NOTE we could also simply "drain" the stream here. This would prevent
        // the upstream HTTP/1.1 connection from getting destroyed (closed). This
        // would however imply to read the whole upstream response, which would be
        // costly in terms of bandwidth and I/O processing. It is recommended to use
        // HTTP/2 to avoid this issue (be able to destroy a single response stream
        // without resetting the whole connection). This is not expected to happen
        // too much as 4xx and 5xx responses are expected to be JSON.
        readable.destroy();
        return {};
    }
    try {
        const buffer = await bufferUpstreamResponse(readable, headers['content-encoding']);
        const errInfo = JSON.parse(buffer.toString('utf8'));
        return {
            error: safeString(errInfo?.['error']),
            message: safeString(errInfo?.['message']),
        };
    }
    catch (err) {
        // Failed to read, decode, buffer or parse. No big deal.
        return {};
    }
}
async function bufferUpstreamResponse(readable, contentEncoding) {
    try {
        return await (0, common_1.streamToNodeBuffer)((0, common_1.decodeStream)(readable, contentEncoding));
    }
    catch (err) {
        if (!readable.destroyed)
            readable.destroy();
        throw new xrpc_server_1.XRPCError(xrpc_1.ResponseType.UpstreamFailure, err instanceof TypeError ? err.message : 'unable to decode request body', undefined, { cause: err });
    }
}
async function asPipeThroughBuffer(input) {
    return {
        buffer: await bufferUpstreamResponse(input.stream, input.headers?.['content-encoding']),
        headers: (0, common_1.omit)(input.headers, ['content-encoding', 'content-length']),
        encoding: input.encoding,
    };
}
// Response parsing/forwarding
// -------------------
const RES_HEADERS_TO_FORWARD = [
    'atproto-repo-rev',
    'atproto-content-labelers',
    'retry-after',
];
function* responseHeaders(headers, includeContentHeaders = true) {
    if (includeContentHeaders) {
        const length = headers['content-length'];
        if (length)
            yield ['content-length', length];
        const encoding = headers['content-encoding'];
        if (encoding)
            yield ['content-encoding', encoding];
        const type = headers['content-type'];
        if (type)
            yield ['content-type', type];
        const language = headers['content-language'];
        if (language)
            yield ['content-language', language];
    }
    for (let i = 0; i < RES_HEADERS_TO_FORWARD.length; i++) {
        const name = RES_HEADERS_TO_FORWARD[i];
        const val = headers[name];
        if (val != null) {
            const value = Array.isArray(val) ? val.join(',') : val;
            yield [name, value];
        }
    }
}
// Utils
// -------------------
exports.PRIVILEGED_METHODS = new Set([
    lexicons_1.ids.ChatBskyActorDeleteAccount,
    lexicons_1.ids.ChatBskyActorExportAccountData,
    lexicons_1.ids.ChatBskyConvoDeleteMessageForSelf,
    lexicons_1.ids.ChatBskyConvoGetConvo,
    lexicons_1.ids.ChatBskyConvoGetConvoForMembers,
    lexicons_1.ids.ChatBskyConvoGetLog,
    lexicons_1.ids.ChatBskyConvoGetMessages,
    lexicons_1.ids.ChatBskyConvoLeaveConvo,
    lexicons_1.ids.ChatBskyConvoListConvos,
    lexicons_1.ids.ChatBskyConvoMuteConvo,
    lexicons_1.ids.ChatBskyConvoSendMessage,
    lexicons_1.ids.ChatBskyConvoSendMessageBatch,
    lexicons_1.ids.ChatBskyConvoUnmuteConvo,
    lexicons_1.ids.ChatBskyConvoUpdateRead,
    lexicons_1.ids.ComAtprotoServerCreateAccount,
]);
// These endpoints are related to account management and must be used directly,
// not proxied or service-authed. Service auth may be utilized between PDS and
// entryway for these methods.
exports.PROTECTED_METHODS = new Set([
    lexicons_1.ids.ComAtprotoAdminSendEmail,
    lexicons_1.ids.ComAtprotoIdentityRequestPlcOperationSignature,
    lexicons_1.ids.ComAtprotoIdentitySignPlcOperation,
    lexicons_1.ids.ComAtprotoIdentityUpdateHandle,
    lexicons_1.ids.ComAtprotoServerActivateAccount,
    lexicons_1.ids.ComAtprotoServerConfirmEmail,
    lexicons_1.ids.ComAtprotoServerCreateAppPassword,
    lexicons_1.ids.ComAtprotoServerDeactivateAccount,
    lexicons_1.ids.ComAtprotoServerGetAccountInviteCodes,
    lexicons_1.ids.ComAtprotoServerListAppPasswords,
    lexicons_1.ids.ComAtprotoServerRequestAccountDelete,
    lexicons_1.ids.ComAtprotoServerRequestEmailConfirmation,
    lexicons_1.ids.ComAtprotoServerRequestEmailUpdate,
    lexicons_1.ids.ComAtprotoServerRevokeAppPassword,
    lexicons_1.ids.ComAtprotoServerUpdateEmail,
]);
const defaultService = (ctx, nsid) => {
    switch (nsid) {
        case lexicons_1.ids.ToolsOzoneTeamAddMember:
        case lexicons_1.ids.ToolsOzoneTeamDeleteMember:
        case lexicons_1.ids.ToolsOzoneTeamUpdateMember:
        case lexicons_1.ids.ToolsOzoneTeamListMembers:
        case lexicons_1.ids.ToolsOzoneCommunicationCreateTemplate:
        case lexicons_1.ids.ToolsOzoneCommunicationDeleteTemplate:
        case lexicons_1.ids.ToolsOzoneCommunicationUpdateTemplate:
        case lexicons_1.ids.ToolsOzoneCommunicationListTemplates:
        case lexicons_1.ids.ToolsOzoneModerationEmitEvent:
        case lexicons_1.ids.ToolsOzoneModerationGetEvent:
        case lexicons_1.ids.ToolsOzoneModerationGetRecord:
        case lexicons_1.ids.ToolsOzoneModerationGetRepo:
        case lexicons_1.ids.ToolsOzoneModerationQueryEvents:
        case lexicons_1.ids.ToolsOzoneModerationQueryStatuses:
        case lexicons_1.ids.ToolsOzoneModerationSearchRepos:
            return ctx.cfg.modService;
        case lexicons_1.ids.ComAtprotoModerationCreateReport:
            return ctx.cfg.reportService;
        default:
            return ctx.cfg.bskyAppView;
    }
};
const safeString = (str) => {
    return typeof str === 'string' ? str : undefined;
};
function logResponseError(err) {
    logger_1.httpLogger.warn({ err }, 'error forwarding upstream response');
}
//# sourceMappingURL=pipethrough.js.map