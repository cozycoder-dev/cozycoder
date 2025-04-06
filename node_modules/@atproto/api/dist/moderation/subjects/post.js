"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decidePost = decidePost;
const client_1 = require("../../client");
const decision_1 = require("../decision");
const mutewords_1 = require("../mutewords");
const account_1 = require("./account");
const profile_1 = require("./profile");
function decidePost(subject, opts) {
    return decision_1.ModerationDecision.merge(decideSubject(subject, opts), decideEmbed(subject.embed, opts)?.downgrade(), (0, account_1.decideAccount)(subject.author, opts), (0, profile_1.decideProfile)(subject.author, opts));
}
function decideSubject(subject, opts) {
    const acc = new decision_1.ModerationDecision();
    acc.setDid(subject.author.did);
    acc.setIsMe(subject.author.did === opts.userDid);
    if (subject.labels?.length) {
        for (const label of subject.labels) {
            acc.addLabel('content', label, opts);
        }
    }
    acc.addHidden(checkHiddenPost(subject, opts.prefs.hiddenPosts));
    if (!acc.isMe) {
        acc.addMutedWord(checkMutedWords(subject, opts.prefs.mutedWords));
    }
    return acc;
}
function decideEmbed(embed, opts) {
    if (embed) {
        if ((client_1.AppBskyEmbedRecord.isView(embed) ||
            client_1.AppBskyEmbedRecordWithMedia.isView(embed)) &&
            client_1.AppBskyEmbedRecord.isViewRecord(embed.record)) {
            // quote post
            return decideQuotedPost(embed.record, opts);
        }
        else if (client_1.AppBskyEmbedRecordWithMedia.isView(embed) &&
            client_1.AppBskyEmbedRecord.isViewRecord(embed.record.record)) {
            // quoted post with media
            return decideQuotedPost(embed.record.record, opts);
        }
        else if ((client_1.AppBskyEmbedRecord.isView(embed) ||
            client_1.AppBskyEmbedRecordWithMedia.isView(embed)) &&
            client_1.AppBskyEmbedRecord.isViewBlocked(embed.record)) {
            // blocked quote post
            return decideBlockedQuotedPost(embed.record, opts);
        }
        else if (client_1.AppBskyEmbedRecordWithMedia.isView(embed) &&
            client_1.AppBskyEmbedRecord.isViewBlocked(embed.record.record)) {
            // blocked quoted post with media
            return decideBlockedQuotedPost(embed.record.record, opts);
        }
    }
    return undefined;
}
function decideQuotedPost(subject, opts) {
    const acc = new decision_1.ModerationDecision();
    acc.setDid(subject.author.did);
    acc.setIsMe(subject.author.did === opts.userDid);
    if (subject.labels?.length) {
        for (const label of subject.labels) {
            acc.addLabel('content', label, opts);
        }
    }
    return decision_1.ModerationDecision.merge(acc, (0, account_1.decideAccount)(subject.author, opts), (0, profile_1.decideProfile)(subject.author, opts));
}
function decideBlockedQuotedPost(subject, opts) {
    const acc = new decision_1.ModerationDecision();
    acc.setDid(subject.author.did);
    acc.setIsMe(subject.author.did === opts.userDid);
    if (subject.author.viewer?.muted) {
        if (subject.author.viewer?.mutedByList) {
            acc.addMutedByList(subject.author.viewer?.mutedByList);
        }
        else {
            acc.addMuted(subject.author.viewer?.muted);
        }
    }
    if (subject.author.viewer?.blocking) {
        if (subject.author.viewer?.blockingByList) {
            acc.addBlockingByList(subject.author.viewer?.blockingByList);
        }
        else {
            acc.addBlocking(subject.author.viewer?.blocking);
        }
    }
    acc.addBlockedBy(subject.author.viewer?.blockedBy);
    return acc;
}
function checkHiddenPost(subject, hiddenPosts) {
    if (!hiddenPosts?.length) {
        return false;
    }
    if (hiddenPosts.includes(subject.uri)) {
        return true;
    }
    if (subject.embed) {
        if (client_1.AppBskyEmbedRecord.isView(subject.embed) &&
            client_1.AppBskyEmbedRecord.isViewRecord(subject.embed.record) &&
            hiddenPosts.includes(subject.embed.record.uri)) {
            return true;
        }
        if (client_1.AppBskyEmbedRecordWithMedia.isView(subject.embed) &&
            client_1.AppBskyEmbedRecord.isViewRecord(subject.embed.record.record) &&
            hiddenPosts.includes(subject.embed.record.record.uri)) {
            return true;
        }
    }
    return false;
}
function checkMutedWords(subject, mutedWords) {
    if (!mutedWords?.length) {
        return false;
    }
    const postAuthor = subject.author;
    if (client_1.AppBskyFeedPost.isRecord(subject.record)) {
        const post = subject.record;
        // post text
        if ((0, mutewords_1.hasMutedWord)({
            mutedWords,
            text: post.text,
            facets: post.facets,
            outlineTags: post.tags,
            languages: post.langs,
            actor: postAuthor,
        })) {
            return true;
        }
        if (post.embed && client_1.AppBskyEmbedImages.isMain(post.embed)) {
            // post images
            for (const image of post.embed.images) {
                if ((0, mutewords_1.hasMutedWord)({
                    mutedWords,
                    text: image.alt,
                    languages: post.langs,
                    actor: postAuthor,
                })) {
                    return true;
                }
            }
        }
    }
    const { embed } = subject;
    if (embed) {
        // quote post
        if ((client_1.AppBskyEmbedRecord.isView(embed) ||
            client_1.AppBskyEmbedRecordWithMedia.isView(embed)) &&
            client_1.AppBskyEmbedRecord.isViewRecord(embed.record)) {
            if (client_1.AppBskyFeedPost.isRecord(embed.record.value)) {
                const embeddedPost = embed.record.value;
                const embedAuthor = embed.record.author;
                // quoted post text
                if ((0, mutewords_1.hasMutedWord)({
                    mutedWords,
                    text: embeddedPost.text,
                    facets: embeddedPost.facets,
                    outlineTags: embeddedPost.tags,
                    languages: embeddedPost.langs,
                    actor: embedAuthor,
                })) {
                    return true;
                }
                // quoted post's images
                if (client_1.AppBskyEmbedImages.isMain(embeddedPost.embed)) {
                    for (const image of embeddedPost.embed.images) {
                        if ((0, mutewords_1.hasMutedWord)({
                            mutedWords,
                            text: image.alt,
                            languages: embeddedPost.langs,
                            actor: embedAuthor,
                        })) {
                            return true;
                        }
                    }
                }
                // quoted post's link card
                if (client_1.AppBskyEmbedExternal.isMain(embeddedPost.embed)) {
                    const { external } = embeddedPost.embed;
                    if ((0, mutewords_1.hasMutedWord)({
                        mutedWords,
                        text: external.title + ' ' + external.description,
                        languages: [],
                        actor: embedAuthor,
                    })) {
                        return true;
                    }
                }
                if (client_1.AppBskyEmbedRecordWithMedia.isMain(embeddedPost.embed)) {
                    // quoted post's link card when it did a quote + media
                    if (client_1.AppBskyEmbedExternal.isMain(embeddedPost.embed.media)) {
                        const { external } = embeddedPost.embed.media;
                        if ((0, mutewords_1.hasMutedWord)({
                            mutedWords,
                            text: external.title + ' ' + external.description,
                            languages: [],
                            actor: embedAuthor,
                        })) {
                            return true;
                        }
                    }
                    // quoted post's images when it did a quote + media
                    if (client_1.AppBskyEmbedImages.isMain(embeddedPost.embed.media)) {
                        for (const image of embeddedPost.embed.media.images) {
                            if ((0, mutewords_1.hasMutedWord)({
                                mutedWords,
                                text: image.alt,
                                languages: client_1.AppBskyFeedPost.isRecord(embeddedPost.record)
                                    ? embeddedPost.langs
                                    : [],
                                actor: embedAuthor,
                            })) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        // link card
        else if (client_1.AppBskyEmbedExternal.isView(embed)) {
            const { external } = embed;
            if ((0, mutewords_1.hasMutedWord)({
                mutedWords,
                text: external.title + ' ' + external.description,
                languages: [],
                actor: postAuthor,
            })) {
                return true;
            }
        }
        // quote post with media
        else if (client_1.AppBskyEmbedRecordWithMedia.isView(embed) &&
            client_1.AppBskyEmbedRecord.isViewRecord(embed.record.record)) {
            const embedAuthor = embed.record.record.author;
            // quoted post text
            if (client_1.AppBskyFeedPost.isRecord(embed.record.record.value)) {
                const post = embed.record.record.value;
                if ((0, mutewords_1.hasMutedWord)({
                    mutedWords,
                    text: post.text,
                    facets: post.facets,
                    outlineTags: post.tags,
                    languages: post.langs,
                    actor: embedAuthor,
                })) {
                    return true;
                }
            }
            // quoted post images
            if (client_1.AppBskyEmbedImages.isView(embed.media)) {
                for (const image of embed.media.images) {
                    if ((0, mutewords_1.hasMutedWord)({
                        mutedWords,
                        text: image.alt,
                        languages: client_1.AppBskyFeedPost.isRecord(subject.record)
                            ? subject.record.langs
                            : [],
                        actor: embedAuthor,
                    })) {
                        return true;
                    }
                }
            }
            if (client_1.AppBskyEmbedExternal.isView(embed.media)) {
                const { external } = embed.media;
                if ((0, mutewords_1.hasMutedWord)({
                    mutedWords,
                    text: external.title + ' ' + external.description,
                    languages: [],
                    actor: embedAuthor,
                })) {
                    return true;
                }
            }
        }
    }
    return false;
}
//# sourceMappingURL=post.js.map