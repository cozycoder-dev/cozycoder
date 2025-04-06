import { AppContext } from '../../../../context';
export declare const getDidDoc: (ctx: AppContext, did: string) => Promise<{
    id: string;
    alsoKnownAs?: string[] | undefined;
    verificationMethod?: {
        id: string;
        type: string;
        controller: string;
        publicKeyMultibase?: string | undefined;
    }[] | undefined;
    service?: {
        id: string;
        type: string;
        serviceEndpoint: string | Record<string, unknown>;
    }[] | undefined;
}>;
//# sourceMappingURL=resolver.d.ts.map