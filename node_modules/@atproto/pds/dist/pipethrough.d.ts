import { Readable } from 'node:stream';
import express from 'express';
import { CatchallHandler, HandlerPipeThroughBuffer, HandlerPipeThroughStream } from '@atproto/xrpc-server';
import { AppContext } from './context';
export declare const proxyHandler: (ctx: AppContext) => CatchallHandler;
export type PipethroughOptions = {
    /**
     * Specify the issuer (requester) for service auth. If not provided, no
     * authorization headers will be added to the request.
     */
    iss?: string;
    /**
     * Override the audience for service auth. If not provided, the audience will
     * be determined based on the proxy service.
     */
    aud?: string;
    /**
     * Override the lexicon method for service auth. If not provided, the lexicon
     * method will be determined based on the request path.
     */
    lxm?: string;
};
export declare function pipethrough(ctx: AppContext, req: express.Request, options?: PipethroughOptions): Promise<HandlerPipeThroughStream & {
    stream: Readable;
    headers: Record<string, string>;
    encoding: string;
}>;
export declare function parseProxyInfo(ctx: AppContext, req: express.Request, lxm: string): Promise<{
    url: string;
    did: string;
}>;
export declare const parseProxyHeader: (ctx: Pick<AppContext, "cfg" | "idResolver">, proxyTo: string) => Promise<{
    did: string;
    url: string;
}>;
export declare function isJsonContentType(contentType?: string): boolean | undefined;
export declare function asPipeThroughBuffer(input: HandlerPipeThroughStream): Promise<HandlerPipeThroughBuffer>;
export declare const PRIVILEGED_METHODS: Set<string>;
export declare const PROTECTED_METHODS: Set<string>;
//# sourceMappingURL=pipethrough.d.ts.map