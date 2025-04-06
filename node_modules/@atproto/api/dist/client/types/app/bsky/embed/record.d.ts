/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js';
import type * as AppBskyFeedDefs from '../feed/defs.js';
import type * as AppBskyGraphDefs from '../graph/defs.js';
import type * as AppBskyLabelerDefs from '../labeler/defs.js';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as AppBskyEmbedImages from './images.js';
import type * as AppBskyEmbedVideo from './video.js';
import type * as AppBskyEmbedExternal from './external.js';
import type * as AppBskyEmbedRecordWithMedia from './recordWithMedia.js';
export interface Main {
    $type?: 'app.bsky.embed.record';
    record: ComAtprotoRepoStrongRef.Main;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export interface View {
    $type?: 'app.bsky.embed.record#view';
    record: $Typed<ViewRecord> | $Typed<ViewNotFound> | $Typed<ViewBlocked> | $Typed<ViewDetached> | $Typed<AppBskyFeedDefs.GeneratorView> | $Typed<AppBskyGraphDefs.ListView> | $Typed<AppBskyLabelerDefs.LabelerView> | $Typed<AppBskyGraphDefs.StarterPackViewBasic> | {
        $type: string;
    };
}
export declare function isView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "view">;
export declare function validateView<V>(v: V): ValidationResult<View & V>;
export interface ViewRecord {
    $type?: 'app.bsky.embed.record#viewRecord';
    uri: string;
    cid: string;
    author: AppBskyActorDefs.ProfileViewBasic;
    /** The record data itself. */
    value: {
        [_ in string]: unknown;
    };
    labels?: ComAtprotoLabelDefs.Label[];
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    quoteCount?: number;
    embeds?: ($Typed<AppBskyEmbedImages.View> | $Typed<AppBskyEmbedVideo.View> | $Typed<AppBskyEmbedExternal.View> | $Typed<View> | $Typed<AppBskyEmbedRecordWithMedia.View> | {
        $type: string;
    })[];
    indexedAt: string;
}
export declare function isViewRecord<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "viewRecord">;
export declare function validateViewRecord<V>(v: V): ValidationResult<ViewRecord & V>;
export interface ViewNotFound {
    $type?: 'app.bsky.embed.record#viewNotFound';
    uri: string;
    notFound: true;
}
export declare function isViewNotFound<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "viewNotFound">;
export declare function validateViewNotFound<V>(v: V): ValidationResult<ViewNotFound & V>;
export interface ViewBlocked {
    $type?: 'app.bsky.embed.record#viewBlocked';
    uri: string;
    blocked: true;
    author: AppBskyFeedDefs.BlockedAuthor;
}
export declare function isViewBlocked<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "viewBlocked">;
export declare function validateViewBlocked<V>(v: V): ValidationResult<ViewBlocked & V>;
export interface ViewDetached {
    $type?: 'app.bsky.embed.record#viewDetached';
    uri: string;
    detached: true;
}
export declare function isViewDetached<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.record", "viewDetached">;
export declare function validateViewDetached<V>(v: V): ValidationResult<ViewDetached & V>;
//# sourceMappingURL=record.d.ts.map