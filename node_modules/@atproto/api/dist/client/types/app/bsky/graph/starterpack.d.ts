/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
export interface Record {
    $type: 'app.bsky.graph.starterpack';
    /** Display name for starter pack; can not be empty. */
    name: string;
    description?: string;
    descriptionFacets?: AppBskyRichtextFacet.Main[];
    /** Reference (AT-URI) to the list record. */
    list: string;
    feeds?: FeedItem[];
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.starterpack", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
export interface FeedItem {
    $type?: 'app.bsky.graph.starterpack#feedItem';
    uri: string;
}
export declare function isFeedItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.starterpack", "feedItem">;
export declare function validateFeedItem<V>(v: V): ValidationResult<FeedItem & V>;
//# sourceMappingURL=starterpack.d.ts.map