import { DidCache } from '../types';
import { BaseResolver } from './base-resolver';
export declare class DidPlcResolver extends BaseResolver {
    plcUrl: string;
    timeout: number;
    cache?: DidCache | undefined;
    constructor(plcUrl: string, timeout: number, cache?: DidCache | undefined);
    resolveNoCheck(did: string): Promise<unknown>;
}
//# sourceMappingURL=plc-resolver.d.ts.map