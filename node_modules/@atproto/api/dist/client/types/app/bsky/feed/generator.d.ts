/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface Record {
    $type: 'app.bsky.feed.generator';
    did: string;
    displayName: string;
    description?: string;
    descriptionFacets?: AppBskyRichtextFacet.Main[];
    avatar?: BlobRef;
    /** Declaration that a feed accepts feedback interactions from a client through app.bsky.feed.sendInteractions */
    acceptsInteractions?: boolean;
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    contentMode?: 'app.bsky.feed.defs#contentModeUnspecified' | 'app.bsky.feed.defs#contentModeVideo' | (string & {});
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.generator", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=generator.d.ts.map