import express from 'express';
import { HeadersMap } from '@atproto/xrpc';
import { HandlerPipeThrough } from '@atproto/xrpc-server';
import { AppContext } from '../context';
import { HandlerResponse, LocalRecords, MungeFn } from './types';
export declare const getRepoRev: (headers: HeadersMap) => string | undefined;
export declare const getLocalLag: (local: LocalRecords) => number | undefined;
export declare const pipethroughReadAfterWrite: <T>(ctx: AppContext, reqCtx: {
    req: express.Request;
    auth: {
        credentials: {
            did: string;
        };
    };
}, munge: MungeFn<T>) => Promise<HandlerResponse<T> | HandlerPipeThrough>;
export declare const formatMungedResponse: <T>(body: T, lag?: number) => HandlerResponse<T>;
//# sourceMappingURL=util.d.ts.map