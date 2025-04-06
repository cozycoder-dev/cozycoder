/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../../../app/bsky/actor/defs.js';
export interface Member {
    $type?: 'tools.ozone.team.defs#member';
    did: string;
    disabled?: boolean;
    profile?: AppBskyActorDefs.ProfileViewDetailed;
    createdAt?: string;
    updatedAt?: string;
    lastUpdatedBy?: string;
    role: 'lex:tools.ozone.team.defs#roleAdmin' | 'lex:tools.ozone.team.defs#roleModerator' | 'lex:tools.ozone.team.defs#roleTriage' | (string & {});
}
export declare function isMember<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.team.defs", "member">;
export declare function validateMember<V>(v: V): ValidationResult<Member & V>;
/** Admin role. Highest level of access, can perform all actions. */
export declare const ROLEADMIN = "tools.ozone.team.defs#roleAdmin";
/** Moderator role. Can perform most actions. */
export declare const ROLEMODERATOR = "tools.ozone.team.defs#roleModerator";
/** Triage role. Mostly intended for monitoring and escalating issues. */
export declare const ROLETRIAGE = "tools.ozone.team.defs#roleTriage";
//# sourceMappingURL=defs.d.ts.map