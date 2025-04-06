/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
export interface Record {
    $type: 'app.bsky.actor.profile';
    displayName?: string;
    /** Free-form profile description text. */
    description?: string;
    /** Small image to be displayed next to posts from account. AKA, 'profile picture' */
    avatar?: BlobRef;
    /** Larger horizontal image to display behind profile view. */
    banner?: BlobRef;
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    joinedViaStarterPack?: ComAtprotoRepoStrongRef.Main;
    pinnedPost?: ComAtprotoRepoStrongRef.Main;
    createdAt?: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.actor.profile", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=profile.d.ts.map