"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMessageRef = isMessageRef;
exports.validateMessageRef = validateMessageRef;
exports.isMessageInput = isMessageInput;
exports.validateMessageInput = validateMessageInput;
exports.isMessageView = isMessageView;
exports.validateMessageView = validateMessageView;
exports.isDeletedMessageView = isDeletedMessageView;
exports.validateDeletedMessageView = validateDeletedMessageView;
exports.isMessageViewSender = isMessageViewSender;
exports.validateMessageViewSender = validateMessageViewSender;
exports.isReactionView = isReactionView;
exports.validateReactionView = validateReactionView;
exports.isReactionViewSender = isReactionViewSender;
exports.validateReactionViewSender = validateReactionViewSender;
exports.isMessageAndReactionView = isMessageAndReactionView;
exports.validateMessageAndReactionView = validateMessageAndReactionView;
exports.isConvoView = isConvoView;
exports.validateConvoView = validateConvoView;
exports.isLogBeginConvo = isLogBeginConvo;
exports.validateLogBeginConvo = validateLogBeginConvo;
exports.isLogAcceptConvo = isLogAcceptConvo;
exports.validateLogAcceptConvo = validateLogAcceptConvo;
exports.isLogLeaveConvo = isLogLeaveConvo;
exports.validateLogLeaveConvo = validateLogLeaveConvo;
exports.isLogMuteConvo = isLogMuteConvo;
exports.validateLogMuteConvo = validateLogMuteConvo;
exports.isLogUnmuteConvo = isLogUnmuteConvo;
exports.validateLogUnmuteConvo = validateLogUnmuteConvo;
exports.isLogCreateMessage = isLogCreateMessage;
exports.validateLogCreateMessage = validateLogCreateMessage;
exports.isLogDeleteMessage = isLogDeleteMessage;
exports.validateLogDeleteMessage = validateLogDeleteMessage;
exports.isLogReadMessage = isLogReadMessage;
exports.validateLogReadMessage = validateLogReadMessage;
exports.isLogAddReaction = isLogAddReaction;
exports.validateLogAddReaction = validateLogAddReaction;
exports.isLogRemoveReaction = isLogRemoveReaction;
exports.validateLogRemoveReaction = validateLogRemoveReaction;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'chat.bsky.convo.defs';
const hashMessageRef = 'messageRef';
function isMessageRef(v) {
    return is$typed(v, id, hashMessageRef);
}
function validateMessageRef(v) {
    return validate(v, id, hashMessageRef);
}
const hashMessageInput = 'messageInput';
function isMessageInput(v) {
    return is$typed(v, id, hashMessageInput);
}
function validateMessageInput(v) {
    return validate(v, id, hashMessageInput);
}
const hashMessageView = 'messageView';
function isMessageView(v) {
    return is$typed(v, id, hashMessageView);
}
function validateMessageView(v) {
    return validate(v, id, hashMessageView);
}
const hashDeletedMessageView = 'deletedMessageView';
function isDeletedMessageView(v) {
    return is$typed(v, id, hashDeletedMessageView);
}
function validateDeletedMessageView(v) {
    return validate(v, id, hashDeletedMessageView);
}
const hashMessageViewSender = 'messageViewSender';
function isMessageViewSender(v) {
    return is$typed(v, id, hashMessageViewSender);
}
function validateMessageViewSender(v) {
    return validate(v, id, hashMessageViewSender);
}
const hashReactionView = 'reactionView';
function isReactionView(v) {
    return is$typed(v, id, hashReactionView);
}
function validateReactionView(v) {
    return validate(v, id, hashReactionView);
}
const hashReactionViewSender = 'reactionViewSender';
function isReactionViewSender(v) {
    return is$typed(v, id, hashReactionViewSender);
}
function validateReactionViewSender(v) {
    return validate(v, id, hashReactionViewSender);
}
const hashMessageAndReactionView = 'messageAndReactionView';
function isMessageAndReactionView(v) {
    return is$typed(v, id, hashMessageAndReactionView);
}
function validateMessageAndReactionView(v) {
    return validate(v, id, hashMessageAndReactionView);
}
const hashConvoView = 'convoView';
function isConvoView(v) {
    return is$typed(v, id, hashConvoView);
}
function validateConvoView(v) {
    return validate(v, id, hashConvoView);
}
const hashLogBeginConvo = 'logBeginConvo';
function isLogBeginConvo(v) {
    return is$typed(v, id, hashLogBeginConvo);
}
function validateLogBeginConvo(v) {
    return validate(v, id, hashLogBeginConvo);
}
const hashLogAcceptConvo = 'logAcceptConvo';
function isLogAcceptConvo(v) {
    return is$typed(v, id, hashLogAcceptConvo);
}
function validateLogAcceptConvo(v) {
    return validate(v, id, hashLogAcceptConvo);
}
const hashLogLeaveConvo = 'logLeaveConvo';
function isLogLeaveConvo(v) {
    return is$typed(v, id, hashLogLeaveConvo);
}
function validateLogLeaveConvo(v) {
    return validate(v, id, hashLogLeaveConvo);
}
const hashLogMuteConvo = 'logMuteConvo';
function isLogMuteConvo(v) {
    return is$typed(v, id, hashLogMuteConvo);
}
function validateLogMuteConvo(v) {
    return validate(v, id, hashLogMuteConvo);
}
const hashLogUnmuteConvo = 'logUnmuteConvo';
function isLogUnmuteConvo(v) {
    return is$typed(v, id, hashLogUnmuteConvo);
}
function validateLogUnmuteConvo(v) {
    return validate(v, id, hashLogUnmuteConvo);
}
const hashLogCreateMessage = 'logCreateMessage';
function isLogCreateMessage(v) {
    return is$typed(v, id, hashLogCreateMessage);
}
function validateLogCreateMessage(v) {
    return validate(v, id, hashLogCreateMessage);
}
const hashLogDeleteMessage = 'logDeleteMessage';
function isLogDeleteMessage(v) {
    return is$typed(v, id, hashLogDeleteMessage);
}
function validateLogDeleteMessage(v) {
    return validate(v, id, hashLogDeleteMessage);
}
const hashLogReadMessage = 'logReadMessage';
function isLogReadMessage(v) {
    return is$typed(v, id, hashLogReadMessage);
}
function validateLogReadMessage(v) {
    return validate(v, id, hashLogReadMessage);
}
const hashLogAddReaction = 'logAddReaction';
function isLogAddReaction(v) {
    return is$typed(v, id, hashLogAddReaction);
}
function validateLogAddReaction(v) {
    return validate(v, id, hashLogAddReaction);
}
const hashLogRemoveReaction = 'logRemoveReaction';
function isLogRemoveReaction(v) {
    return is$typed(v, id, hashLogRemoveReaction);
}
function validateLogRemoveReaction(v) {
    return validate(v, id, hashLogRemoveReaction);
}
//# sourceMappingURL=defs.js.map