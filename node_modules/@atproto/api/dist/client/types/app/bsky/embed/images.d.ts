/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
import type * as AppBskyEmbedDefs from './defs.js';
export interface Main {
    $type?: 'app.bsky.embed.images';
    images: Image[];
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.images", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export interface Image {
    $type?: 'app.bsky.embed.images#image';
    image: BlobRef;
    /** Alt text description of the image, for accessibility. */
    alt: string;
    aspectRatio?: AppBskyEmbedDefs.AspectRatio;
}
export declare function isImage<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.images", "image">;
export declare function validateImage<V>(v: V): ValidationResult<Image & V>;
export interface View {
    $type?: 'app.bsky.embed.images#view';
    images: ViewImage[];
}
export declare function isView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.images", "view">;
export declare function validateView<V>(v: V): ValidationResult<View & V>;
export interface ViewImage {
    $type?: 'app.bsky.embed.images#viewImage';
    /** Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View. */
    thumb: string;
    /** Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View. */
    fullsize: string;
    /** Alt text description of the image, for accessibility. */
    alt: string;
    aspectRatio?: AppBskyEmbedDefs.AspectRatio;
}
export declare function isViewImage<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.images", "viewImage">;
export declare function validateViewImage<V>(v: V): ValidationResult<ViewImage & V>;
//# sourceMappingURL=images.d.ts.map