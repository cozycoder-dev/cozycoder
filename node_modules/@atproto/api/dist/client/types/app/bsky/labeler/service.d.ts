/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyLabelerDefs from './defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as ComAtprotoModerationDefs from '../../../com/atproto/moderation/defs.js';
export interface Record {
    $type: 'app.bsky.labeler.service';
    policies: AppBskyLabelerDefs.LabelerPolicies;
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    createdAt: string;
    /** The set of report reason 'codes' which are in-scope for this service to review and action. These usually align to policy categories. If not defined (distinct from empty array), all reason types are allowed. */
    reasonTypes?: ComAtprotoModerationDefs.ReasonType[];
    /** The set of subject types (account, record, etc) this service accepts reports on. */
    subjectTypes?: ComAtprotoModerationDefs.SubjectType[];
    /** Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type. */
    subjectCollections?: string[];
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.labeler.service", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=service.d.ts.map