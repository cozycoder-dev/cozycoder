import { HandleResolverOpts } from '../types';
export declare class HandleResolver {
    timeout: number;
    private backupNameservers;
    private backupNameserverIps;
    constructor(opts?: HandleResolverOpts);
    resolve(handle: string): Promise<string | undefined>;
    resolveDns(handle: string): Promise<string | undefined>;
    resolveHttp(handle: string, signal?: AbortSignal): Promise<string | undefined>;
    resolveDnsBackup(handle: string): Promise<string | undefined>;
    parseDnsResult(chunkedResults: string[][]): string | undefined;
    private getBackupNameserverIps;
}
//# sourceMappingURL=index.d.ts.map