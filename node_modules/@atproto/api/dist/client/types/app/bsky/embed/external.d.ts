/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
/** A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post). */
export interface Main {
    $type?: 'app.bsky.embed.external';
    external: External;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.external", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export interface External {
    $type?: 'app.bsky.embed.external#external';
    uri: string;
    title: string;
    description: string;
    thumb?: BlobRef;
}
export declare function isExternal<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.external", "external">;
export declare function validateExternal<V>(v: V): ValidationResult<External & V>;
export interface View {
    $type?: 'app.bsky.embed.external#view';
    external: ViewExternal;
}
export declare function isView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.external", "view">;
export declare function validateView<V>(v: V): ValidationResult<View & V>;
export interface ViewExternal {
    $type?: 'app.bsky.embed.external#viewExternal';
    uri: string;
    title: string;
    description: string;
    thumb?: string;
}
export declare function isViewExternal<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.embed.external", "viewExternal">;
export declare function validateViewExternal<V>(v: V): ValidationResult<ViewExternal & V>;
//# sourceMappingURL=external.d.ts.map