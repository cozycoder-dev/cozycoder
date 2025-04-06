import { DidCache } from '../types';
import { BaseResolver } from './base-resolver';
export declare const DOC_PATH = "/.well-known/did.json";
export declare class DidWebResolver extends BaseResolver {
    timeout: number;
    cache?: DidCache | undefined;
    constructor(timeout: number, cache?: DidCache | undefined);
    resolveNoCheck(did: string): Promise<unknown>;
}
//# sourceMappingURL=web-resolver.d.ts.map