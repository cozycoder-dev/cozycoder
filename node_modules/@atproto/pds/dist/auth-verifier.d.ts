import { KeyObject } from 'node:crypto';
import * as jose from 'jose';
import { IdResolver } from '@atproto/identity';
import { OAuthVerifier } from '@atproto/oauth-provider';
import { AuthVerifierContext, StreamAuthVerifierContext } from '@atproto/xrpc-server';
import { AccountManager } from './account-manager/account-manager';
type ReqCtx = AuthVerifierContext | StreamAuthVerifierContext;
export declare enum AuthScope {
    Access = "com.atproto.access",
    Refresh = "com.atproto.refresh",
    AppPass = "com.atproto.appPass",
    AppPassPrivileged = "com.atproto.appPassPrivileged",
    SignupQueued = "com.atproto.signupQueued",
    Takendown = "com.atproto.takendown"
}
export type AccessOpts = {
    additional: AuthScope[];
    checkTakedown: boolean;
    checkDeactivated: boolean;
};
export declare enum RoleStatus {
    Valid = 0,
    Invalid = 1,
    Missing = 2
}
type NullOutput = {
    credentials: null;
};
type AdminTokenOutput = {
    credentials: {
        type: 'admin_token';
    };
};
type ModServiceOutput = {
    credentials: {
        type: 'mod_service';
        aud: string;
        iss: string;
    };
};
type AccessOutput = {
    credentials: {
        type: 'access';
        did: string;
        scope: AuthScope;
        audience: string | undefined;
        isPrivileged: boolean;
    };
    artifacts: string;
};
type RefreshOutput = {
    credentials: {
        type: 'refresh';
        did: string;
        scope: AuthScope;
        audience: string | undefined;
        tokenId: string;
    };
    artifacts: string;
};
type UserServiceAuthOutput = {
    credentials: {
        type: 'user_service_auth';
        aud: string;
        did: string;
    };
};
type ValidatedBearer = {
    did: string;
    scope: AuthScope;
    token: string;
    payload: jose.JWTPayload;
    audience: string | undefined;
};
type ValidatedRefreshBearer = ValidatedBearer & {
    tokenId: string;
};
export type AuthVerifierOpts = {
    publicUrl: string;
    jwtKey: KeyObject;
    adminPass: string;
    dids: {
        pds: string;
        entryway?: string;
        modService?: string;
    };
};
export declare class AuthVerifier {
    accountManager: AccountManager;
    idResolver: IdResolver;
    oauthVerifier: OAuthVerifier;
    private _publicUrl;
    private _jwtKey;
    private _adminPass;
    dids: AuthVerifierOpts['dids'];
    constructor(accountManager: AccountManager, idResolver: IdResolver, oauthVerifier: OAuthVerifier, opts: AuthVerifierOpts);
    accessStandard: (opts?: Partial<AccessOpts>) => (ctx: ReqCtx) => Promise<AccessOutput>;
    accessFull: (opts?: Partial<AccessOpts>) => (ctx: ReqCtx) => Promise<AccessOutput>;
    accessPrivileged: (opts?: Partial<AccessOpts>) => (ctx: ReqCtx) => Promise<AccessOutput>;
    refresh: (ctx: ReqCtx) => Promise<RefreshOutput>;
    refreshExpired: (ctx: ReqCtx) => Promise<RefreshOutput>;
    adminToken: (ctx: ReqCtx) => Promise<AdminTokenOutput>;
    optionalAccessOrAdminToken: (opts?: Partial<AccessOpts>) => (ctx: ReqCtx) => Promise<AccessOutput | AdminTokenOutput | NullOutput>;
    userServiceAuth: (ctx: ReqCtx) => Promise<UserServiceAuthOutput>;
    userServiceAuthOptional: (ctx: ReqCtx) => Promise<UserServiceAuthOutput | NullOutput>;
    accessOrUserServiceAuth: (opts?: Partial<AccessOpts>) => (ctx: ReqCtx) => Promise<UserServiceAuthOutput | AccessOutput>;
    modService: (ctx: ReqCtx) => Promise<ModServiceOutput>;
    moderator: (ctx: ReqCtx) => Promise<AdminTokenOutput | ModServiceOutput>;
    protected validateAdminToken({ req, }: ReqCtx): Promise<AdminTokenOutput>;
    protected validateRefreshToken(ctx: ReqCtx, verifyOptions?: Omit<jose.JWTVerifyOptions, 'audience' | 'typ'>): Promise<ValidatedRefreshBearer>;
    protected validateBearerToken(ctx: ReqCtx, scopes: AuthScope[], verifyOptions: jose.JWTVerifyOptions & Required<Pick<jose.JWTVerifyOptions, 'audience' | 'typ'>>): Promise<ValidatedBearer>;
    protected validateAccessToken(ctx: ReqCtx, scopes: AuthScope[], { checkTakedown, checkDeactivated, }?: {
        checkTakedown?: boolean;
        checkDeactivated?: boolean;
    }): Promise<AccessOutput>;
    protected validateDpopAccessToken(ctx: ReqCtx, scopes: AuthScope[]): Promise<AccessOutput>;
    protected validateBearerAccessToken(ctx: ReqCtx, scopes: AuthScope[]): Promise<AccessOutput>;
    protected verifyServiceJwt(ctx: ReqCtx, opts: {
        aud: string | null;
        iss: string[] | null;
    }): Promise<{
        iss: string;
        aud: string;
    }>;
    protected null(ctx: ReqCtx): NullOutput;
    isUserOrAdmin(auth: AccessOutput | AdminTokenOutput | NullOutput, did: string): boolean;
    protected jwtVerify(token: string, verifyOptions?: jose.JWTVerifyOptions): Promise<jose.JWTVerifyResult<jose.JWTPayload>>;
    protected setAuthHeaders(ctx: ReqCtx): void;
}
declare enum AuthType {
    BASIC = "Basic",
    BEARER = "Bearer",
    DPOP = "DPoP"
}
export declare const parseAuthorizationHeader: (authorization?: string) => [type: null] | [type: AuthType, token: string];
export declare const parseBasicAuth: (authorizationHeader?: string) => {
    username: string;
    password: string;
} | null;
export declare const createSecretKeyObject: (secret: string) => KeyObject;
export declare const createPublicKeyObject: (publicKeyHex: string) => KeyObject;
export {};
//# sourceMappingURL=auth-verifier.d.ts.map