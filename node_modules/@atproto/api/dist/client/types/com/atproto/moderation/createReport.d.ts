/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoModerationDefs from './defs.js';
import type * as ComAtprotoAdminDefs from '../admin/defs.js';
import type * as ComAtprotoRepoStrongRef from '../repo/strongRef.js';
export interface QueryParams {
}
export interface InputSchema {
    reasonType: ComAtprotoModerationDefs.ReasonType;
    /** Additional context about the content and violation. */
    reason?: string;
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
}
export interface OutputSchema {
    id: number;
    reasonType: ComAtprotoModerationDefs.ReasonType;
    reason?: string;
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | {
        $type: string;
    };
    reportedBy: string;
    createdAt: string;
}
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
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=createReport.d.ts.map