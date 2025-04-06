/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../../../app/bsky/actor/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface ProfileViewBasic {
    $type?: 'chat.bsky.actor.defs#profileViewBasic';
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
    associated?: AppBskyActorDefs.ProfileAssociated;
    viewer?: AppBskyActorDefs.ViewerState;
    labels?: ComAtprotoLabelDefs.Label[];
    /** Set to true when the actor cannot actively participate in converations */
    chatDisabled?: boolean;
}
export declare function isProfileViewBasic<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.actor.defs", "profileViewBasic">;
export declare function validateProfileViewBasic<V>(v: V): ValidationResult<ProfileViewBasic & V>;
//# sourceMappingURL=defs.d.ts.map