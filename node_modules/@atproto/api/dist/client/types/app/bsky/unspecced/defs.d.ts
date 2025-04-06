/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../actor/defs.js';
export interface SkeletonSearchPost {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchPost';
    uri: string;
}
export declare function isSkeletonSearchPost<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "skeletonSearchPost">;
export declare function validateSkeletonSearchPost<V>(v: V): ValidationResult<SkeletonSearchPost & V>;
export interface SkeletonSearchActor {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchActor';
    did: string;
}
export declare function isSkeletonSearchActor<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "skeletonSearchActor">;
export declare function validateSkeletonSearchActor<V>(v: V): ValidationResult<SkeletonSearchActor & V>;
export interface SkeletonSearchStarterPack {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchStarterPack';
    uri: string;
}
export declare function isSkeletonSearchStarterPack<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "skeletonSearchStarterPack">;
export declare function validateSkeletonSearchStarterPack<V>(v: V): ValidationResult<SkeletonSearchStarterPack & V>;
export interface TrendingTopic {
    $type?: 'app.bsky.unspecced.defs#trendingTopic';
    topic: string;
    displayName?: string;
    description?: string;
    link: string;
}
export declare function isTrendingTopic<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "trendingTopic">;
export declare function validateTrendingTopic<V>(v: V): ValidationResult<TrendingTopic & V>;
export interface SkeletonTrend {
    $type?: 'app.bsky.unspecced.defs#skeletonTrend';
    topic: string;
    displayName: string;
    link: string;
    startedAt: string;
    postCount: number;
    status?: 'hot' | (string & {});
    category?: string;
    dids: string[];
}
export declare function isSkeletonTrend<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "skeletonTrend">;
export declare function validateSkeletonTrend<V>(v: V): ValidationResult<SkeletonTrend & V>;
export interface TrendView {
    $type?: 'app.bsky.unspecced.defs#trendView';
    topic: string;
    displayName: string;
    link: string;
    startedAt: string;
    postCount: number;
    status?: 'hot' | (string & {});
    category?: string;
    actors: AppBskyActorDefs.ProfileViewBasic[];
}
export declare function isTrendView<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.defs", "trendView">;
export declare function validateTrendView<V>(v: V): ValidationResult<TrendView & V>;
//# sourceMappingURL=defs.d.ts.map