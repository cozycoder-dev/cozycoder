/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as ComAtprotoModerationDefs from '../../../com/atproto/moderation/defs.js';
export interface LabelerView {
    $type?: 'app.bsky.labeler.defs#labelerView';
    uri: string;
    cid: string;
    creator: AppBskyActorDefs.ProfileView;
    likeCount?: number;
    viewer?: LabelerViewerState;
    indexedAt: string;
    labels?: ComAtprotoLabelDefs.Label[];
}
export declare function isLabelerView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.labeler.defs", "labelerView">;
export declare function validateLabelerView<V>(v: V): ValidationResult<LabelerView & V>;
export interface LabelerViewDetailed {
    $type?: 'app.bsky.labeler.defs#labelerViewDetailed';
    uri: string;
    cid: string;
    creator: AppBskyActorDefs.ProfileView;
    policies: LabelerPolicies;
    likeCount?: number;
    viewer?: LabelerViewerState;
    indexedAt: string;
    labels?: ComAtprotoLabelDefs.Label[];
    /** The set of report reason 'codes' which are in-scope for this service to review and action. These usually align to policy categories. If not defined (distinct from empty array), all reason types are allowed. */
    reasonTypes?: ComAtprotoModerationDefs.ReasonType[];
    /** The set of subject types (account, record, etc) this service accepts reports on. */
    subjectTypes?: ComAtprotoModerationDefs.SubjectType[];
    /** Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type. */
    subjectCollections?: string[];
}
export declare function isLabelerViewDetailed<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.labeler.defs", "labelerViewDetailed">;
export declare function validateLabelerViewDetailed<V>(v: V): ValidationResult<LabelerViewDetailed & V>;
export interface LabelerViewerState {
    $type?: 'app.bsky.labeler.defs#labelerViewerState';
    like?: string;
}
export declare function isLabelerViewerState<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.labeler.defs", "labelerViewerState">;
export declare function validateLabelerViewerState<V>(v: V): ValidationResult<LabelerViewerState & V>;
export interface LabelerPolicies {
    $type?: 'app.bsky.labeler.defs#labelerPolicies';
    /** The label values which this labeler publishes. May include global or custom labels. */
    labelValues: ComAtprotoLabelDefs.LabelValue[];
    /** Label values created by this labeler and scoped exclusively to it. Labels defined here will override global label definitions for this labeler. */
    labelValueDefinitions?: ComAtprotoLabelDefs.LabelValueDefinition[];
}
export declare function isLabelerPolicies<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.labeler.defs", "labelerPolicies">;
export declare function validateLabelerPolicies<V>(v: V): ValidationResult<LabelerPolicies & V>;
//# sourceMappingURL=defs.d.ts.map