/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Option {
    $type?: 'tools.ozone.setting.defs#option';
    key: string;
    did: string;
    value: {
        [_ in string]: unknown;
    };
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    managerRole?: 'tools.ozone.team.defs#roleModerator' | 'tools.ozone.team.defs#roleTriage' | 'tools.ozone.team.defs#roleAdmin' | (string & {});
    scope: 'instance' | 'personal' | (string & {});
    createdBy: string;
    lastUpdatedBy: string;
}
export declare function isOption<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.setting.defs", "option">;
export declare function validateOption<V>(v: V): ValidationResult<Option & V>;
//# sourceMappingURL=defs.d.ts.map