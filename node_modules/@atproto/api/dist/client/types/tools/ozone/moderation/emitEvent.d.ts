/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as ToolsOzoneModerationDefs from './defs.js';
import type * as ComAtprotoAdminDefs from '../../../com/atproto/admin/defs.js';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
export interface QueryParams {
}
export interface InputSchema {
    event: $Typed<ToolsOzoneModerationDefs.ModEventTakedown> | $Typed<ToolsOzoneModerationDefs.ModEventAcknowledge> | $Typed<ToolsOzoneModerationDefs.ModEventEscalate> | $Typed<ToolsOzoneModerationDefs.ModEventComment> | $Typed<ToolsOzoneModerationDefs.ModEventLabel> | $Typed<ToolsOzoneModerationDefs.ModEventReport> | $Typed<ToolsOzoneModerationDefs.ModEventMute> | $Typed<ToolsOzoneModerationDefs.ModEventUnmute> | $Typed<ToolsOzoneModerationDefs.ModEventMuteReporter> | $Typed<ToolsOzoneModerationDefs.ModEventUnmuteReporter> | $Typed<ToolsOzoneModerationDefs.ModEventReverseTakedown> | $Typed<ToolsOzoneModerationDefs.ModEventResolveAppeal> | $Typed<ToolsOzoneModerationDefs.ModEventEmail> | $Typed<ToolsOzoneModerationDefs.ModEventDivert> | $Typed<ToolsOzoneModerationDefs.ModEventTag> | $Typed<ToolsOzoneModerationDefs.AccountEvent> | $Typed<ToolsOzoneModerationDefs.IdentityEvent> | $Typed<ToolsOzoneModerationDefs.RecordEvent> | $Typed<ToolsOzoneModerationDefs.ModEventPriorityScore> | {
        $type: string;
    };
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
    subjectBlobCids?: string[];
    createdBy: string;
}
export type OutputSchema = ToolsOzoneModerationDefs.ModEventView;
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare class SubjectHasActionError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=emitEvent.d.ts.map