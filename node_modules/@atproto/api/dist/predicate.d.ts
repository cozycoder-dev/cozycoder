import { AppBskyActorDefs, AppBskyActorProfile } from './client/index';
export declare const isValidProfile: <T>(v: T) => v is T & AppBskyActorProfile.Record;
export declare const isValidAdultContentPref: <T>(v: T) => v is T & AppBskyActorDefs.AdultContentPref;
export declare const isValidBskyAppStatePref: <T>(v: T) => v is T & AppBskyActorDefs.BskyAppStatePref;
export declare const isValidContentLabelPref: <T>(v: T) => v is T & AppBskyActorDefs.ContentLabelPref;
export declare const isValidFeedViewPref: <T>(v: T) => v is T & AppBskyActorDefs.FeedViewPref;
export declare const isValidHiddenPostsPref: <T>(v: T) => v is T & AppBskyActorDefs.HiddenPostsPref;
export declare const isValidInterestsPref: <T>(v: T) => v is T & AppBskyActorDefs.InterestsPref;
export declare const isValidLabelersPref: <T>(v: T) => v is T & AppBskyActorDefs.LabelersPref;
export declare const isValidMutedWordsPref: <T>(v: T) => v is T & AppBskyActorDefs.MutedWordsPref;
export declare const isValidPersonalDetailsPref: <T>(v: T) => v is T & AppBskyActorDefs.PersonalDetailsPref;
export declare const isValidPostInteractionSettingsPref: <T>(v: T) => v is T & AppBskyActorDefs.PostInteractionSettingsPref;
export declare const isValidSavedFeedsPref: <T>(v: T) => v is T & AppBskyActorDefs.SavedFeedsPref;
export declare const isValidSavedFeedsPrefV2: <T>(v: T) => v is T & AppBskyActorDefs.SavedFeedsPrefV2;
export declare const isValidThreadViewPref: <T>(v: T) => v is T & AppBskyActorDefs.ThreadViewPref;
//# sourceMappingURL=predicate.d.ts.map