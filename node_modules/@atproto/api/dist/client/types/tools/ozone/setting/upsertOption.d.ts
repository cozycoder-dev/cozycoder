/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ToolsOzoneSettingDefs from './defs.js';
export interface QueryParams {
}
export interface InputSchema {
    key: string;
    scope: 'instance' | 'personal' | (string & {});
    value: {
        [_ in string]: unknown;
    };
    description?: string;
    managerRole?: 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | 'tools.ozone.team.defs#roleAdmin' | (string & {});
}
export interface OutputSchema {
    option: ToolsOzoneSettingDefs.Option;
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
//# sourceMappingURL=upsertOption.d.ts.map