/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyGraphDefs from './defs.js';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
export interface Record {
    $type: 'app.bsky.graph.list';
    purpose: AppBskyGraphDefs.ListPurpose;
    /** Display name for list; can not be empty. */
    name: string;
    description?: string;
    descriptionFacets?: AppBskyRichtextFacet.Main[];
    avatar?: BlobRef;
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.list", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
//# sourceMappingURL=list.d.ts.map