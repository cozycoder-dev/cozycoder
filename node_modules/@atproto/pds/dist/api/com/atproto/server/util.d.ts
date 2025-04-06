import { DidDocument } from '@atproto/identity';
import { ServerConfig } from '../../../../config';
import { AppContext } from '../../../../context';
export declare const genInvCode: (cfg: ServerConfig) => string;
export declare const genInvCodes: (cfg: ServerConfig, count: number) => string[];
export declare const getRandomToken: () => string;
export declare const safeResolveDidDoc: (ctx: AppContext, did: string, forceRefresh?: boolean) => Promise<DidDocument | undefined>;
export declare const didDocForSession: (ctx: AppContext, did: string, forceRefresh?: boolean) => Promise<DidDocument | undefined>;
export declare const isValidDidDocForService: (ctx: AppContext, did: string) => Promise<boolean>;
export declare const assertValidDidDocumentForService: (ctx: AppContext, did: string) => Promise<void>;
//# sourceMappingURL=util.d.ts.map