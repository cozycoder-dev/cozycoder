"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalViewer = void 0;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../lexicon/lexicons");
const external_1 = require("../lexicon/types/app/bsky/embed/external");
const images_1 = require("../lexicon/types/app/bsky/embed/images");
const record_1 = require("../lexicon/types/app/bsky/embed/record");
const recordWithMedia_1 = require("../lexicon/types/app/bsky/embed/recordWithMedia");
class LocalViewer {
    constructor(actorStoreReader, accountManager, imageUrlBuilder, bskyAppView) {
        Object.defineProperty(this, "actorStoreReader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: actorStoreReader
        });
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accountManager
        });
        Object.defineProperty(this, "imageUrlBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: imageUrlBuilder
        });
        Object.defineProperty(this, "bskyAppView", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bskyAppView
        });
    }
    get did() {
        return this.actorStoreReader.did;
    }
    static creator(accountManager, imageUrlBuilder, bskyAppView) {
        return (actorStore) => new LocalViewer(actorStore, accountManager, imageUrlBuilder, bskyAppView);
    }
    getImageUrl(pattern, cid) {
        return this.imageUrlBuilder.build(pattern, this.did, cid);
    }
    async serviceAuthHeaders(did, lxm) {
        if (!this.bskyAppView) {
            throw new Error('Could not find bsky appview did');
        }
        const keypair = await this.actorStoreReader.keypair();
        return (0, xrpc_server_1.createServiceAuthHeaders)({
            iss: did,
            aud: this.bskyAppView.did,
            lxm,
            keypair,
        });
    }
    async getRecordsSinceRev(rev) {
        return this.actorStoreReader.record.getRecordsSinceRev(rev);
    }
    async getProfileBasic() {
        const [profileRes, accountRes] = await Promise.all([
            this.actorStoreReader.record.getProfileRecord(),
            this.accountManager.getAccount(this.did),
        ]);
        if (!accountRes)
            return null;
        return {
            did: this.did,
            handle: accountRes.handle ?? syntax_1.INVALID_HANDLE,
            displayName: profileRes?.displayName,
            avatar: profileRes?.avatar
                ? this.getImageUrl('avatar', profileRes.avatar.ref.toString())
                : undefined,
        };
    }
    async formatAndInsertPostsInFeed(feed, posts) {
        if (posts.length === 0) {
            return feed;
        }
        const lastTime = feed.at(-1)?.post.indexedAt ?? new Date(0).toISOString();
        const inFeed = posts.filter((p) => p.indexedAt > lastTime);
        const newestToOldest = inFeed.reverse();
        const maybeFormatted = await Promise.all(newestToOldest.map((p) => this.getPost(p)));
        const formatted = maybeFormatted.filter((p) => p !== null);
        for (const post of formatted) {
            const idx = feed.findIndex((fi) => fi.post.indexedAt < post.indexedAt);
            if (idx >= 0) {
                feed.splice(idx, 0, { post });
            }
            else {
                feed.push({ post });
            }
        }
        return feed;
    }
    async getPost(descript) {
        const { uri, cid, indexedAt, record } = descript;
        const author = await this.getProfileBasic();
        if (!author)
            return null;
        const embed = record.embed
            ? await this.formatPostEmbed(author.did, record)
            : undefined;
        return {
            uri: uri.toString(),
            cid: cid.toString(),
            likeCount: 0, // counts presumed to be 0 directly after post creation
            replyCount: 0,
            repostCount: 0,
            quoteCount: 0,
            author,
            record,
            embed: embed ?? undefined,
            indexedAt,
        };
    }
    async formatPostEmbed(did, post) {
        const embed = post.embed;
        if (!embed)
            return null;
        if ((0, images_1.isMain)(embed) || (0, external_1.isMain)(embed)) {
            return this.formatSimpleEmbed(embed);
        }
        else if ((0, record_1.isMain)(embed)) {
            return this.formatRecordEmbed(embed);
        }
        else if ((0, recordWithMedia_1.isMain)(embed)) {
            return this.formatRecordWithMediaEmbed(did, embed);
        }
        else {
            return null;
        }
    }
    async formatSimpleEmbed(embed) {
        if ((0, images_1.isMain)(embed)) {
            const images = embed.images.map((img) => ({
                thumb: this.getImageUrl('feed_thumbnail', img.image.ref.toString()),
                fullsize: this.getImageUrl('feed_fullsize', img.image.ref.toString()),
                aspectRatio: img.aspectRatio,
                alt: img.alt,
            }));
            return {
                $type: 'app.bsky.embed.images#view',
                images,
            };
        }
        else if ((0, external_1.isMain)(embed)) {
            const { uri, title, description, thumb } = embed.external;
            return {
                $type: 'app.bsky.embed.external#view',
                external: {
                    uri,
                    title,
                    description,
                    thumb: thumb
                        ? this.getImageUrl('feed_thumbnail', thumb.ref.toString())
                        : undefined,
                },
            };
        }
        else {
            // @ts-expect-error
            throw new TypeError(`Unexpected embed type: ${embed.$type}`);
        }
    }
    async formatRecordEmbed(embed) {
        const view = await this.formatRecordEmbedInternal(embed);
        return {
            $type: 'app.bsky.embed.record#view',
            record: view === null
                ? {
                    $type: 'app.bsky.embed.record#viewNotFound',
                    uri: embed.record.uri,
                }
                : view,
        };
    }
    async formatRecordEmbedInternal(embed) {
        if (!this.bskyAppView) {
            return null;
        }
        const collection = new syntax_1.AtUri(embed.record.uri).collection;
        if (collection === lexicons_1.ids.AppBskyFeedPost) {
            const res = await this.bskyAppView.agent.app.bsky.feed.getPosts({ uris: [embed.record.uri] }, await this.serviceAuthHeaders(this.did, lexicons_1.ids.AppBskyFeedGetPosts));
            const post = res.data.posts[0];
            if (!post)
                return null;
            return {
                $type: 'app.bsky.embed.record#viewRecord',
                uri: post.uri,
                cid: post.cid,
                author: post.author,
                value: post.record,
                labels: post.labels,
                embeds: post.embed ? [post.embed] : undefined,
                indexedAt: post.indexedAt,
            };
        }
        else if (collection === lexicons_1.ids.AppBskyFeedGenerator) {
            const res = await this.bskyAppView.agent.app.bsky.feed.getFeedGenerator({ feed: embed.record.uri }, await this.serviceAuthHeaders(this.did, lexicons_1.ids.AppBskyFeedGetFeedGenerator));
            return {
                $type: 'app.bsky.feed.defs#generatorView',
                ...res.data.view,
            };
        }
        else if (collection === lexicons_1.ids.AppBskyGraphList) {
            const res = await this.bskyAppView.agent.app.bsky.graph.getList({ list: embed.record.uri }, await this.serviceAuthHeaders(this.did, lexicons_1.ids.AppBskyGraphGetList));
            return {
                $type: 'app.bsky.graph.defs#listView',
                ...res.data.list,
            };
        }
        return null;
    }
    async formatRecordWithMediaEmbed(did, embed) {
        if (!(0, images_1.isMain)(embed.media) && !(0, external_1.isMain)(embed.media)) {
            return null;
        }
        const media = this.formatSimpleEmbed(embed.media);
        const record = await this.formatRecordEmbed(embed.record);
        return {
            $type: 'app.bsky.embed.recordWithMedia#view',
            record,
            media,
        };
    }
    updateProfileViewBasic(view, record) {
        return {
            ...view,
            displayName: record.displayName,
            avatar: record.avatar
                ? this.getImageUrl('avatar', record.avatar.ref.toString())
                : undefined,
        };
    }
    updateProfileView(view, record) {
        return {
            ...this.updateProfileViewBasic(view, record),
            description: record.description,
        };
    }
    updateProfileDetailed(view, record) {
        return {
            ...this.updateProfileView(view, record),
            banner: record.banner
                ? this.getImageUrl('banner', record.banner.ref.toString())
                : undefined,
        };
    }
}
exports.LocalViewer = LocalViewer;
//# sourceMappingURL=viewer.js.map