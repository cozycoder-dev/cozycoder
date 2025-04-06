import { z } from 'zod';
import { AccountStatus } from '../account-manager/account-manager';
import { CommitDataWithOps, SyncEvtData } from '../repo';
import { RepoSeqInsert } from './db';
export declare const formatSeqCommit: (did: string, commitData: CommitDataWithOps) => Promise<RepoSeqInsert>;
export declare const formatSeqSyncEvt: (did: string, data: SyncEvtData) => Promise<RepoSeqInsert>;
export declare const syncEvtDataFromCommit: (commitData: CommitDataWithOps) => SyncEvtData;
export declare const formatSeqIdentityEvt: (did: string, handle?: string) => Promise<RepoSeqInsert>;
export declare const formatSeqAccountEvt: (did: string, status: AccountStatus) => Promise<RepoSeqInsert>;
export declare const commitEvtOp: z.ZodObject<{
    action: z.ZodUnion<[z.ZodLiteral<"create">, z.ZodLiteral<"update">, z.ZodLiteral<"delete">]>;
    path: z.ZodString;
    cid: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>>;
    prev: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    cid: import("multiformats/cid").CID | null;
    action: "create" | "delete" | "update";
    prev?: import("multiformats/cid").CID | undefined;
}, {
    path: string;
    action: "create" | "delete" | "update";
    cid?: any;
    prev?: any;
}>;
export type CommitEvtOp = z.infer<typeof commitEvtOp>;
export declare const commitEvt: z.ZodObject<{
    rebase: z.ZodBoolean;
    tooBig: z.ZodBoolean;
    repo: z.ZodString;
    commit: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>;
    rev: z.ZodString;
    since: z.ZodNullable<z.ZodString>;
    blocks: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    ops: z.ZodArray<z.ZodObject<{
        action: z.ZodUnion<[z.ZodLiteral<"create">, z.ZodLiteral<"update">, z.ZodLiteral<"delete">]>;
        path: z.ZodString;
        cid: z.ZodNullable<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>>;
        prev: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        cid: import("multiformats/cid").CID | null;
        action: "create" | "delete" | "update";
        prev?: import("multiformats/cid").CID | undefined;
    }, {
        path: string;
        action: "create" | "delete" | "update";
        cid?: any;
        prev?: any;
    }>, "many">;
    blobs: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>, "many">;
    prevData: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, import("multiformats/cid").CID, any>>;
}, "strip", z.ZodTypeAny, {
    repo: string;
    commit: import("multiformats/cid").CID;
    rev: string;
    blobs: import("multiformats/cid").CID[];
    since: string | null;
    rebase: boolean;
    tooBig: boolean;
    blocks: Uint8Array;
    ops: {
        path: string;
        cid: import("multiformats/cid").CID | null;
        action: "create" | "delete" | "update";
        prev?: import("multiformats/cid").CID | undefined;
    }[];
    prevData?: import("multiformats/cid").CID | undefined;
}, {
    repo: string;
    rev: string;
    blobs: any[];
    since: string | null;
    rebase: boolean;
    tooBig: boolean;
    blocks: Uint8Array;
    ops: {
        path: string;
        action: "create" | "delete" | "update";
        cid?: any;
        prev?: any;
    }[];
    commit?: any;
    prevData?: any;
}>;
export type CommitEvt = z.infer<typeof commitEvt>;
export declare const syncEvt: z.ZodObject<{
    did: z.ZodString;
    blocks: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
    rev: z.ZodString;
}, "strip", z.ZodTypeAny, {
    did: string;
    rev: string;
    blocks: Uint8Array;
}, {
    did: string;
    rev: string;
    blocks: Uint8Array;
}>;
export type SyncEvt = z.infer<typeof syncEvt>;
export declare const identityEvt: z.ZodObject<{
    did: z.ZodString;
    handle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    did: string;
    handle?: string | undefined;
}, {
    did: string;
    handle?: string | undefined;
}>;
export type IdentityEvt = z.infer<typeof identityEvt>;
export declare const accountEvt: z.ZodObject<{
    did: z.ZodString;
    active: z.ZodBoolean;
    status: z.ZodOptional<z.ZodEnum<[AccountStatus.Takendown, AccountStatus.Suspended, AccountStatus.Deleted, AccountStatus.Deactivated]>>;
}, "strip", z.ZodTypeAny, {
    did: string;
    active: boolean;
    status?: AccountStatus.Takendown | AccountStatus.Suspended | AccountStatus.Deleted | AccountStatus.Deactivated | undefined;
}, {
    did: string;
    active: boolean;
    status?: AccountStatus.Takendown | AccountStatus.Suspended | AccountStatus.Deleted | AccountStatus.Deactivated | undefined;
}>;
export type AccountEvt = z.infer<typeof accountEvt>;
type TypedCommitEvt = {
    type: 'commit';
    seq: number;
    time: string;
    evt: CommitEvt;
};
type TypedSyncEvt = {
    type: 'sync';
    seq: number;
    time: string;
    evt: SyncEvt;
};
type TypedIdentityEvt = {
    type: 'identity';
    seq: number;
    time: string;
    evt: IdentityEvt;
};
type TypedAccountEvt = {
    type: 'account';
    seq: number;
    time: string;
    evt: AccountEvt;
};
export type SeqEvt = TypedCommitEvt | TypedSyncEvt | TypedIdentityEvt | TypedAccountEvt;
export {};
//# sourceMappingURL=events.d.ts.map