"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVIEWNONE = exports.REVIEWCLOSED = exports.REVIEWESCALATED = exports.REVIEWOPEN = void 0;
exports.isModEventView = isModEventView;
exports.validateModEventView = validateModEventView;
exports.isModEventViewDetail = isModEventViewDetail;
exports.validateModEventViewDetail = validateModEventViewDetail;
exports.isSubjectStatusView = isSubjectStatusView;
exports.validateSubjectStatusView = validateSubjectStatusView;
exports.isSubjectView = isSubjectView;
exports.validateSubjectView = validateSubjectView;
exports.isAccountStats = isAccountStats;
exports.validateAccountStats = validateAccountStats;
exports.isRecordsStats = isRecordsStats;
exports.validateRecordsStats = validateRecordsStats;
exports.isModEventTakedown = isModEventTakedown;
exports.validateModEventTakedown = validateModEventTakedown;
exports.isModEventReverseTakedown = isModEventReverseTakedown;
exports.validateModEventReverseTakedown = validateModEventReverseTakedown;
exports.isModEventResolveAppeal = isModEventResolveAppeal;
exports.validateModEventResolveAppeal = validateModEventResolveAppeal;
exports.isModEventComment = isModEventComment;
exports.validateModEventComment = validateModEventComment;
exports.isModEventReport = isModEventReport;
exports.validateModEventReport = validateModEventReport;
exports.isModEventLabel = isModEventLabel;
exports.validateModEventLabel = validateModEventLabel;
exports.isModEventPriorityScore = isModEventPriorityScore;
exports.validateModEventPriorityScore = validateModEventPriorityScore;
exports.isModEventAcknowledge = isModEventAcknowledge;
exports.validateModEventAcknowledge = validateModEventAcknowledge;
exports.isModEventEscalate = isModEventEscalate;
exports.validateModEventEscalate = validateModEventEscalate;
exports.isModEventMute = isModEventMute;
exports.validateModEventMute = validateModEventMute;
exports.isModEventUnmute = isModEventUnmute;
exports.validateModEventUnmute = validateModEventUnmute;
exports.isModEventMuteReporter = isModEventMuteReporter;
exports.validateModEventMuteReporter = validateModEventMuteReporter;
exports.isModEventUnmuteReporter = isModEventUnmuteReporter;
exports.validateModEventUnmuteReporter = validateModEventUnmuteReporter;
exports.isModEventEmail = isModEventEmail;
exports.validateModEventEmail = validateModEventEmail;
exports.isModEventDivert = isModEventDivert;
exports.validateModEventDivert = validateModEventDivert;
exports.isModEventTag = isModEventTag;
exports.validateModEventTag = validateModEventTag;
exports.isAccountEvent = isAccountEvent;
exports.validateAccountEvent = validateAccountEvent;
exports.isIdentityEvent = isIdentityEvent;
exports.validateIdentityEvent = validateIdentityEvent;
exports.isRecordEvent = isRecordEvent;
exports.validateRecordEvent = validateRecordEvent;
exports.isRepoView = isRepoView;
exports.validateRepoView = validateRepoView;
exports.isRepoViewDetail = isRepoViewDetail;
exports.validateRepoViewDetail = validateRepoViewDetail;
exports.isRepoViewNotFound = isRepoViewNotFound;
exports.validateRepoViewNotFound = validateRepoViewNotFound;
exports.isRecordView = isRecordView;
exports.validateRecordView = validateRecordView;
exports.isRecordViewDetail = isRecordViewDetail;
exports.validateRecordViewDetail = validateRecordViewDetail;
exports.isRecordViewNotFound = isRecordViewNotFound;
exports.validateRecordViewNotFound = validateRecordViewNotFound;
exports.isModeration = isModeration;
exports.validateModeration = validateModeration;
exports.isModerationDetail = isModerationDetail;
exports.validateModerationDetail = validateModerationDetail;
exports.isBlobView = isBlobView;
exports.validateBlobView = validateBlobView;
exports.isImageDetails = isImageDetails;
exports.validateImageDetails = validateImageDetails;
exports.isVideoDetails = isVideoDetails;
exports.validateVideoDetails = validateVideoDetails;
exports.isAccountHosting = isAccountHosting;
exports.validateAccountHosting = validateAccountHosting;
exports.isRecordHosting = isRecordHosting;
exports.validateRecordHosting = validateRecordHosting;
exports.isReporterStats = isReporterStats;
exports.validateReporterStats = validateReporterStats;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.moderation.defs';
const hashModEventView = 'modEventView';
function isModEventView(v) {
    return is$typed(v, id, hashModEventView);
}
function validateModEventView(v) {
    return validate(v, id, hashModEventView);
}
const hashModEventViewDetail = 'modEventViewDetail';
function isModEventViewDetail(v) {
    return is$typed(v, id, hashModEventViewDetail);
}
function validateModEventViewDetail(v) {
    return validate(v, id, hashModEventViewDetail);
}
const hashSubjectStatusView = 'subjectStatusView';
function isSubjectStatusView(v) {
    return is$typed(v, id, hashSubjectStatusView);
}
function validateSubjectStatusView(v) {
    return validate(v, id, hashSubjectStatusView);
}
const hashSubjectView = 'subjectView';
function isSubjectView(v) {
    return is$typed(v, id, hashSubjectView);
}
function validateSubjectView(v) {
    return validate(v, id, hashSubjectView);
}
const hashAccountStats = 'accountStats';
function isAccountStats(v) {
    return is$typed(v, id, hashAccountStats);
}
function validateAccountStats(v) {
    return validate(v, id, hashAccountStats);
}
const hashRecordsStats = 'recordsStats';
function isRecordsStats(v) {
    return is$typed(v, id, hashRecordsStats);
}
function validateRecordsStats(v) {
    return validate(v, id, hashRecordsStats);
}
/** Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator */
exports.REVIEWOPEN = `${id}#reviewOpen`;
/** Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator */
exports.REVIEWESCALATED = `${id}#reviewEscalated`;
/** Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator */
exports.REVIEWCLOSED = `${id}#reviewClosed`;
/** Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it */
exports.REVIEWNONE = `${id}#reviewNone`;
const hashModEventTakedown = 'modEventTakedown';
function isModEventTakedown(v) {
    return is$typed(v, id, hashModEventTakedown);
}
function validateModEventTakedown(v) {
    return validate(v, id, hashModEventTakedown);
}
const hashModEventReverseTakedown = 'modEventReverseTakedown';
function isModEventReverseTakedown(v) {
    return is$typed(v, id, hashModEventReverseTakedown);
}
function validateModEventReverseTakedown(v) {
    return validate(v, id, hashModEventReverseTakedown);
}
const hashModEventResolveAppeal = 'modEventResolveAppeal';
function isModEventResolveAppeal(v) {
    return is$typed(v, id, hashModEventResolveAppeal);
}
function validateModEventResolveAppeal(v) {
    return validate(v, id, hashModEventResolveAppeal);
}
const hashModEventComment = 'modEventComment';
function isModEventComment(v) {
    return is$typed(v, id, hashModEventComment);
}
function validateModEventComment(v) {
    return validate(v, id, hashModEventComment);
}
const hashModEventReport = 'modEventReport';
function isModEventReport(v) {
    return is$typed(v, id, hashModEventReport);
}
function validateModEventReport(v) {
    return validate(v, id, hashModEventReport);
}
const hashModEventLabel = 'modEventLabel';
function isModEventLabel(v) {
    return is$typed(v, id, hashModEventLabel);
}
function validateModEventLabel(v) {
    return validate(v, id, hashModEventLabel);
}
const hashModEventPriorityScore = 'modEventPriorityScore';
function isModEventPriorityScore(v) {
    return is$typed(v, id, hashModEventPriorityScore);
}
function validateModEventPriorityScore(v) {
    return validate(v, id, hashModEventPriorityScore);
}
const hashModEventAcknowledge = 'modEventAcknowledge';
function isModEventAcknowledge(v) {
    return is$typed(v, id, hashModEventAcknowledge);
}
function validateModEventAcknowledge(v) {
    return validate(v, id, hashModEventAcknowledge);
}
const hashModEventEscalate = 'modEventEscalate';
function isModEventEscalate(v) {
    return is$typed(v, id, hashModEventEscalate);
}
function validateModEventEscalate(v) {
    return validate(v, id, hashModEventEscalate);
}
const hashModEventMute = 'modEventMute';
function isModEventMute(v) {
    return is$typed(v, id, hashModEventMute);
}
function validateModEventMute(v) {
    return validate(v, id, hashModEventMute);
}
const hashModEventUnmute = 'modEventUnmute';
function isModEventUnmute(v) {
    return is$typed(v, id, hashModEventUnmute);
}
function validateModEventUnmute(v) {
    return validate(v, id, hashModEventUnmute);
}
const hashModEventMuteReporter = 'modEventMuteReporter';
function isModEventMuteReporter(v) {
    return is$typed(v, id, hashModEventMuteReporter);
}
function validateModEventMuteReporter(v) {
    return validate(v, id, hashModEventMuteReporter);
}
const hashModEventUnmuteReporter = 'modEventUnmuteReporter';
function isModEventUnmuteReporter(v) {
    return is$typed(v, id, hashModEventUnmuteReporter);
}
function validateModEventUnmuteReporter(v) {
    return validate(v, id, hashModEventUnmuteReporter);
}
const hashModEventEmail = 'modEventEmail';
function isModEventEmail(v) {
    return is$typed(v, id, hashModEventEmail);
}
function validateModEventEmail(v) {
    return validate(v, id, hashModEventEmail);
}
const hashModEventDivert = 'modEventDivert';
function isModEventDivert(v) {
    return is$typed(v, id, hashModEventDivert);
}
function validateModEventDivert(v) {
    return validate(v, id, hashModEventDivert);
}
const hashModEventTag = 'modEventTag';
function isModEventTag(v) {
    return is$typed(v, id, hashModEventTag);
}
function validateModEventTag(v) {
    return validate(v, id, hashModEventTag);
}
const hashAccountEvent = 'accountEvent';
function isAccountEvent(v) {
    return is$typed(v, id, hashAccountEvent);
}
function validateAccountEvent(v) {
    return validate(v, id, hashAccountEvent);
}
const hashIdentityEvent = 'identityEvent';
function isIdentityEvent(v) {
    return is$typed(v, id, hashIdentityEvent);
}
function validateIdentityEvent(v) {
    return validate(v, id, hashIdentityEvent);
}
const hashRecordEvent = 'recordEvent';
function isRecordEvent(v) {
    return is$typed(v, id, hashRecordEvent);
}
function validateRecordEvent(v) {
    return validate(v, id, hashRecordEvent);
}
const hashRepoView = 'repoView';
function isRepoView(v) {
    return is$typed(v, id, hashRepoView);
}
function validateRepoView(v) {
    return validate(v, id, hashRepoView);
}
const hashRepoViewDetail = 'repoViewDetail';
function isRepoViewDetail(v) {
    return is$typed(v, id, hashRepoViewDetail);
}
function validateRepoViewDetail(v) {
    return validate(v, id, hashRepoViewDetail);
}
const hashRepoViewNotFound = 'repoViewNotFound';
function isRepoViewNotFound(v) {
    return is$typed(v, id, hashRepoViewNotFound);
}
function validateRepoViewNotFound(v) {
    return validate(v, id, hashRepoViewNotFound);
}
const hashRecordView = 'recordView';
function isRecordView(v) {
    return is$typed(v, id, hashRecordView);
}
function validateRecordView(v) {
    return validate(v, id, hashRecordView);
}
const hashRecordViewDetail = 'recordViewDetail';
function isRecordViewDetail(v) {
    return is$typed(v, id, hashRecordViewDetail);
}
function validateRecordViewDetail(v) {
    return validate(v, id, hashRecordViewDetail);
}
const hashRecordViewNotFound = 'recordViewNotFound';
function isRecordViewNotFound(v) {
    return is$typed(v, id, hashRecordViewNotFound);
}
function validateRecordViewNotFound(v) {
    return validate(v, id, hashRecordViewNotFound);
}
const hashModeration = 'moderation';
function isModeration(v) {
    return is$typed(v, id, hashModeration);
}
function validateModeration(v) {
    return validate(v, id, hashModeration);
}
const hashModerationDetail = 'moderationDetail';
function isModerationDetail(v) {
    return is$typed(v, id, hashModerationDetail);
}
function validateModerationDetail(v) {
    return validate(v, id, hashModerationDetail);
}
const hashBlobView = 'blobView';
function isBlobView(v) {
    return is$typed(v, id, hashBlobView);
}
function validateBlobView(v) {
    return validate(v, id, hashBlobView);
}
const hashImageDetails = 'imageDetails';
function isImageDetails(v) {
    return is$typed(v, id, hashImageDetails);
}
function validateImageDetails(v) {
    return validate(v, id, hashImageDetails);
}
const hashVideoDetails = 'videoDetails';
function isVideoDetails(v) {
    return is$typed(v, id, hashVideoDetails);
}
function validateVideoDetails(v) {
    return validate(v, id, hashVideoDetails);
}
const hashAccountHosting = 'accountHosting';
function isAccountHosting(v) {
    return is$typed(v, id, hashAccountHosting);
}
function validateAccountHosting(v) {
    return validate(v, id, hashAccountHosting);
}
const hashRecordHosting = 'recordHosting';
function isRecordHosting(v) {
    return is$typed(v, id, hashRecordHosting);
}
function validateRecordHosting(v) {
    return validate(v, id, hashRecordHosting);
}
const hashReporterStats = 'reporterStats';
function isReporterStats(v) {
    return is$typed(v, id, hashReporterStats);
}
function validateReporterStats(v) {
    return validate(v, id, hashReporterStats);
}
//# sourceMappingURL=defs.js.map