"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfileViewBasic = isProfileViewBasic;
exports.validateProfileViewBasic = validateProfileViewBasic;
exports.isProfileView = isProfileView;
exports.validateProfileView = validateProfileView;
exports.isProfileViewDetailed = isProfileViewDetailed;
exports.validateProfileViewDetailed = validateProfileViewDetailed;
exports.isProfileAssociated = isProfileAssociated;
exports.validateProfileAssociated = validateProfileAssociated;
exports.isProfileAssociatedChat = isProfileAssociatedChat;
exports.validateProfileAssociatedChat = validateProfileAssociatedChat;
exports.isViewerState = isViewerState;
exports.validateViewerState = validateViewerState;
exports.isKnownFollowers = isKnownFollowers;
exports.validateKnownFollowers = validateKnownFollowers;
exports.isAdultContentPref = isAdultContentPref;
exports.validateAdultContentPref = validateAdultContentPref;
exports.isContentLabelPref = isContentLabelPref;
exports.validateContentLabelPref = validateContentLabelPref;
exports.isSavedFeed = isSavedFeed;
exports.validateSavedFeed = validateSavedFeed;
exports.isSavedFeedsPrefV2 = isSavedFeedsPrefV2;
exports.validateSavedFeedsPrefV2 = validateSavedFeedsPrefV2;
exports.isSavedFeedsPref = isSavedFeedsPref;
exports.validateSavedFeedsPref = validateSavedFeedsPref;
exports.isPersonalDetailsPref = isPersonalDetailsPref;
exports.validatePersonalDetailsPref = validatePersonalDetailsPref;
exports.isFeedViewPref = isFeedViewPref;
exports.validateFeedViewPref = validateFeedViewPref;
exports.isThreadViewPref = isThreadViewPref;
exports.validateThreadViewPref = validateThreadViewPref;
exports.isInterestsPref = isInterestsPref;
exports.validateInterestsPref = validateInterestsPref;
exports.isMutedWord = isMutedWord;
exports.validateMutedWord = validateMutedWord;
exports.isMutedWordsPref = isMutedWordsPref;
exports.validateMutedWordsPref = validateMutedWordsPref;
exports.isHiddenPostsPref = isHiddenPostsPref;
exports.validateHiddenPostsPref = validateHiddenPostsPref;
exports.isLabelersPref = isLabelersPref;
exports.validateLabelersPref = validateLabelersPref;
exports.isLabelerPrefItem = isLabelerPrefItem;
exports.validateLabelerPrefItem = validateLabelerPrefItem;
exports.isBskyAppStatePref = isBskyAppStatePref;
exports.validateBskyAppStatePref = validateBskyAppStatePref;
exports.isBskyAppProgressGuide = isBskyAppProgressGuide;
exports.validateBskyAppProgressGuide = validateBskyAppProgressGuide;
exports.isNux = isNux;
exports.validateNux = validateNux;
exports.isPostInteractionSettingsPref = isPostInteractionSettingsPref;
exports.validatePostInteractionSettingsPref = validatePostInteractionSettingsPref;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'app.bsky.actor.defs';
const hashProfileViewBasic = 'profileViewBasic';
function isProfileViewBasic(v) {
    return is$typed(v, id, hashProfileViewBasic);
}
function validateProfileViewBasic(v) {
    return validate(v, id, hashProfileViewBasic);
}
const hashProfileView = 'profileView';
function isProfileView(v) {
    return is$typed(v, id, hashProfileView);
}
function validateProfileView(v) {
    return validate(v, id, hashProfileView);
}
const hashProfileViewDetailed = 'profileViewDetailed';
function isProfileViewDetailed(v) {
    return is$typed(v, id, hashProfileViewDetailed);
}
function validateProfileViewDetailed(v) {
    return validate(v, id, hashProfileViewDetailed);
}
const hashProfileAssociated = 'profileAssociated';
function isProfileAssociated(v) {
    return is$typed(v, id, hashProfileAssociated);
}
function validateProfileAssociated(v) {
    return validate(v, id, hashProfileAssociated);
}
const hashProfileAssociatedChat = 'profileAssociatedChat';
function isProfileAssociatedChat(v) {
    return is$typed(v, id, hashProfileAssociatedChat);
}
function validateProfileAssociatedChat(v) {
    return validate(v, id, hashProfileAssociatedChat);
}
const hashViewerState = 'viewerState';
function isViewerState(v) {
    return is$typed(v, id, hashViewerState);
}
function validateViewerState(v) {
    return validate(v, id, hashViewerState);
}
const hashKnownFollowers = 'knownFollowers';
function isKnownFollowers(v) {
    return is$typed(v, id, hashKnownFollowers);
}
function validateKnownFollowers(v) {
    return validate(v, id, hashKnownFollowers);
}
const hashAdultContentPref = 'adultContentPref';
function isAdultContentPref(v) {
    return is$typed(v, id, hashAdultContentPref);
}
function validateAdultContentPref(v) {
    return validate(v, id, hashAdultContentPref);
}
const hashContentLabelPref = 'contentLabelPref';
function isContentLabelPref(v) {
    return is$typed(v, id, hashContentLabelPref);
}
function validateContentLabelPref(v) {
    return validate(v, id, hashContentLabelPref);
}
const hashSavedFeed = 'savedFeed';
function isSavedFeed(v) {
    return is$typed(v, id, hashSavedFeed);
}
function validateSavedFeed(v) {
    return validate(v, id, hashSavedFeed);
}
const hashSavedFeedsPrefV2 = 'savedFeedsPrefV2';
function isSavedFeedsPrefV2(v) {
    return is$typed(v, id, hashSavedFeedsPrefV2);
}
function validateSavedFeedsPrefV2(v) {
    return validate(v, id, hashSavedFeedsPrefV2);
}
const hashSavedFeedsPref = 'savedFeedsPref';
function isSavedFeedsPref(v) {
    return is$typed(v, id, hashSavedFeedsPref);
}
function validateSavedFeedsPref(v) {
    return validate(v, id, hashSavedFeedsPref);
}
const hashPersonalDetailsPref = 'personalDetailsPref';
function isPersonalDetailsPref(v) {
    return is$typed(v, id, hashPersonalDetailsPref);
}
function validatePersonalDetailsPref(v) {
    return validate(v, id, hashPersonalDetailsPref);
}
const hashFeedViewPref = 'feedViewPref';
function isFeedViewPref(v) {
    return is$typed(v, id, hashFeedViewPref);
}
function validateFeedViewPref(v) {
    return validate(v, id, hashFeedViewPref);
}
const hashThreadViewPref = 'threadViewPref';
function isThreadViewPref(v) {
    return is$typed(v, id, hashThreadViewPref);
}
function validateThreadViewPref(v) {
    return validate(v, id, hashThreadViewPref);
}
const hashInterestsPref = 'interestsPref';
function isInterestsPref(v) {
    return is$typed(v, id, hashInterestsPref);
}
function validateInterestsPref(v) {
    return validate(v, id, hashInterestsPref);
}
const hashMutedWord = 'mutedWord';
function isMutedWord(v) {
    return is$typed(v, id, hashMutedWord);
}
function validateMutedWord(v) {
    return validate(v, id, hashMutedWord);
}
const hashMutedWordsPref = 'mutedWordsPref';
function isMutedWordsPref(v) {
    return is$typed(v, id, hashMutedWordsPref);
}
function validateMutedWordsPref(v) {
    return validate(v, id, hashMutedWordsPref);
}
const hashHiddenPostsPref = 'hiddenPostsPref';
function isHiddenPostsPref(v) {
    return is$typed(v, id, hashHiddenPostsPref);
}
function validateHiddenPostsPref(v) {
    return validate(v, id, hashHiddenPostsPref);
}
const hashLabelersPref = 'labelersPref';
function isLabelersPref(v) {
    return is$typed(v, id, hashLabelersPref);
}
function validateLabelersPref(v) {
    return validate(v, id, hashLabelersPref);
}
const hashLabelerPrefItem = 'labelerPrefItem';
function isLabelerPrefItem(v) {
    return is$typed(v, id, hashLabelerPrefItem);
}
function validateLabelerPrefItem(v) {
    return validate(v, id, hashLabelerPrefItem);
}
const hashBskyAppStatePref = 'bskyAppStatePref';
function isBskyAppStatePref(v) {
    return is$typed(v, id, hashBskyAppStatePref);
}
function validateBskyAppStatePref(v) {
    return validate(v, id, hashBskyAppStatePref);
}
const hashBskyAppProgressGuide = 'bskyAppProgressGuide';
function isBskyAppProgressGuide(v) {
    return is$typed(v, id, hashBskyAppProgressGuide);
}
function validateBskyAppProgressGuide(v) {
    return validate(v, id, hashBskyAppProgressGuide);
}
const hashNux = 'nux';
function isNux(v) {
    return is$typed(v, id, hashNux);
}
function validateNux(v) {
    return validate(v, id, hashNux);
}
const hashPostInteractionSettingsPref = 'postInteractionSettingsPref';
function isPostInteractionSettingsPref(v) {
    return is$typed(v, id, hashPostInteractionSettingsPref);
}
function validatePostInteractionSettingsPref(v) {
    return validate(v, id, hashPostInteractionSettingsPref);
}
//# sourceMappingURL=defs.js.map