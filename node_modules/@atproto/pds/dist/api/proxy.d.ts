import { IncomingMessage } from 'node:http';
import express from 'express';
import { Headers } from '@atproto/xrpc';
export declare const resultPassthru: <T>(result: {
    headers: Headers;
    data: T;
}) => {
    encoding: "application/json";
    body: T;
};
export declare function authPassthru(req: IncomingMessage): {
    headers: {
        authorization: string;
    };
} | undefined;
export declare const forwardedFor: (req: express.Request, params: HeadersParam | undefined) => HeadersParam;
type HeadersParam = {
    headers: Record<string, string>;
};
export {};
//# sourceMappingURL=proxy.d.ts.map