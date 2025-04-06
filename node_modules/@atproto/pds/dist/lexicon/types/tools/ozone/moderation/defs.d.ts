/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs.js';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
import type * as ChatBskyConvoDefs from '../../../chat/bsky/convo/defs.js';
import type * as ComAtprotoModerationDefs from '../../../com/atproto/moderation/defs.js';
import type * as ComAtprotoServerDefs from '../../../com/atproto/server/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface ModEventView {
    $type?: 'tools.ozone.moderation.defs#modEventView';
    id: number;
    event: $Typed<ModEventTakedown> | $Typed<ModEventReverseTakedown> | $Typed<ModEventComment> | $Typed<ModEventReport> | $Typed<ModEventLabel> | $Typed<ModEventAcknowledge> | $Typed<ModEventEscalate> | $Typed<ModEventMute> | $Typed<ModEventUnmute> | $Typed<ModEventMuteReporter> | $Typed<ModEventUnmuteReporter> | $Typed<ModEventEmail> | $Typed<ModEventResolveAppeal> | $Typed<ModEventDivert> | $Typed<ModEventTag> | $Typed<AccountEvent> | $Typed<IdentityEvent> | $Typed<RecordEvent> | $Typed<ModEventPriorityScore> | {
        $type: string;
    };
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | $Typed<ChatBskyConvoDefs.MessageRef> | {
        $type: string;
    };
    subjectBlobCids: string[];
    createdBy: string;
    createdAt: string;
    creatorHandle?: string;
    subjectHandle?: string;
}
export declare function isModEventView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventView">;
export declare function validateModEventView<V>(v: V): ValidationResult<ModEventView & V>;
export interface ModEventViewDetail {
    $type?: 'tools.ozone.moderation.defs#modEventViewDetail';
    id: number;
    event: $Typed<ModEventTakedown> | $Typed<ModEventReverseTakedown> | $Typed<ModEventComment> | $Typed<ModEventReport> | $Typed<ModEventLabel> | $Typed<ModEventAcknowledge> | $Typed<ModEventEscalate> | $Typed<ModEventMute> | $Typed<ModEventUnmute> | $Typed<ModEventMuteReporter> | $Typed<ModEventUnmuteReporter> | $Typed<ModEventEmail> | $Typed<ModEventResolveAppeal> | $Typed<ModEventDivert> | $Typed<ModEventTag> | $Typed<AccountEvent> | $Typed<IdentityEvent> | $Typed<RecordEvent> | $Typed<ModEventPriorityScore> | {
        $type: string;
    };
    subject: $Typed<RepoView> | $Typed<RepoViewNotFound> | $Typed<RecordView> | $Typed<RecordViewNotFound> | {
        $type: string;
    };
    subjectBlobs: BlobView[];
    createdBy: string;
    createdAt: string;
}
export declare function isModEventViewDetail<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventViewDetail">;
export declare function validateModEventViewDetail<V>(v: V): ValidationResult<ModEventViewDetail & V>;
export interface SubjectStatusView {
    $type?: 'tools.ozone.moderation.defs#subjectStatusView';
    id: number;
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
    hosting?: $Typed<AccountHosting> | $Typed<RecordHosting> | {
        $type: string;
    };
    subjectBlobCids?: string[];
    subjectRepoHandle?: string;
    /** Timestamp referencing when the last update was made to the moderation status of the subject */
    updatedAt: string;
    /** Timestamp referencing the first moderation status impacting event was emitted on the subject */
    createdAt: string;
    reviewState: SubjectReviewState;
    /** Sticky comment on the subject. */
    comment?: string;
    /** Numeric value representing the level of priority. Higher score means higher priority. */
    priorityScore?: number;
    muteUntil?: string;
    muteReportingUntil?: string;
    lastReviewedBy?: string;
    lastReviewedAt?: string;
    lastReportedAt?: string;
    /** Timestamp referencing when the author of the subject appealed a moderation action */
    lastAppealedAt?: string;
    takendown?: boolean;
    /** True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators. */
    appealed?: boolean;
    suspendUntil?: string;
    tags?: string[];
    accountStats?: AccountStats;
    recordsStats?: RecordsStats;
}
export declare function isSubjectStatusView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "subjectStatusView">;
export declare function validateSubjectStatusView<V>(v: V): ValidationResult<SubjectStatusView & V>;
/** Detailed view of a subject. For record subjects, the author's repo and profile will be returned. */
export interface SubjectView {
    $type?: 'tools.ozone.moderation.defs#subjectView';
    type: ComAtprotoModerationDefs.SubjectType;
    subject: string;
    status?: SubjectStatusView;
    repo?: RepoViewDetail;
    profile?: {
        $type: string;
    };
    record?: RecordViewDetail;
}
export declare function isSubjectView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "subjectView">;
export declare function validateSubjectView<V>(v: V): ValidationResult<SubjectView & V>;
/** Statistics about a particular account subject */
export interface AccountStats {
    $type?: 'tools.ozone.moderation.defs#accountStats';
    /** Total number of reports on the account */
    reportCount?: number;
    /** Total number of appeals against a moderation action on the account */
    appealCount?: number;
    /** Number of times the account was suspended */
    suspendCount?: number;
    /** Number of times the account was escalated */
    escalateCount?: number;
    /** Number of times the account was taken down */
    takedownCount?: number;
}
export declare function isAccountStats<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "accountStats">;
export declare function validateAccountStats<V>(v: V): ValidationResult<AccountStats & V>;
/** Statistics about a set of record subject items */
export interface RecordsStats {
    $type?: 'tools.ozone.moderation.defs#recordsStats';
    /** Cumulative sum of the number of reports on the items in the set */
    totalReports?: number;
    /** Number of items that were reported at least once */
    reportedCount?: number;
    /** Number of items that were escalated at least once */
    escalatedCount?: number;
    /** Number of items that were appealed at least once */
    appealedCount?: number;
    /** Total number of item in the set */
    subjectCount?: number;
    /** Number of item currently in "reviewOpen" or "reviewEscalated" state */
    pendingCount?: number;
    /** Number of item currently in "reviewNone" or "reviewClosed" state */
    processedCount?: number;
    /** Number of item currently taken down */
    takendownCount?: number;
}
export declare function isRecordsStats<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordsStats">;
export declare function validateRecordsStats<V>(v: V): ValidationResult<RecordsStats & V>;
export type SubjectReviewState = 'lex:tools.ozone.moderation.defs#reviewOpen' | 'lex:tools.ozone.moderation.defs#reviewEscalated' | 'lex:tools.ozone.moderation.defs#reviewClosed' | 'lex:tools.ozone.moderation.defs#reviewNone' | (string & {});
/** Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator */
export declare const REVIEWOPEN = "tools.ozone.moderation.defs#reviewOpen";
/** Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator */
export declare const REVIEWESCALATED = "tools.ozone.moderation.defs#reviewEscalated";
/** Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator */
export declare const REVIEWCLOSED = "tools.ozone.moderation.defs#reviewClosed";
/** Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it */
export declare const REVIEWNONE = "tools.ozone.moderation.defs#reviewNone";
/** Take down a subject permanently or temporarily */
export interface ModEventTakedown {
    $type?: 'tools.ozone.moderation.defs#modEventTakedown';
    comment?: string;
    /** Indicates how long the takedown should be in effect before automatically expiring. */
    durationInHours?: number;
    /** If true, all other reports on content authored by this account will be resolved (acknowledged). */
    acknowledgeAccountSubjects?: boolean;
    /** Names/Keywords of the policies that drove the decision. */
    policies?: string[];
}
export declare function isModEventTakedown<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventTakedown">;
export declare function validateModEventTakedown<V>(v: V): ValidationResult<ModEventTakedown & V>;
/** Revert take down action on a subject */
export interface ModEventReverseTakedown {
    $type?: 'tools.ozone.moderation.defs#modEventReverseTakedown';
    /** Describe reasoning behind the reversal. */
    comment?: string;
}
export declare function isModEventReverseTakedown<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventReverseTakedown">;
export declare function validateModEventReverseTakedown<V>(v: V): ValidationResult<ModEventReverseTakedown & V>;
/** Resolve appeal on a subject */
export interface ModEventResolveAppeal {
    $type?: 'tools.ozone.moderation.defs#modEventResolveAppeal';
    /** Describe resolution. */
    comment?: string;
}
export declare function isModEventResolveAppeal<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventResolveAppeal">;
export declare function validateModEventResolveAppeal<V>(v: V): ValidationResult<ModEventResolveAppeal & V>;
/** Add a comment to a subject. An empty comment will clear any previously set sticky comment. */
export interface ModEventComment {
    $type?: 'tools.ozone.moderation.defs#modEventComment';
    comment?: string;
    /** Make the comment persistent on the subject */
    sticky?: boolean;
}
export declare function isModEventComment<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventComment">;
export declare function validateModEventComment<V>(v: V): ValidationResult<ModEventComment & V>;
/** Report a subject */
export interface ModEventReport {
    $type?: 'tools.ozone.moderation.defs#modEventReport';
    comment?: string;
    /** Set to true if the reporter was muted from reporting at the time of the event. These reports won't impact the reviewState of the subject. */
    isReporterMuted?: boolean;
    reportType: ComAtprotoModerationDefs.ReasonType;
}
export declare function isModEventReport<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventReport">;
export declare function validateModEventReport<V>(v: V): ValidationResult<ModEventReport & V>;
/** Apply/Negate labels on a subject */
export interface ModEventLabel {
    $type?: 'tools.ozone.moderation.defs#modEventLabel';
    comment?: string;
    createLabelVals: string[];
    negateLabelVals: string[];
    /** Indicates how long the label will remain on the subject. Only applies on labels that are being added. */
    durationInHours?: number;
}
export declare function isModEventLabel<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventLabel">;
export declare function validateModEventLabel<V>(v: V): ValidationResult<ModEventLabel & V>;
/** Set priority score of the subject. Higher score means higher priority. */
export interface ModEventPriorityScore {
    $type?: 'tools.ozone.moderation.defs#modEventPriorityScore';
    comment?: string;
    score: number;
}
export declare function isModEventPriorityScore<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventPriorityScore">;
export declare function validateModEventPriorityScore<V>(v: V): ValidationResult<ModEventPriorityScore & V>;
export interface ModEventAcknowledge {
    $type?: 'tools.ozone.moderation.defs#modEventAcknowledge';
    comment?: string;
    /** If true, all other reports on content authored by this account will be resolved (acknowledged). */
    acknowledgeAccountSubjects?: boolean;
}
export declare function isModEventAcknowledge<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventAcknowledge">;
export declare function validateModEventAcknowledge<V>(v: V): ValidationResult<ModEventAcknowledge & V>;
export interface ModEventEscalate {
    $type?: 'tools.ozone.moderation.defs#modEventEscalate';
    comment?: string;
}
export declare function isModEventEscalate<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventEscalate">;
export declare function validateModEventEscalate<V>(v: V): ValidationResult<ModEventEscalate & V>;
/** Mute incoming reports on a subject */
export interface ModEventMute {
    $type?: 'tools.ozone.moderation.defs#modEventMute';
    comment?: string;
    /** Indicates how long the subject should remain muted. */
    durationInHours: number;
}
export declare function isModEventMute<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventMute">;
export declare function validateModEventMute<V>(v: V): ValidationResult<ModEventMute & V>;
/** Unmute action on a subject */
export interface ModEventUnmute {
    $type?: 'tools.ozone.moderation.defs#modEventUnmute';
    /** Describe reasoning behind the reversal. */
    comment?: string;
}
export declare function isModEventUnmute<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventUnmute">;
export declare function validateModEventUnmute<V>(v: V): ValidationResult<ModEventUnmute & V>;
/** Mute incoming reports from an account */
export interface ModEventMuteReporter {
    $type?: 'tools.ozone.moderation.defs#modEventMuteReporter';
    comment?: string;
    /** Indicates how long the account should remain muted. Falsy value here means a permanent mute. */
    durationInHours?: number;
}
export declare function isModEventMuteReporter<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventMuteReporter">;
export declare function validateModEventMuteReporter<V>(v: V): ValidationResult<ModEventMuteReporter & V>;
/** Unmute incoming reports from an account */
export interface ModEventUnmuteReporter {
    $type?: 'tools.ozone.moderation.defs#modEventUnmuteReporter';
    /** Describe reasoning behind the reversal. */
    comment?: string;
}
export declare function isModEventUnmuteReporter<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventUnmuteReporter">;
export declare function validateModEventUnmuteReporter<V>(v: V): ValidationResult<ModEventUnmuteReporter & V>;
/** Keep a log of outgoing email to a user */
export interface ModEventEmail {
    $type?: 'tools.ozone.moderation.defs#modEventEmail';
    /** The subject line of the email sent to the user. */
    subjectLine: string;
    /** The content of the email sent to the user. */
    content?: string;
    /** Additional comment about the outgoing comm. */
    comment?: string;
}
export declare function isModEventEmail<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventEmail">;
export declare function validateModEventEmail<V>(v: V): ValidationResult<ModEventEmail & V>;
/** Divert a record's blobs to a 3rd party service for further scanning/tagging */
export interface ModEventDivert {
    $type?: 'tools.ozone.moderation.defs#modEventDivert';
    comment?: string;
}
export declare function isModEventDivert<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventDivert">;
export declare function validateModEventDivert<V>(v: V): ValidationResult<ModEventDivert & V>;
/** Add/Remove a tag on a subject */
export interface ModEventTag {
    $type?: 'tools.ozone.moderation.defs#modEventTag';
    /** Tags to be added to the subject. If already exists, won't be duplicated. */
    add: string[];
    /** Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated. */
    remove: string[];
    /** Additional comment about added/removed tags. */
    comment?: string;
}
export declare function isModEventTag<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "modEventTag">;
export declare function validateModEventTag<V>(v: V): ValidationResult<ModEventTag & V>;
/** Logs account status related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface AccountEvent {
    $type?: 'tools.ozone.moderation.defs#accountEvent';
    comment?: string;
    /** Indicates that the account has a repository which can be fetched from the host that emitted this event. */
    active: boolean;
    status?: 'unknown' | 'deactivated' | 'deleted' | 'takendown' | 'suspended' | 'tombstoned' | (string & {});
    timestamp: string;
}
export declare function isAccountEvent<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "accountEvent">;
export declare function validateAccountEvent<V>(v: V): ValidationResult<AccountEvent & V>;
/** Logs identity related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface IdentityEvent {
    $type?: 'tools.ozone.moderation.defs#identityEvent';
    comment?: string;
    handle?: string;
    pdsHost?: string;
    tombstone?: boolean;
    timestamp: string;
}
export declare function isIdentityEvent<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "identityEvent">;
export declare function validateIdentityEvent<V>(v: V): ValidationResult<IdentityEvent & V>;
/** Logs lifecycle event on a record subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
export interface RecordEvent {
    $type?: 'tools.ozone.moderation.defs#recordEvent';
    comment?: string;
    op: 'create' | 'update' | 'delete' | (string & {});
    cid?: string;
    timestamp: string;
}
export declare function isRecordEvent<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordEvent">;
export declare function validateRecordEvent<V>(v: V): ValidationResult<RecordEvent & V>;
export interface RepoView {
    $type?: 'tools.ozone.moderation.defs#repoView';
    did: string;
    handle: string;
    email?: string;
    relatedRecords: {
        [_ in string]: unknown;
    }[];
    indexedAt: string;
    moderation: Moderation;
    invitedBy?: ComAtprotoServerDefs.InviteCode;
    invitesDisabled?: boolean;
    inviteNote?: string;
    deactivatedAt?: string;
    threatSignatures?: ComAtprotoAdminDefs.ThreatSignature[];
}
export declare function isRepoView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "repoView">;
export declare function validateRepoView<V>(v: V): ValidationResult<RepoView & V>;
export interface RepoViewDetail {
    $type?: 'tools.ozone.moderation.defs#repoViewDetail';
    did: string;
    handle: string;
    email?: string;
    relatedRecords: {
        [_ in string]: unknown;
    }[];
    indexedAt: string;
    moderation: ModerationDetail;
    labels?: ComAtprotoLabelDefs.Label[];
    invitedBy?: ComAtprotoServerDefs.InviteCode;
    invites?: ComAtprotoServerDefs.InviteCode[];
    invitesDisabled?: boolean;
    inviteNote?: string;
    emailConfirmedAt?: string;
    deactivatedAt?: string;
    threatSignatures?: ComAtprotoAdminDefs.ThreatSignature[];
}
export declare function isRepoViewDetail<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "repoViewDetail">;
export declare function validateRepoViewDetail<V>(v: V): ValidationResult<RepoViewDetail & V>;
export interface RepoViewNotFound {
    $type?: 'tools.ozone.moderation.defs#repoViewNotFound';
    did: string;
}
export declare function isRepoViewNotFound<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "repoViewNotFound">;
export declare function validateRepoViewNotFound<V>(v: V): ValidationResult<RepoViewNotFound & V>;
export interface RecordView {
    $type?: 'tools.ozone.moderation.defs#recordView';
    uri: string;
    cid: string;
    value: {
        [_ in string]: unknown;
    };
    blobCids: string[];
    indexedAt: string;
    moderation: Moderation;
    repo: RepoView;
}
export declare function isRecordView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordView">;
export declare function validateRecordView<V>(v: V): ValidationResult<RecordView & V>;
export interface RecordViewDetail {
    $type?: 'tools.ozone.moderation.defs#recordViewDetail';
    uri: string;
    cid: string;
    value: {
        [_ in string]: unknown;
    };
    blobs: BlobView[];
    labels?: ComAtprotoLabelDefs.Label[];
    indexedAt: string;
    moderation: ModerationDetail;
    repo: RepoView;
}
export declare function isRecordViewDetail<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordViewDetail">;
export declare function validateRecordViewDetail<V>(v: V): ValidationResult<RecordViewDetail & V>;
export interface RecordViewNotFound {
    $type?: 'tools.ozone.moderation.defs#recordViewNotFound';
    uri: string;
}
export declare function isRecordViewNotFound<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordViewNotFound">;
export declare function validateRecordViewNotFound<V>(v: V): ValidationResult<RecordViewNotFound & V>;
export interface Moderation {
    $type?: 'tools.ozone.moderation.defs#moderation';
    subjectStatus?: SubjectStatusView;
}
export declare function isModeration<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "moderation">;
export declare function validateModeration<V>(v: V): ValidationResult<Moderation & V>;
export interface ModerationDetail {
    $type?: 'tools.ozone.moderation.defs#moderationDetail';
    subjectStatus?: SubjectStatusView;
}
export declare function isModerationDetail<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "moderationDetail">;
export declare function validateModerationDetail<V>(v: V): ValidationResult<ModerationDetail & V>;
export interface BlobView {
    $type?: 'tools.ozone.moderation.defs#blobView';
    cid: string;
    mimeType: string;
    size: number;
    createdAt: string;
    details?: $Typed<ImageDetails> | $Typed<VideoDetails> | {
        $type: string;
    };
    moderation?: Moderation;
}
export declare function isBlobView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "blobView">;
export declare function validateBlobView<V>(v: V): ValidationResult<BlobView & V>;
export interface ImageDetails {
    $type?: 'tools.ozone.moderation.defs#imageDetails';
    width: number;
    height: number;
}
export declare function isImageDetails<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "imageDetails">;
export declare function validateImageDetails<V>(v: V): ValidationResult<ImageDetails & V>;
export interface VideoDetails {
    $type?: 'tools.ozone.moderation.defs#videoDetails';
    width: number;
    height: number;
    length: number;
}
export declare function isVideoDetails<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "videoDetails">;
export declare function validateVideoDetails<V>(v: V): ValidationResult<VideoDetails & V>;
export interface AccountHosting {
    $type?: 'tools.ozone.moderation.defs#accountHosting';
    status: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'unknown' | (string & {});
    updatedAt?: string;
    createdAt?: string;
    deletedAt?: string;
    deactivatedAt?: string;
    reactivatedAt?: string;
}
export declare function isAccountHosting<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "accountHosting">;
export declare function validateAccountHosting<V>(v: V): ValidationResult<AccountHosting & V>;
export interface RecordHosting {
    $type?: 'tools.ozone.moderation.defs#recordHosting';
    status: 'deleted' | 'unknown' | (string & {});
    updatedAt?: string;
    createdAt?: string;
    deletedAt?: string;
}
export declare function isRecordHosting<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "recordHosting">;
export declare function validateRecordHosting<V>(v: V): ValidationResult<RecordHosting & V>;
export interface ReporterStats {
    $type?: 'tools.ozone.moderation.defs#reporterStats';
    did: string;
    /** The total number of reports made by the user on accounts. */
    accountReportCount: number;
    /** The total number of reports made by the user on records. */
    recordReportCount: number;
    /** The total number of accounts reported by the user. */
    reportedAccountCount: number;
    /** The total number of records reported by the user. */
    reportedRecordCount: number;
    /** The total number of accounts taken down as a result of the user's reports. */
    takendownAccountCount: number;
    /** The total number of records taken down as a result of the user's reports. */
    takendownRecordCount: number;
    /** The total number of accounts labeled as a result of the user's reports. */
    labeledAccountCount: number;
    /** The total number of records labeled as a result of the user's reports. */
    labeledRecordCount: number;
}
export declare function isReporterStats<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.defs", "reporterStats">;
export declare function validateReporterStats<V>(v: V): ValidationResult<ReporterStats & V>;
//# sourceMappingURL=defs.d.ts.map