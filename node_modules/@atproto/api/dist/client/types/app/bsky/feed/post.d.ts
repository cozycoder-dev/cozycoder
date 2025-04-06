/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
import type * as AppBskyEmbedImages from '../embed/images.js';
import type * as AppBskyEmbedVideo from '../embed/video.js';
import type * as AppBskyEmbedExternal from '../embed/external.js';
import type * as AppBskyEmbedRecord from '../embed/record.js';
import type * as AppBskyEmbedRecordWithMedia from '../embed/recordWithMedia.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
export interface Record {
    $type: 'app.bsky.feed.post';
    /** The primary post content. May be an empty string, if there are embeds. */
    text: string;
    /** DEPRECATED: replaced by app.bsky.richtext.facet. */
    entities?: Entity[];
    /** Annotations of text (mentions, URLs, hashtags, etc) */
    facets?: AppBskyRichtextFacet.Main[];
    reply?: ReplyRef;
    embed?: $Typed<AppBskyEmbedImages.Main> | $Typed<AppBskyEmbedVideo.Main> | $Typed<AppBskyEmbedExternal.Main> | $Typed<AppBskyEmbedRecord.Main> | $Typed<AppBskyEmbedRecordWithMedia.Main> | {
        $type: string;
    };
    /** Indicates human language of post primary text content. */
    langs?: string[];
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    /** Additional hashtags, in addition to any included in post text and facets. */
    tags?: string[];
    /** Client-declared timestamp when this post was originally created. */
    createdAt: string;
    [k: string]: unknown;
}
export declare function isRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.post", "main">;
export declare function validateRecord<V>(v: V): ValidationResult<Record & V>;
export interface ReplyRef {
    $type?: 'app.bsky.feed.post#replyRef';
    root: ComAtprotoRepoStrongRef.Main;
    parent: ComAtprotoRepoStrongRef.Main;
}
export declare function isReplyRef<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.post", "replyRef">;
export declare function validateReplyRef<V>(v: V): ValidationResult<ReplyRef & V>;
/** Deprecated: use facets instead. */
export interface Entity {
    $type?: 'app.bsky.feed.post#entity';
    index: TextSlice;
    /** Expected values are 'mention' and 'link'. */
    type: string;
    value: string;
}
export declare function isEntity<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.post", "entity">;
export declare function validateEntity<V>(v: V): ValidationResult<Entity & V>;
/** Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings. */
export interface TextSlice {
    $type?: 'app.bsky.feed.post#textSlice';
    start: number;
    end: number;
}
export declare function isTextSlice<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.post", "textSlice">;
export declare function validateTextSlice<V>(v: V): ValidationResult<TextSlice & V>;
//# sourceMappingURL=post.d.ts.map