/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import type * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js';
import type * as AppBskyEmbedRecord from '../../../app/bsky/embed/record.js';
import type * as ChatBskyActorDefs from '../actor/defs.js';
export interface MessageRef {
    $type?: 'chat.bsky.convo.defs#messageRef';
    did: string;
    convoId: string;
    messageId: string;
}
export declare function isMessageRef<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "messageRef">;
export declare function validateMessageRef<V>(v: V): ValidationResult<MessageRef & V>;
export interface MessageInput {
    $type?: 'chat.bsky.convo.defs#messageInput';
    text: string;
    /** Annotations of text (mentions, URLs, hashtags, etc) */
    facets?: AppBskyRichtextFacet.Main[];
    embed?: $Typed<AppBskyEmbedRecord.Main> | {
        $type: string;
    };
}
export declare function isMessageInput<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "messageInput">;
export declare function validateMessageInput<V>(v: V): ValidationResult<MessageInput & V>;
export interface MessageView {
    $type?: 'chat.bsky.convo.defs#messageView';
    id: string;
    rev: string;
    text: string;
    /** Annotations of text (mentions, URLs, hashtags, etc) */
    facets?: AppBskyRichtextFacet.Main[];
    embed?: $Typed<AppBskyEmbedRecord.View> | {
        $type: string;
    };
    /** Reactions to this message, in ascending order of creation time. */
    reactions?: ReactionView[];
    sender: MessageViewSender;
    sentAt: string;
}
export declare function isMessageView<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "messageView">;
export declare function validateMessageView<V>(v: V): ValidationResult<MessageView & V>;
export interface DeletedMessageView {
    $type?: 'chat.bsky.convo.defs#deletedMessageView';
    id: string;
    rev: string;
    sender: MessageViewSender;
    sentAt: string;
}
export declare function isDeletedMessageView<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "deletedMessageView">;
export declare function validateDeletedMessageView<V>(v: V): ValidationResult<DeletedMessageView & V>;
export interface MessageViewSender {
    $type?: 'chat.bsky.convo.defs#messageViewSender';
    did: string;
}
export declare function isMessageViewSender<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "messageViewSender">;
export declare function validateMessageViewSender<V>(v: V): ValidationResult<MessageViewSender & V>;
export interface ReactionView {
    $type?: 'chat.bsky.convo.defs#reactionView';
    value: string;
    sender: ReactionViewSender;
    createdAt: string;
}
export declare function isReactionView<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "reactionView">;
export declare function validateReactionView<V>(v: V): ValidationResult<ReactionView & V>;
export interface ReactionViewSender {
    $type?: 'chat.bsky.convo.defs#reactionViewSender';
    did: string;
}
export declare function isReactionViewSender<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "reactionViewSender">;
export declare function validateReactionViewSender<V>(v: V): ValidationResult<ReactionViewSender & V>;
export interface MessageAndReactionView {
    $type?: 'chat.bsky.convo.defs#messageAndReactionView';
    message: MessageView;
    reaction: ReactionView;
}
export declare function isMessageAndReactionView<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "messageAndReactionView">;
export declare function validateMessageAndReactionView<V>(v: V): ValidationResult<MessageAndReactionView & V>;
export interface ConvoView {
    $type?: 'chat.bsky.convo.defs#convoView';
    id: string;
    rev: string;
    members: ChatBskyActorDefs.ProfileViewBasic[];
    lastMessage?: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
    lastReaction?: $Typed<MessageAndReactionView> | {
        $type: string;
    };
    muted: boolean;
    status?: 'request' | 'accepted' | (string & {});
    unreadCount: number;
}
export declare function isConvoView<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "convoView">;
export declare function validateConvoView<V>(v: V): ValidationResult<ConvoView & V>;
export interface LogBeginConvo {
    $type?: 'chat.bsky.convo.defs#logBeginConvo';
    rev: string;
    convoId: string;
}
export declare function isLogBeginConvo<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logBeginConvo">;
export declare function validateLogBeginConvo<V>(v: V): ValidationResult<LogBeginConvo & V>;
export interface LogAcceptConvo {
    $type?: 'chat.bsky.convo.defs#logAcceptConvo';
    rev: string;
    convoId: string;
}
export declare function isLogAcceptConvo<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logAcceptConvo">;
export declare function validateLogAcceptConvo<V>(v: V): ValidationResult<LogAcceptConvo & V>;
export interface LogLeaveConvo {
    $type?: 'chat.bsky.convo.defs#logLeaveConvo';
    rev: string;
    convoId: string;
}
export declare function isLogLeaveConvo<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logLeaveConvo">;
export declare function validateLogLeaveConvo<V>(v: V): ValidationResult<LogLeaveConvo & V>;
export interface LogMuteConvo {
    $type?: 'chat.bsky.convo.defs#logMuteConvo';
    rev: string;
    convoId: string;
}
export declare function isLogMuteConvo<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logMuteConvo">;
export declare function validateLogMuteConvo<V>(v: V): ValidationResult<LogMuteConvo & V>;
export interface LogUnmuteConvo {
    $type?: 'chat.bsky.convo.defs#logUnmuteConvo';
    rev: string;
    convoId: string;
}
export declare function isLogUnmuteConvo<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logUnmuteConvo">;
export declare function validateLogUnmuteConvo<V>(v: V): ValidationResult<LogUnmuteConvo & V>;
export interface LogCreateMessage {
    $type?: 'chat.bsky.convo.defs#logCreateMessage';
    rev: string;
    convoId: string;
    message: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
}
export declare function isLogCreateMessage<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logCreateMessage">;
export declare function validateLogCreateMessage<V>(v: V): ValidationResult<LogCreateMessage & V>;
export interface LogDeleteMessage {
    $type?: 'chat.bsky.convo.defs#logDeleteMessage';
    rev: string;
    convoId: string;
    message: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
}
export declare function isLogDeleteMessage<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logDeleteMessage">;
export declare function validateLogDeleteMessage<V>(v: V): ValidationResult<LogDeleteMessage & V>;
export interface LogReadMessage {
    $type?: 'chat.bsky.convo.defs#logReadMessage';
    rev: string;
    convoId: string;
    message: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
}
export declare function isLogReadMessage<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logReadMessage">;
export declare function validateLogReadMessage<V>(v: V): ValidationResult<LogReadMessage & V>;
export interface LogAddReaction {
    $type?: 'chat.bsky.convo.defs#logAddReaction';
    rev: string;
    convoId: string;
    message: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
    reaction: ReactionView;
}
export declare function isLogAddReaction<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logAddReaction">;
export declare function validateLogAddReaction<V>(v: V): ValidationResult<LogAddReaction & V>;
export interface LogRemoveReaction {
    $type?: 'chat.bsky.convo.defs#logRemoveReaction';
    rev: string;
    convoId: string;
    message: $Typed<MessageView> | $Typed<DeletedMessageView> | {
        $type: string;
    };
    reaction: ReactionView;
}
export declare function isLogRemoveReaction<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.convo.defs", "logRemoveReaction">;
export declare function validateLogRemoveReaction<V>(v: V): ValidationResult<LogRemoveReaction & V>;
//# sourceMappingURL=defs.d.ts.map