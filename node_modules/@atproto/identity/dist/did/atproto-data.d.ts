import { getDid, getFeedGenEndpoint, getHandle, getNotifEndpoint, getPdsEndpoint } from '@atproto/common-web';
import { AtprotoData, DidDocument } from '../types';
export { getDid, getFeedGenEndpoint as getFeedGen, getHandle, getNotifEndpoint as getNotif, getPdsEndpoint as getPds, };
export declare const getKey: (doc: DidDocument) => string | undefined;
export declare const getDidKeyFromMultibase: (key: {
    type: string;
    publicKeyMultibase: string;
}) => string | undefined;
export declare const parseToAtprotoDocument: (doc: DidDocument) => Partial<AtprotoData>;
export declare const ensureAtpDocument: (doc: DidDocument) => AtprotoData;
export declare const ensureAtprotoKey: (doc: DidDocument) => string;
//# sourceMappingURL=atproto-data.d.ts.map