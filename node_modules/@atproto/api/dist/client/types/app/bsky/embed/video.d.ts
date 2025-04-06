/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
import type * as AppBskyEmbedDefs from './defs.js';
export interface Main {
    $type?: 'app.bsky.embed.video';
    /** The mp4 video file. May be up to 100mb, formerly limited to 50mb. */
    video: BlobRef;
    captions?: Caption[];
    /** Alt text description of the video, for accessibility. */
    alt?: string;
    aspectRatio?: AppBskyEmbedDefs.AspectRatio;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.video", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export interface Caption {
    $type?: 'app.bsky.embed.video#caption';
    lang: string;
    file: BlobRef;
}
export declare function isCaption<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.video", "caption">;
export declare function validateCaption<V>(v: V): ValidationResult<Caption & V>;
export interface View {
    $type?: 'app.bsky.embed.video#view';
    cid: string;
    playlist: string;
    thumbnail?: string;
    alt?: string;
    aspectRatio?: AppBskyEmbedDefs.AspectRatio;
}
export declare function isView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.video", "view">;
export declare function validateView<V>(v: V): ValidationResult<View & V>;
//# sourceMappingURL=video.d.ts.map