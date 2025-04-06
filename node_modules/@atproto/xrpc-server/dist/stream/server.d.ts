import { IncomingMessage } from 'node:http';
import { ServerOptions, WebSocket, WebSocketServer } from 'ws';
import { Frame } from './frames';
export declare class XrpcStreamServer {
    wss: WebSocketServer;
    constructor(opts: ServerOptions & {
        handler: Handler;
    });
}
export type Handler = (req: IncomingMessage, signal: AbortSignal, socket: WebSocket, server: XrpcStreamServer) => AsyncIterable<Frame>;
//# sourceMappingURL=server.d.ts.map