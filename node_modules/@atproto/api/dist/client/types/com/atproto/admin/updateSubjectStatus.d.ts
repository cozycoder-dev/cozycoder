/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoAdminDefs from './defs.js';
import type * as ComAtprotoRepoStrongRef from '../repo/strongRef.js';
export interface QueryParams {
}
export interface InputSchema {
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | $Typed<ComAtprotoAdminDefs.RepoBlobRef> | {
        $type: string;
    };
    takedown?: ComAtprotoAdminDefs.StatusAttr;
    deactivated?: ComAtprotoAdminDefs.StatusAttr;
}
export interface OutputSchema {
    subject: $Typed<ComAtprotoAdminDefs.RepoRef> | $Typed<ComAtprotoRepoStrongRef.Main> | $Typed<ComAtprotoAdminDefs.RepoBlobRef> | {
        $type: string;
    };
    takedown?: ComAtprotoAdminDefs.StatusAttr;
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
//# sourceMappingURL=updateSubjectStatus.d.ts.map