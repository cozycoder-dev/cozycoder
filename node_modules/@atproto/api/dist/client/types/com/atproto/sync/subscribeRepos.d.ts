import { type ValidationResult } from '@atproto/lexicon';
import { CID } from 'multiformats/cid';
/** Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature. */
export interface Commit {
    $type?: 'com.atproto.sync.subscribeRepos#commit';
    /** The stream sequence number of this message. */
    seq: number;
    /** DEPRECATED -- unused */
    rebase: boolean;
    /** DEPRECATED -- replaced by #sync event and data limits. Indicates that this commit contained too many ops, or data size was too large. Consumers will need to make a separate request to get missing data. */
    tooBig: boolean;
    /** The repo this event comes from. Note that all other message types name this field 'did'. */
    repo: string;
    /** Repo commit object CID. */
    commit: CID;
    /** The rev of the emitted commit. Note that this information is also in the commit object included in blocks, unless this is a tooBig event. */
    rev: string;
    /** The rev of the last emitted commit from this repo (if any). */
    since: string | null;
    /** CAR file containing relevant blocks, as a diff since the previous repo state. The commit must be included as a block, and the commit block CID must be the first entry in the CAR header 'roots' list. */
    blocks: Uint8Array;
    ops: RepoOp[];
    blobs: CID[];
    /** The root CID of the MST tree for the previous commit from this repo (indicated by the 'since' revision field in this message). Corresponds to the 'data' field in the repo commit object. NOTE: this field is effectively required for the 'inductive' version of firehose. */
    prevData?: CID;
    /** Timestamp of when this message was originally broadcast. */
    time: string;
}
export declare function isCommit<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "commit">;
export declare function validateCommit<V>(v: V): ValidationResult<Commit & V>;
/** Updates the repo to a new state, without necessarily including that state on the firehose. Used to recover from broken commit streams, data loss incidents, or in situations where upstream host does not know recent state of the repository. */
export interface Sync {
    $type?: 'com.atproto.sync.subscribeRepos#sync';
    /** The stream sequence number of this message. */
    seq: number;
    /** The account this repo event corresponds to. Must match that in the commit object. */
    did: string;
    /** CAR file containing the commit, as a block. The CAR header must include the commit block CID as the first 'root'. */
    blocks: Uint8Array;
    /** The rev of the commit. This value must match that in the commit object. */
    rev: string;
    /** Timestamp of when this message was originally broadcast. */
    time: string;
}
export declare function isSync<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "sync">;
export declare function validateSync<V>(v: V): ValidationResult<Sync & V>;
/** Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache. */
export interface Identity {
    $type?: 'com.atproto.sync.subscribeRepos#identity';
    seq: number;
    did: string;
    time: string;
    /** The current handle for the account, or 'handle.invalid' if validation fails. This field is optional, might have been validated or passed-through from an upstream source. Semantics and behaviors for PDS vs Relay may evolve in the future; see atproto specs for more details. */
    handle?: string;
}
export declare function isIdentity<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "identity">;
export declare function validateIdentity<V>(v: V): ValidationResult<Identity & V>;
/** Represents a change to an account's status on a host (eg, PDS or Relay). The semantics of this event are that the status is at the host which emitted the event, not necessarily that at the currently active PDS. Eg, a Relay takedown would emit a takedown with active=false, even if the PDS is still active. */
export interface Account {
    $type?: 'com.atproto.sync.subscribeRepos#account';
    seq: number;
    did: string;
    time: string;
    /** Indicates that the account has a repository which can be fetched from the host that emitted this event. */
    active: boolean;
    /** If active=false, this optional field indicates a reason for why the account is not active. */
    status?: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'desynchronized' | 'throttled' | (string & {});
}
export declare function isAccount<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "account">;
export declare function validateAccount<V>(v: V): ValidationResult<Account & V>;
export interface Info {
    $type?: 'com.atproto.sync.subscribeRepos#info';
    name: 'OutdatedCursor' | (string & {});
    message?: string;
}
export declare function isInfo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "info">;
export declare function validateInfo<V>(v: V): ValidationResult<Info & V>;
/** A repo operation, ie a mutation of a single record. */
export interface RepoOp {
    $type?: 'com.atproto.sync.subscribeRepos#repoOp';
    action: 'create' | 'update' | 'delete' | (string & {});
    path: string;
    /** For creates and updates, the new record CID. For deletions, null. */
    cid: CID | null;
    /** For updates and deletes, the previous record CID (required for inductive firehose). For creations, field should not be defined. */
    prev?: CID;
}
export declare function isRepoOp<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.subscribeRepos", "repoOp">;
export declare function validateRepoOp<V>(v: V): ValidationResult<RepoOp & V>;
//# sourceMappingURL=subscribeRepos.d.ts.map