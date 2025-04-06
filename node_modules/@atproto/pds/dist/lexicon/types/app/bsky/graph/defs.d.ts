/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js';
import type * as AppBskyActorDefs from '../actor/defs.js';
import type * as AppBskyRichtextFacet from '../richtext/facet.js';
import type * as AppBskyFeedDefs from '../feed/defs.js';
export interface ListViewBasic {
    $type?: 'app.bsky.graph.defs#listViewBasic';
    uri: string;
    cid: string;
    name: string;
    purpose: ListPurpose;
    avatar?: string;
    listItemCount?: number;
    labels?: ComAtprotoLabelDefs.Label[];
    viewer?: ListViewerState;
    indexedAt?: string;
}
export declare function isListViewBasic<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "listViewBasic">;
export declare function validateListViewBasic<V>(v: V): ValidationResult<ListViewBasic & V>;
export interface ListView {
    $type?: 'app.bsky.graph.defs#listView';
    uri: string;
    cid: string;
    creator: AppBskyActorDefs.ProfileView;
    name: string;
    purpose: ListPurpose;
    description?: string;
    descriptionFacets?: AppBskyRichtextFacet.Main[];
    avatar?: string;
    listItemCount?: number;
    labels?: ComAtprotoLabelDefs.Label[];
    viewer?: ListViewerState;
    indexedAt: string;
}
export declare function isListView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "listView">;
export declare function validateListView<V>(v: V): ValidationResult<ListView & V>;
export interface ListItemView {
    $type?: 'app.bsky.graph.defs#listItemView';
    uri: string;
    subject: AppBskyActorDefs.ProfileView;
}
export declare function isListItemView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "listItemView">;
export declare function validateListItemView<V>(v: V): ValidationResult<ListItemView & V>;
export interface StarterPackView {
    $type?: 'app.bsky.graph.defs#starterPackView';
    uri: string;
    cid: string;
    record: {
        [_ in string]: unknown;
    };
    creator: AppBskyActorDefs.ProfileViewBasic;
    list?: ListViewBasic;
    listItemsSample?: ListItemView[];
    feeds?: AppBskyFeedDefs.GeneratorView[];
    joinedWeekCount?: number;
    joinedAllTimeCount?: number;
    labels?: ComAtprotoLabelDefs.Label[];
    indexedAt: string;
}
export declare function isStarterPackView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "starterPackView">;
export declare function validateStarterPackView<V>(v: V): ValidationResult<StarterPackView & V>;
export interface StarterPackViewBasic {
    $type?: 'app.bsky.graph.defs#starterPackViewBasic';
    uri: string;
    cid: string;
    record: {
        [_ in string]: unknown;
    };
    creator: AppBskyActorDefs.ProfileViewBasic;
    listItemCount?: number;
    joinedWeekCount?: number;
    joinedAllTimeCount?: number;
    labels?: ComAtprotoLabelDefs.Label[];
    indexedAt: string;
}
export declare function isStarterPackViewBasic<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "starterPackViewBasic">;
export declare function validateStarterPackViewBasic<V>(v: V): ValidationResult<StarterPackViewBasic & V>;
export type ListPurpose = 'app.bsky.graph.defs#modlist' | 'app.bsky.graph.defs#curatelist' | 'app.bsky.graph.defs#referencelist' | (string & {});
/** A list of actors to apply an aggregate moderation action (mute/block) on. */
export declare const MODLIST = "app.bsky.graph.defs#modlist";
/** A list of actors used for curation purposes such as list feeds or interaction gating. */
export declare const CURATELIST = "app.bsky.graph.defs#curatelist";
/** A list of actors used for only for reference purposes such as within a starter pack. */
export declare const REFERENCELIST = "app.bsky.graph.defs#referencelist";
export interface ListViewerState {
    $type?: 'app.bsky.graph.defs#listViewerState';
    muted?: boolean;
    blocked?: string;
}
export declare function isListViewerState<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "listViewerState">;
export declare function validateListViewerState<V>(v: V): ValidationResult<ListViewerState & V>;
/** indicates that a handle or DID could not be resolved */
export interface NotFoundActor {
    $type?: 'app.bsky.graph.defs#notFoundActor';
    actor: string;
    notFound: true;
}
export declare function isNotFoundActor<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "notFoundActor">;
export declare function validateNotFoundActor<V>(v: V): ValidationResult<NotFoundActor & V>;
/** lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object) */
export interface Relationship {
    $type?: 'app.bsky.graph.defs#relationship';
    did: string;
    /** if the actor follows this DID, this is the AT-URI of the follow record */
    following?: string;
    /** if the actor is followed by this DID, contains the AT-URI of the follow record */
    followedBy?: string;
}
export declare function isRelationship<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.defs", "relationship">;
export declare function validateRelationship<V>(v: V): ValidationResult<Relationship & V>;
//# sourceMappingURL=defs.d.ts.map