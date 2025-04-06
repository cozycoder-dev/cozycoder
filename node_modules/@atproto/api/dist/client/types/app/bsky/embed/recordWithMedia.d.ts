/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyEmbedRecord from './record.js';
import type * as AppBskyEmbedImages from './images.js';
import type * as AppBskyEmbedVideo from './video.js';
import type * as AppBskyEmbedExternal from './external.js';
export interface Main {
    $type?: 'app.bsky.embed.recordWithMedia';
    record: AppBskyEmbedRecord.Main;
    media: $Typed<AppBskyEmbedImages.Main> | $Typed<AppBskyEmbedVideo.Main> | $Typed<AppBskyEmbedExternal.Main> | {
        $type: string;
    };
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.recordWithMedia", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export interface View {
    $type?: 'app.bsky.embed.recordWithMedia#view';
    record: AppBskyEmbedRecord.View;
    media: $Typed<AppBskyEmbedImages.View> | $Typed<AppBskyEmbedVideo.View> | $Typed<AppBskyEmbedExternal.View> | {
        $type: string;
    };
}
export declare function isView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.recordWithMedia", "view">;
export declare function validateView<V>(v: V): ValidationResult<View & V>;
//# sourceMappingURL=recordWithMedia.d.ts.map