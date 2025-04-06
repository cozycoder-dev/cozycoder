/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
/** Annotation of a sub-string within rich text. */
export interface Main {
    $type?: 'app.bsky.richtext.facet';
    index: ByteSlice;
    features: ($Typed<Mention> | $Typed<Link> | $Typed<Tag> | {
        $type: string;
    })[];
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.richtext.facet", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
/** Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID. */
export interface Mention {
    $type?: 'app.bsky.richtext.facet#mention';
    did: string;
}
export declare function isMention<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.richtext.facet", "mention">;
export declare function validateMention<V>(v: V): ValidationResult<Mention & V>;
/** Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL. */
export interface Link {
    $type?: 'app.bsky.richtext.facet#link';
    uri: string;
}
export declare function isLink<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.richtext.facet", "link">;
export declare function validateLink<V>(v: V): ValidationResult<Link & V>;
/** Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags'). */
export interface Tag {
    $type?: 'app.bsky.richtext.facet#tag';
    tag: string;
}
export declare function isTag<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.richtext.facet", "tag">;
export declare function validateTag<V>(v: V): ValidationResult<Tag & V>;
/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
export interface ByteSlice {
    $type?: 'app.bsky.richtext.facet#byteSlice';
    byteStart: number;
    byteEnd: number;
}
export declare function isByteSlice<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.richtext.facet", "byteSlice">;
export declare function validateByteSlice<V>(v: V): ValidationResult<ByteSlice & V>;
//# sourceMappingURL=facet.d.ts.map