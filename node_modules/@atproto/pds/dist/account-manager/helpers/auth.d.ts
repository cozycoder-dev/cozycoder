import { KeyObject } from 'node:crypto';
import { AuthScope } from '../../auth-verifier';
import { AccountDb } from '../db';
import { AppPassDescript } from './password';
export type AuthToken = {
    scope: AuthScope;
    sub: string;
    exp: number;
};
export type RefreshToken = AuthToken & {
    scope: AuthScope.Refresh;
    jti: string;
};
export declare const createTokens: (opts: {
    did: string;
    jwtKey: KeyObject;
    serviceDid: string;
    scope?: AuthScope;
    jti?: string;
    expiresIn?: string | number;
}) => Promise<{
    accessJwt: string;
    refreshJwt: string;
}>;
export declare const createAccessToken: (opts: {
    did: string;
    jwtKey: KeyObject;
    serviceDid: string;
    scope?: AuthScope;
    expiresIn?: string | number;
}) => Promise<string>;
export declare const createRefreshToken: (opts: {
    did: string;
    jwtKey: KeyObject;
    serviceDid: string;
    jti?: string;
    expiresIn?: string | number;
}) => Promise<string>;
export declare const decodeRefreshToken: (jwt: string) => RefreshToken;
export declare const storeRefreshToken: (db: AccountDb, payload: RefreshToken, appPassword: AppPassDescript | null) => Promise<import("kysely").InsertResult>;
export declare const getRefreshToken: (db: AccountDb, id: string) => Promise<{
    id: string;
    did: string;
    expiresAt: string;
    nextId: string | null;
    appPassword: {
        name: string;
        privileged: boolean;
    } | null;
} | null>;
export declare const deleteExpiredRefreshTokens: (db: AccountDb, did: string, now: string) => Promise<void>;
export declare const addRefreshGracePeriod: (db: AccountDb, opts: {
    id: string;
    expiresAt: string;
    nextId: string;
}) => Promise<void>;
export declare const revokeRefreshToken: (db: AccountDb, id: string) => Promise<boolean>;
export declare const revokeRefreshTokensByDid: (db: AccountDb, did: string) => Promise<boolean>;
export declare const revokeAppPasswordRefreshToken: (db: AccountDb, did: string, appPassName: string) => Promise<boolean>;
export declare const getRefreshTokenId: () => string;
export declare const formatScope: (appPassword: AppPassDescript | null, isSoftDeleted?: boolean) => AuthScope;
export declare class ConcurrentRefreshError extends Error {
}
//# sourceMappingURL=auth.d.ts.map