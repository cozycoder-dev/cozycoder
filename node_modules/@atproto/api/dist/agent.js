"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Agent_prefsLock;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const await_lock_1 = __importDefault(require("await-lock"));
const common_web_1 = require("@atproto/common-web");
const syntax_1 = require("@atproto/syntax");
const xrpc_1 = require("@atproto/xrpc");
const index_1 = require("./client/index");
const lexicons_1 = require("./client/lexicons");
const const_1 = require("./const");
const moderation_1 = require("./moderation");
const labels_1 = require("./moderation/const/labels");
const predicate = __importStar(require("./predicate"));
const util_1 = require("./util");
const FEED_VIEW_PREF_DEFAULTS = {
    hideReplies: false,
    hideRepliesByUnfollowed: true,
    hideRepliesByLikeCount: 0,
    hideReposts: false,
    hideQuotePosts: false,
};
const THREAD_VIEW_PREF_DEFAULTS = {
    sort: 'hotness',
    prioritizeFollowedUsers: true,
};
/**
 * An {@link Agent} is an {@link AtpBaseClient} with the following
 * additional features:
 * - AT Protocol labelers configuration utilities
 * - AT Protocol proxy configuration utilities
 * - Cloning utilities
 * - `app.bsky` syntactic sugar
 * - `com.atproto` syntactic sugar
 */
class Agent extends xrpc_1.XrpcClient {
    /**
     * Configures the Agent (or its sub classes) globally.
     */
    static configure(opts) {
        if (opts.appLabelers) {
            this.appLabelers = opts.appLabelers.map(util_1.asDid); // Validate & copy
        }
    }
    /** @deprecated use `this` instead */
    get xrpc() {
        return this;
    }
    constructor(options) {
        const sessionManager = typeof options === 'object' && 'fetchHandler' in options
            ? options
            : {
                did: undefined,
                fetchHandler: (0, xrpc_1.buildFetchHandler)(options),
            };
        super((url, init) => {
            const headers = new Headers(init?.headers);
            if (this.proxy && !headers.has('atproto-proxy')) {
                headers.set('atproto-proxy', this.proxy);
            }
            // Merge the labelers header of this particular request with the app &
            // instance labelers.
            headers.set('atproto-accept-labelers', [
                ...this.appLabelers.map((l) => `${l};redact`),
                ...this.labelers,
                headers.get('atproto-accept-labelers')?.trim(),
            ]
                .filter(Boolean)
                .join(', '));
            return this.sessionManager.fetchHandler(url, { ...init, headers });
        }, lexicons_1.schemas);
        //#endregion
        Object.defineProperty(this, "com", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new index_1.ComNS(this)
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new index_1.AppNS(this)
        });
        Object.defineProperty(this, "chat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new index_1.ChatNS(this)
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new index_1.ToolsNS(this)
        });
        Object.defineProperty(this, "sessionManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "labelers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        //#endregion
        //#region ATPROTO proxy configuration utilities
        Object.defineProperty(this, "proxy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        //#region "com.atproto" lexicon short hand methods
        /**
         * Upload a binary blob to the server
         */
        Object.defineProperty(this, "uploadBlob", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data, opts) => this.com.atproto.repo.uploadBlob(data, opts)
        });
        /**
         * Resolve a handle to a DID
         */
        Object.defineProperty(this, "resolveHandle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.com.atproto.identity.resolveHandle(params, opts)
        });
        /**
         * Change the user's handle
         */
        Object.defineProperty(this, "updateHandle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data, opts) => this.com.atproto.identity.updateHandle(data, opts)
        });
        /**
         * Create a moderation report
         */
        Object.defineProperty(this, "createModerationReport", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data, opts) => this.com.atproto.moderation.createReport(data, opts)
        });
        //#endregion
        //#region "app.bsky" lexicon short hand methods
        Object.defineProperty(this, "getTimeline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getTimeline(params, opts)
        });
        Object.defineProperty(this, "getAuthorFeed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getAuthorFeed(params, opts)
        });
        Object.defineProperty(this, "getActorLikes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getActorLikes(params, opts)
        });
        Object.defineProperty(this, "getPostThread", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getPostThread(params, opts)
        });
        Object.defineProperty(this, "getPost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params) => this.app.bsky.feed.post.get(params)
        });
        Object.defineProperty(this, "getPosts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getPosts(params, opts)
        });
        Object.defineProperty(this, "getLikes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getLikes(params, opts)
        });
        Object.defineProperty(this, "getRepostedBy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.feed.getRepostedBy(params, opts)
        });
        Object.defineProperty(this, "getFollows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.graph.getFollows(params, opts)
        });
        Object.defineProperty(this, "getFollowers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.graph.getFollowers(params, opts)
        });
        Object.defineProperty(this, "getProfile", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.actor.getProfile(params, opts)
        });
        Object.defineProperty(this, "getProfiles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.actor.getProfiles(params, opts)
        });
        Object.defineProperty(this, "getSuggestions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.actor.getSuggestions(params, opts)
        });
        Object.defineProperty(this, "searchActors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.actor.searchActors(params, opts)
        });
        Object.defineProperty(this, "searchActorsTypeahead", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.actor.searchActorsTypeahead(params, opts)
        });
        Object.defineProperty(this, "listNotifications", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.notification.listNotifications(params, opts)
        });
        Object.defineProperty(this, "countUnreadNotifications", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.notification.getUnreadCount(params, opts)
        });
        Object.defineProperty(this, "getLabelers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params, opts) => this.app.bsky.labeler.getServices(params, opts)
        });
        //- Private methods
        _Agent_prefsLock.set(this, new await_lock_1.default()
        /**
         * This function updates the preferences of a user and allows for a callback function to be executed
         * before the update.
         * @param cb - cb is a callback function that takes in a single parameter of type
         * AppBskyActorDefs.Preferences and returns either a boolean or void. This callback function is used to
         * update the preferences of the user. The function is called with the current preferences as an
         * argument and if the callback returns false, the preferences are not updated.
         */
        );
        this.sessionManager = sessionManager;
    }
    //#region Cloning utilities
    clone() {
        return this.copyInto(new Agent(this.sessionManager));
    }
    copyInto(inst) {
        inst.configureLabelers(this.labelers);
        inst.configureProxy(this.proxy ?? null);
        inst.clearHeaders();
        for (const [key, value] of this.headers)
            inst.setHeader(key, value);
        return inst;
    }
    withProxy(serviceType, did) {
        const inst = this.clone();
        inst.configureProxy(`${(0, util_1.asDid)(did)}#${serviceType}`);
        return inst;
    }
    //#endregion
    //#region ATPROTO labelers configuration utilities
    /**
     * The labelers statically configured on the class of the current instance.
     */
    get appLabelers() {
        return this.constructor.appLabelers;
    }
    configureLabelers(labelerDids) {
        this.labelers = labelerDids.map(util_1.asDid); // Validate & copy
    }
    /** @deprecated use {@link configureLabelers} instead */
    configureLabelersHeader(labelerDids) {
        // Filtering non-did values for backwards compatibility
        this.configureLabelers(labelerDids.filter(util_1.isDid));
    }
    configureProxy(value) {
        if (value === null)
            this.proxy = undefined;
        else if ((0, util_1.isDid)(value))
            this.proxy = value;
        else
            throw new TypeError('Invalid proxy DID');
    }
    /** @deprecated use {@link configureProxy} instead */
    configureProxyHeader(serviceType, did) {
        // Ignoring non-did values for backwards compatibility
        if ((0, util_1.isDid)(did))
            this.configureProxy(`${did}#${serviceType}`);
    }
    //#endregion
    //#region Session management
    /**
     * Get the authenticated user's DID, if any.
     */
    get did() {
        return this.sessionManager.did;
    }
    /** @deprecated Use {@link Agent.assertDid} instead */
    get accountDid() {
        return this.assertDid;
    }
    /**
     * Get the authenticated user's DID, or throw an error if not authenticated.
     */
    get assertDid() {
        this.assertAuthenticated();
        return this.did;
    }
    /**
     * Assert that the user is authenticated.
     */
    assertAuthenticated() {
        if (!this.did)
            throw new Error('Not logged in');
    }
    //#endregion
    /** @deprecated use "this" instead */
    get api() {
        return this;
    }
    async getLabelDefinitions(prefs) {
        // collect the labeler dids
        const dids = [...this.appLabelers];
        if (isBskyPrefs(prefs)) {
            dids.push(...prefs.moderationPrefs.labelers.map((l) => l.did));
        }
        else if (isModPrefs(prefs)) {
            dids.push(...prefs.labelers.map((l) => l.did));
        }
        else {
            dids.push(...prefs);
        }
        // fetch their definitions
        const labelers = await this.getLabelers({
            dids,
            detailed: true,
        });
        // assemble a map of labeler dids to the interpreted label value definitions
        const labelDefs = {};
        if (labelers.data) {
            for (const labeler of labelers.data
                .views) {
                labelDefs[labeler.creator.did] = (0, moderation_1.interpretLabelValueDefinitions)(labeler);
            }
        }
        return labelDefs;
    }
    async post(record) {
        record.createdAt || (record.createdAt = new Date().toISOString());
        return this.app.bsky.feed.post.create({ repo: this.accountDid }, record);
    }
    async deletePost(postUri) {
        this.assertAuthenticated();
        const postUrip = new syntax_1.AtUri(postUri);
        return this.app.bsky.feed.post.delete({
            repo: postUrip.hostname,
            rkey: postUrip.rkey,
        });
    }
    async like(uri, cid) {
        return this.app.bsky.feed.like.create({ repo: this.accountDid }, {
            subject: { uri, cid },
            createdAt: new Date().toISOString(),
        });
    }
    async deleteLike(likeUri) {
        this.assertAuthenticated();
        const likeUrip = new syntax_1.AtUri(likeUri);
        return this.app.bsky.feed.like.delete({
            repo: likeUrip.hostname,
            rkey: likeUrip.rkey,
        });
    }
    async repost(uri, cid) {
        return this.app.bsky.feed.repost.create({ repo: this.accountDid }, {
            subject: { uri, cid },
            createdAt: new Date().toISOString(),
        });
    }
    async deleteRepost(repostUri) {
        this.assertAuthenticated();
        const repostUrip = new syntax_1.AtUri(repostUri);
        return this.app.bsky.feed.repost.delete({
            repo: repostUrip.hostname,
            rkey: repostUrip.rkey,
        });
    }
    async follow(subjectDid) {
        return this.app.bsky.graph.follow.create({ repo: this.accountDid }, {
            subject: subjectDid,
            createdAt: new Date().toISOString(),
        });
    }
    async deleteFollow(followUri) {
        this.assertAuthenticated();
        const followUrip = new syntax_1.AtUri(followUri);
        return this.app.bsky.graph.follow.delete({
            repo: followUrip.hostname,
            rkey: followUrip.rkey,
        });
    }
    /**
     * @note: Using this method will reset the whole profile record if it
     * previously contained invalid values (wrt to the profile lexicon).
     */
    async upsertProfile(updateFn) {
        const upsert = async () => {
            const repo = this.assertDid;
            const collection = 'app.bsky.actor.profile';
            const existing = await this.com.atproto.repo
                .getRecord({ repo, collection, rkey: 'self' })
                .catch((_) => undefined);
            const existingRecord = existing && predicate.isValidProfile(existing.data.value)
                ? existing.data.value
                : undefined;
            // run the update
            const updated = await updateFn(existingRecord);
            // validate the value returned by the update function
            const validation = index_1.AppBskyActorProfile.validateRecord({
                $type: collection,
                ...updated,
            });
            if (!validation.success) {
                throw validation.error;
            }
            await this.com.atproto.repo.putRecord({
                repo,
                collection,
                rkey: 'self',
                record: validation.value,
                swapRecord: existing?.data.cid || null,
            });
        };
        return (0, common_web_1.retry)(upsert, {
            maxRetries: 5,
            retryable: (e) => e instanceof index_1.ComAtprotoRepoPutRecord.InvalidSwapError,
        });
    }
    async mute(actor) {
        return this.app.bsky.graph.muteActor({ actor });
    }
    async unmute(actor) {
        return this.app.bsky.graph.unmuteActor({ actor });
    }
    async muteModList(uri) {
        return this.app.bsky.graph.muteActorList({ list: uri });
    }
    async unmuteModList(uri) {
        return this.app.bsky.graph.unmuteActorList({ list: uri });
    }
    async blockModList(uri) {
        return this.app.bsky.graph.listblock.create({ repo: this.accountDid }, {
            subject: uri,
            createdAt: new Date().toISOString(),
        });
    }
    async unblockModList(uri) {
        const repo = this.accountDid;
        const listInfo = await this.app.bsky.graph.getList({
            list: uri,
            limit: 1,
        });
        const blocked = listInfo.data.list.viewer?.blocked;
        if (blocked) {
            const { rkey } = new syntax_1.AtUri(blocked);
            return this.app.bsky.graph.listblock.delete({
                repo,
                rkey,
            });
        }
    }
    async updateSeenNotifications(seenAt = new Date().toISOString()) {
        return this.app.bsky.notification.updateSeen({ seenAt });
    }
    async getPreferences() {
        const prefs = {
            feeds: {
                saved: undefined,
                pinned: undefined,
            },
            // @ts-ignore populating below
            savedFeeds: undefined,
            feedViewPrefs: {
                home: {
                    ...FEED_VIEW_PREF_DEFAULTS,
                },
            },
            threadViewPrefs: { ...THREAD_VIEW_PREF_DEFAULTS },
            moderationPrefs: {
                adultContentEnabled: false,
                labels: { ...labels_1.DEFAULT_LABEL_SETTINGS },
                labelers: this.appLabelers.map((did) => ({
                    did,
                    labels: {},
                })),
                mutedWords: [],
                hiddenPosts: [],
            },
            birthDate: undefined,
            interests: {
                tags: [],
            },
            bskyAppState: {
                queuedNudges: [],
                activeProgressGuide: undefined,
                nuxs: [],
            },
            postInteractionSettings: {
                threadgateAllowRules: undefined,
                postgateEmbeddingRules: undefined,
            },
        };
        const res = await this.app.bsky.actor.getPreferences({});
        const labelPrefs = [];
        for (const pref of res.data.preferences) {
            if (predicate.isValidAdultContentPref(pref)) {
                // adult content preferences
                prefs.moderationPrefs.adultContentEnabled = pref.enabled;
            }
            else if (predicate.isValidContentLabelPref(pref)) {
                // content label preference
                const adjustedPref = adjustLegacyContentLabelPref(pref);
                labelPrefs.push(adjustedPref);
            }
            else if (predicate.isValidLabelersPref(pref)) {
                // labelers preferences
                prefs.moderationPrefs.labelers = this.appLabelers
                    .map((did) => ({ did, labels: {} }))
                    .concat(pref.labelers.map((labeler) => ({
                    ...labeler,
                    labels: {},
                })));
            }
            else if (predicate.isValidSavedFeedsPrefV2(pref)) {
                prefs.savedFeeds = pref.items;
            }
            else if (predicate.isValidSavedFeedsPref(pref)) {
                // saved and pinned feeds
                prefs.feeds.saved = pref.saved;
                prefs.feeds.pinned = pref.pinned;
            }
            else if (predicate.isValidPersonalDetailsPref(pref)) {
                // birth date (irl)
                if (pref.birthDate) {
                    prefs.birthDate = new Date(pref.birthDate);
                }
            }
            else if (predicate.isValidFeedViewPref(pref)) {
                // feed view preferences
                const { $type: _, feed, ...v } = pref;
                prefs.feedViewPrefs[feed] = { ...FEED_VIEW_PREF_DEFAULTS, ...v };
            }
            else if (predicate.isValidThreadViewPref(pref)) {
                // thread view preferences
                const { $type: _, ...v } = pref;
                prefs.threadViewPrefs = { ...prefs.threadViewPrefs, ...v };
            }
            else if (predicate.isValidInterestsPref(pref)) {
                const { $type: _, ...v } = pref;
                prefs.interests = { ...prefs.interests, ...v };
            }
            else if (predicate.isValidMutedWordsPref(pref)) {
                prefs.moderationPrefs.mutedWords = pref.items;
                if (prefs.moderationPrefs.mutedWords.length) {
                    prefs.moderationPrefs.mutedWords =
                        prefs.moderationPrefs.mutedWords.map((word) => {
                            word.actorTarget = word.actorTarget || 'all';
                            return word;
                        });
                }
            }
            else if (predicate.isValidHiddenPostsPref(pref)) {
                prefs.moderationPrefs.hiddenPosts = pref.items;
            }
            else if (predicate.isValidBskyAppStatePref(pref)) {
                prefs.bskyAppState.queuedNudges = pref.queuedNudges || [];
                prefs.bskyAppState.activeProgressGuide = pref.activeProgressGuide;
                prefs.bskyAppState.nuxs = pref.nuxs || [];
            }
            else if (predicate.isValidPostInteractionSettingsPref(pref)) {
                prefs.postInteractionSettings.threadgateAllowRules =
                    pref.threadgateAllowRules;
                prefs.postInteractionSettings.postgateEmbeddingRules =
                    pref.postgateEmbeddingRules;
            }
        }
        /*
         * If `prefs.savedFeeds` is undefined, no `savedFeedsPrefV2` exists, which
         * means we want to try to migrate if needed.
         *
         * If v1 prefs exist, they will be migrated to v2.
         *
         * If no v1 prefs exist, the user is either new, or could be old and has
         * never edited their feeds.
         */
        if (prefs.savedFeeds == null) {
            const { saved, pinned } = prefs.feeds;
            if (saved && pinned) {
                const uniqueMigratedSavedFeeds = new Map();
                // insert Following feed first
                uniqueMigratedSavedFeeds.set('timeline', {
                    id: common_web_1.TID.nextStr(),
                    type: 'timeline',
                    value: 'following',
                    pinned: true,
                });
                // use pinned as source of truth for feed order
                for (const uri of pinned) {
                    const type = (0, util_1.getSavedFeedType)(uri);
                    // only want supported types
                    if (type === 'unknown')
                        continue;
                    uniqueMigratedSavedFeeds.set(uri, {
                        id: common_web_1.TID.nextStr(),
                        type,
                        value: uri,
                        pinned: true,
                    });
                }
                for (const uri of saved) {
                    if (!uniqueMigratedSavedFeeds.has(uri)) {
                        const type = (0, util_1.getSavedFeedType)(uri);
                        // only want supported types
                        if (type === 'unknown')
                            continue;
                        uniqueMigratedSavedFeeds.set(uri, {
                            id: common_web_1.TID.nextStr(),
                            type,
                            value: uri,
                            pinned: false,
                        });
                    }
                }
                prefs.savedFeeds = Array.from(uniqueMigratedSavedFeeds.values());
            }
            else {
                prefs.savedFeeds = [
                    {
                        id: common_web_1.TID.nextStr(),
                        type: 'timeline',
                        value: 'following',
                        pinned: true,
                    },
                ];
            }
            // save to user preferences so this migration doesn't re-occur
            await this.overwriteSavedFeeds(prefs.savedFeeds);
        }
        // apply the label prefs
        for (const pref of labelPrefs) {
            if (pref.labelerDid) {
                const labeler = prefs.moderationPrefs.labelers.find((labeler) => labeler.did === pref.labelerDid);
                if (!labeler)
                    continue;
                labeler.labels[pref.label] = pref.visibility;
            }
            else {
                prefs.moderationPrefs.labels[pref.label] =
                    pref.visibility;
            }
        }
        prefs.moderationPrefs.labels = remapLegacyLabels(prefs.moderationPrefs.labels);
        // automatically configure the client
        this.configureLabelers(prefsArrayToLabelerDids(res.data.preferences));
        return prefs;
    }
    async overwriteSavedFeeds(savedFeeds) {
        savedFeeds.forEach(util_1.validateSavedFeed);
        const uniqueSavedFeeds = new Map();
        savedFeeds.forEach((feed) => {
            // remove and re-insert to preserve order
            if (uniqueSavedFeeds.has(feed.id)) {
                uniqueSavedFeeds.delete(feed.id);
            }
            uniqueSavedFeeds.set(feed.id, feed);
        });
        return this.updateSavedFeedsV2Preferences(() => Array.from(uniqueSavedFeeds.values()));
    }
    async updateSavedFeeds(savedFeedsToUpdate) {
        savedFeedsToUpdate.map(util_1.validateSavedFeed);
        return this.updateSavedFeedsV2Preferences((savedFeeds) => {
            return savedFeeds.map((savedFeed) => {
                const updatedVersion = savedFeedsToUpdate.find((updated) => savedFeed.id === updated.id);
                if (updatedVersion) {
                    return {
                        ...savedFeed,
                        // only update pinned
                        pinned: updatedVersion.pinned,
                    };
                }
                return savedFeed;
            });
        });
    }
    async addSavedFeeds(savedFeeds) {
        const toSave = savedFeeds.map((f) => ({
            ...f,
            id: common_web_1.TID.nextStr(),
        }));
        toSave.forEach(util_1.validateSavedFeed);
        return this.updateSavedFeedsV2Preferences((savedFeeds) => [
            ...savedFeeds,
            ...toSave,
        ]);
    }
    async removeSavedFeeds(ids) {
        return this.updateSavedFeedsV2Preferences((savedFeeds) => [
            ...savedFeeds.filter((feed) => !ids.find((id) => feed.id === id)),
        ]);
    }
    /**
     * @deprecated use `overwriteSavedFeeds`
     */
    async setSavedFeeds(saved, pinned) {
        return this.updateFeedPreferences(() => ({
            saved,
            pinned,
        }));
    }
    /**
     * @deprecated use `addSavedFeeds`
     */
    async addSavedFeed(v) {
        return this.updateFeedPreferences((saved, pinned) => ({
            saved: [...saved.filter((uri) => uri !== v), v],
            pinned,
        }));
    }
    /**
     * @deprecated use `removeSavedFeeds`
     */
    async removeSavedFeed(v) {
        return this.updateFeedPreferences((saved, pinned) => ({
            saved: saved.filter((uri) => uri !== v),
            pinned: pinned.filter((uri) => uri !== v),
        }));
    }
    /**
     * @deprecated use `addSavedFeeds` or `updateSavedFeeds`
     */
    async addPinnedFeed(v) {
        return this.updateFeedPreferences((saved, pinned) => ({
            saved: [...saved.filter((uri) => uri !== v), v],
            pinned: [...pinned.filter((uri) => uri !== v), v],
        }));
    }
    /**
     * @deprecated use `updateSavedFeeds` or `removeSavedFeeds`
     */
    async removePinnedFeed(v) {
        return this.updateFeedPreferences((saved, pinned) => ({
            saved,
            pinned: pinned.filter((uri) => uri !== v),
        }));
    }
    async setAdultContentEnabled(v) {
        await this.updatePreferences((prefs) => {
            const adultContentPref = prefs.findLast(predicate.isValidAdultContentPref) || {
                $type: 'app.bsky.actor.defs#adultContentPref',
                enabled: v,
            };
            adultContentPref.enabled = v;
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isAdultContentPref(pref))
                .concat(adultContentPref);
        });
    }
    async setContentLabelPref(key, value, labelerDid) {
        if (labelerDid) {
            (0, syntax_1.ensureValidDid)(labelerDid);
        }
        await this.updatePreferences((prefs) => {
            const labelPref = prefs
                .filter(predicate.isValidContentLabelPref)
                .findLast((pref) => pref.label === key && pref.labelerDid === labelerDid) || {
                $type: 'app.bsky.actor.defs#contentLabelPref',
                label: key,
                labelerDid,
                visibility: value,
            };
            labelPref.visibility = value;
            let legacyLabelPref;
            if (index_1.AppBskyActorDefs.isContentLabelPref(labelPref)) {
                // is global
                if (!labelPref.labelerDid) {
                    const legacyLabelValue = {
                        'graphic-media': 'gore',
                        porn: 'nsfw',
                        sexual: 'suggestive',
                        // Protect against using toString, hasOwnProperty, etc. as a label:
                        __proto__: null,
                    }[labelPref.label];
                    // if it's a legacy label, double-write the legacy label
                    if (legacyLabelValue) {
                        legacyLabelPref = prefs
                            .filter(predicate.isValidContentLabelPref)
                            .findLast((pref) => pref.label === legacyLabelValue &&
                            pref.labelerDid === undefined) || {
                            $type: 'app.bsky.actor.defs#contentLabelPref',
                            label: legacyLabelValue,
                            labelerDid: undefined,
                            visibility: value,
                        };
                        legacyLabelPref.visibility = value;
                    }
                }
            }
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isContentLabelPref(pref) ||
                !(pref.label === key && pref.labelerDid === labelerDid))
                .concat(labelPref)
                .filter((pref) => {
                if (!legacyLabelPref)
                    return true;
                return (!index_1.AppBskyActorDefs.isContentLabelPref(pref) ||
                    !(pref.label === legacyLabelPref.label &&
                        pref.labelerDid === undefined));
            })
                .concat(legacyLabelPref ? [legacyLabelPref] : []);
        });
    }
    async addLabeler(did) {
        const prefs = await this.updatePreferences((prefs) => {
            const labelersPref = prefs.findLast(predicate.isValidLabelersPref) || {
                $type: 'app.bsky.actor.defs#labelersPref',
                labelers: [],
            };
            if (!labelersPref.labelers.some((labeler) => labeler.did === did)) {
                labelersPref.labelers.push({ did });
            }
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isLabelersPref(pref))
                .concat(labelersPref);
        });
        // automatically configure the client
        this.configureLabelers(prefsArrayToLabelerDids(prefs));
    }
    async removeLabeler(did) {
        const prefs = await this.updatePreferences((prefs) => {
            const labelersPref = prefs.findLast(predicate.isValidLabelersPref) || {
                $type: 'app.bsky.actor.defs#labelersPref',
                labelers: [],
            };
            labelersPref.labelers = labelersPref.labelers.filter((l) => l.did !== did);
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isLabelersPref(pref))
                .concat(labelersPref);
        });
        // automatically configure the client
        this.configureLabelers(prefsArrayToLabelerDids(prefs));
    }
    async setPersonalDetails({ birthDate, }) {
        await this.updatePreferences((prefs) => {
            const personalDetailsPref = prefs.findLast(predicate.isValidPersonalDetailsPref) || {
                $type: 'app.bsky.actor.defs#personalDetailsPref',
            };
            personalDetailsPref.birthDate =
                birthDate instanceof Date ? birthDate.toISOString() : birthDate;
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isPersonalDetailsPref(pref))
                .concat(personalDetailsPref);
        });
    }
    async setFeedViewPrefs(feed, pref) {
        await this.updatePreferences((prefs) => {
            const existing = prefs
                .filter(predicate.isValidFeedViewPref)
                .findLast((pref) => pref.feed === feed);
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isFeedViewPref(p) || p.feed !== feed)
                .concat({
                ...existing,
                ...pref,
                $type: 'app.bsky.actor.defs#feedViewPref',
                feed,
            });
        });
    }
    async setThreadViewPrefs(pref) {
        await this.updatePreferences((prefs) => {
            const existing = prefs.findLast(predicate.isValidThreadViewPref);
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isThreadViewPref(p))
                .concat({
                ...existing,
                ...pref,
                $type: 'app.bsky.actor.defs#threadViewPref',
            });
        });
    }
    async setInterestsPref(pref) {
        await this.updatePreferences((prefs) => {
            const existing = prefs.findLast(predicate.isValidInterestsPref);
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isInterestsPref(p))
                .concat({
                ...existing,
                ...pref,
                $type: 'app.bsky.actor.defs#interestsPref',
            });
        });
    }
    /**
     * Add a muted word to user preferences.
     */
    async addMutedWord(mutedWord) {
        const sanitizedValue = (0, util_1.sanitizeMutedWordValue)(mutedWord.value);
        if (!sanitizedValue)
            return;
        await this.updatePreferences((prefs) => {
            let mutedWordsPref = prefs.findLast(predicate.isValidMutedWordsPref);
            const newMutedWord = {
                id: common_web_1.TID.nextStr(),
                value: sanitizedValue,
                targets: mutedWord.targets || [],
                actorTarget: mutedWord.actorTarget || 'all',
                expiresAt: mutedWord.expiresAt || undefined,
            };
            if (mutedWordsPref) {
                mutedWordsPref.items.push(newMutedWord);
                /**
                 * Migrate any old muted words that don't have an id
                 */
                mutedWordsPref.items = migrateLegacyMutedWordsItems(mutedWordsPref.items);
            }
            else {
                // if the pref doesn't exist, create it
                mutedWordsPref = {
                    $type: 'app.bsky.actor.defs#mutedWordsPref',
                    items: [newMutedWord],
                };
            }
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isMutedWordsPref(p))
                .concat(mutedWordsPref);
        });
    }
    /**
     * Convenience method to add muted words to user preferences
     */
    async addMutedWords(newMutedWords) {
        await Promise.all(newMutedWords.map((word) => this.addMutedWord(word)));
    }
    /**
     * @deprecated use `addMutedWords` or `addMutedWord` instead
     */
    async upsertMutedWords(mutedWords) {
        await this.addMutedWords(mutedWords);
    }
    /**
     * Update a muted word in user preferences.
     */
    async updateMutedWord(mutedWord) {
        await this.updatePreferences((prefs) => {
            const mutedWordsPref = prefs.findLast(predicate.isValidMutedWordsPref);
            if (mutedWordsPref) {
                mutedWordsPref.items = mutedWordsPref.items.map((existingItem) => {
                    const match = matchMutedWord(existingItem, mutedWord);
                    if (match) {
                        const updated = {
                            ...existingItem,
                            ...mutedWord,
                        };
                        return {
                            id: existingItem.id || common_web_1.TID.nextStr(),
                            value: (0, util_1.sanitizeMutedWordValue)(updated.value) || existingItem.value,
                            targets: updated.targets || [],
                            actorTarget: updated.actorTarget || 'all',
                            expiresAt: updated.expiresAt || undefined,
                        };
                    }
                    else {
                        return existingItem;
                    }
                });
                /**
                 * Migrate any old muted words that don't have an id
                 */
                mutedWordsPref.items = migrateLegacyMutedWordsItems(mutedWordsPref.items);
                return prefs
                    .filter((p) => !index_1.AppBskyActorDefs.isMutedWordsPref(p))
                    .concat(mutedWordsPref);
            }
            return prefs;
        });
    }
    /**
     * Remove a muted word from user preferences.
     */
    async removeMutedWord(mutedWord) {
        await this.updatePreferences((prefs) => {
            const mutedWordsPref = prefs.findLast(predicate.isValidMutedWordsPref);
            if (mutedWordsPref) {
                for (let i = 0; i < mutedWordsPref.items.length; i++) {
                    const match = matchMutedWord(mutedWordsPref.items[i], mutedWord);
                    if (match) {
                        mutedWordsPref.items.splice(i, 1);
                        break;
                    }
                }
                /**
                 * Migrate any old muted words that don't have an id
                 */
                mutedWordsPref.items = migrateLegacyMutedWordsItems(mutedWordsPref.items);
                return prefs
                    .filter((p) => !index_1.AppBskyActorDefs.isMutedWordsPref(p))
                    .concat(mutedWordsPref);
            }
            return prefs;
        });
    }
    /**
     * Convenience method to remove muted words from user preferences
     */
    async removeMutedWords(mutedWords) {
        await Promise.all(mutedWords.map((word) => this.removeMutedWord(word)));
    }
    async hidePost(postUri) {
        await this.updateHiddenPost(postUri, 'hide');
    }
    async unhidePost(postUri) {
        await this.updateHiddenPost(postUri, 'unhide');
    }
    async bskyAppQueueNudges(nudges) {
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidBskyAppStatePref) || {
                $type: 'app.bsky.actor.defs#bskyAppStatePref',
            };
            pref.queuedNudges = (pref.queuedNudges || []).concat(nudges);
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isBskyAppStatePref(p))
                .concat(pref);
        });
    }
    async bskyAppDismissNudges(nudges) {
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidBskyAppStatePref) || {
                $type: 'app.bsky.actor.defs#bskyAppStatePref',
            };
            nudges = Array.isArray(nudges) ? nudges : [nudges];
            pref.queuedNudges = (pref.queuedNudges || []).filter((nudge) => !nudges.includes(nudge));
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isBskyAppStatePref(p))
                .concat(pref);
        });
    }
    async bskyAppSetActiveProgressGuide(guide) {
        if (guide) {
            const result = index_1.AppBskyActorDefs.validateBskyAppProgressGuide(guide);
            if (!result.success)
                throw result.error;
        }
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidBskyAppStatePref) || {
                $type: 'app.bsky.actor.defs#bskyAppStatePref',
            };
            pref.activeProgressGuide = guide;
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isBskyAppStatePref(p))
                .concat(pref);
        });
    }
    /**
     * Insert or update a NUX in user prefs
     */
    async bskyAppUpsertNux(nux) {
        (0, util_1.validateNux)(nux);
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidBskyAppStatePref) || {
                $type: 'app.bsky.actor.defs#bskyAppStatePref',
            };
            pref.nuxs = pref.nuxs || [];
            const existing = pref.nuxs?.find((n) => {
                return n.id === nux.id;
            });
            let next;
            if (existing) {
                next = {
                    id: existing.id,
                    completed: nux.completed,
                    data: nux.data,
                    expiresAt: nux.expiresAt,
                };
            }
            else {
                next = nux;
            }
            // remove duplicates and append
            pref.nuxs = pref.nuxs.filter((n) => n.id !== nux.id).concat(next);
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isBskyAppStatePref(p))
                .concat(pref);
        });
    }
    /**
     * Removes NUXs from user preferences.
     */
    async bskyAppRemoveNuxs(ids) {
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidBskyAppStatePref) || {
                $type: 'app.bsky.actor.defs#bskyAppStatePref',
            };
            pref.nuxs = (pref.nuxs || []).filter((nux) => !ids.includes(nux.id));
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isBskyAppStatePref(p))
                .concat(pref);
        });
    }
    async setPostInteractionSettings(settings) {
        const result = index_1.AppBskyActorDefs.validatePostInteractionSettingsPref(settings);
        // Fool-proofing (should not be needed because of type safety)
        if (!result.success)
            throw result.error;
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidPostInteractionSettingsPref) || {
                $type: 'app.bsky.actor.defs#postInteractionSettingsPref',
            };
            /**
             * Matches handling of `threadgate.allow` where `undefined` means "everyone"
             */
            pref.threadgateAllowRules = settings.threadgateAllowRules;
            pref.postgateEmbeddingRules = settings.postgateEmbeddingRules;
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isPostInteractionSettingsPref(p))
                .concat(pref);
        });
    }
    /**
     * This function updates the preferences of a user and allows for a callback function to be executed
     * before the update.
     * @param cb - cb is a callback function that takes in a single parameter of type
     * AppBskyActorDefs.Preferences and returns either a boolean or void. This callback function is used to
     * update the preferences of the user. The function is called with the current preferences as an
     * argument and if the callback returns false, the preferences are not updated.
     */
    async updatePreferences(cb) {
        try {
            await __classPrivateFieldGet(this, _Agent_prefsLock, "f").acquireAsync();
            const res = await this.app.bsky.actor.getPreferences({});
            const newPrefs = cb(res.data.preferences);
            if (newPrefs === false) {
                return res.data.preferences;
            }
            await this.app.bsky.actor.putPreferences({
                preferences: newPrefs,
            });
            return newPrefs;
        }
        finally {
            __classPrivateFieldGet(this, _Agent_prefsLock, "f").release();
        }
    }
    async updateHiddenPost(postUri, action) {
        await this.updatePreferences((prefs) => {
            const pref = prefs.findLast(predicate.isValidHiddenPostsPref) || {
                $type: 'app.bsky.actor.defs#hiddenPostsPref',
                items: [],
            };
            const hiddenItems = new Set(pref.items);
            if (action === 'hide')
                hiddenItems.add(postUri);
            else
                hiddenItems.delete(postUri);
            pref.items = [...hiddenItems];
            return prefs
                .filter((p) => !index_1.AppBskyActorDefs.isHiddenPostsPref(p))
                .concat(pref);
        });
    }
    /**
     * A helper specifically for updating feed preferences
     */
    async updateFeedPreferences(cb) {
        let res;
        await this.updatePreferences((prefs) => {
            const feedsPref = prefs.findLast(predicate.isValidSavedFeedsPref) || {
                $type: 'app.bsky.actor.defs#savedFeedsPref',
                saved: [],
                pinned: [],
            };
            res = cb(feedsPref.saved, feedsPref.pinned);
            feedsPref.saved = res.saved;
            feedsPref.pinned = res.pinned;
            return prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isSavedFeedsPref(pref))
                .concat(feedsPref);
        });
        return res;
    }
    async updateSavedFeedsV2Preferences(cb) {
        let maybeMutatedSavedFeeds = [];
        await this.updatePreferences((prefs) => {
            const existingV2Pref = prefs.findLast(predicate.isValidSavedFeedsPrefV2) || {
                $type: 'app.bsky.actor.defs#savedFeedsPrefV2',
                items: [],
            };
            const newSavedFeeds = cb(existingV2Pref.items);
            // enforce ordering: pinned first, then saved
            existingV2Pref.items = [...newSavedFeeds].sort((a, b) => 
            // @NOTE: preserve order of items with the same pinned status
            a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
            // Store the return value
            maybeMutatedSavedFeeds = newSavedFeeds;
            let updatedPrefs = prefs
                .filter((pref) => !index_1.AppBskyActorDefs.isSavedFeedsPrefV2(pref))
                .concat(existingV2Pref);
            /*
             * If there's a v2 pref present, it means this account was migrated from v1
             * to v2. During the transition period, we double write v2 prefs back to
             * v1, but NOT the other way around.
             */
            let existingV1Pref = prefs.findLast(predicate.isValidSavedFeedsPref);
            if (existingV1Pref) {
                const { saved, pinned } = existingV1Pref;
                const v2Compat = (0, util_1.savedFeedsToUriArrays)(
                // v1 only supports feeds and lists
                existingV2Pref.items.filter((i) => ['feed', 'list'].includes(i.type)));
                existingV1Pref = {
                    ...existingV1Pref,
                    saved: Array.from(new Set([...saved, ...v2Compat.saved])),
                    pinned: Array.from(new Set([...pinned, ...v2Compat.pinned])),
                };
                updatedPrefs = updatedPrefs
                    .filter((pref) => !index_1.AppBskyActorDefs.isSavedFeedsPref(pref))
                    .concat(existingV1Pref);
            }
            return updatedPrefs;
        });
        return maybeMutatedSavedFeeds;
    }
}
exports.Agent = Agent;
_Agent_prefsLock = new WeakMap();
//#region Static configuration
/**
 * The labelers to be used across all requests with the takedown capability
 */
Object.defineProperty(Agent, "appLabelers", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [const_1.BSKY_LABELER_DID]
});
/**
 * Helper to transform the legacy content preferences.
 */
function adjustLegacyContentLabelPref(pref) {
    let visibility = pref.visibility;
    // adjust legacy values
    if (visibility === 'show') {
        visibility = 'ignore';
    }
    return { ...pref, visibility };
}
/**
 * Re-maps legacy labels to new labels on READ. Does not save these changes to
 * the user's preferences.
 */
function remapLegacyLabels(labels) {
    const _labels = { ...labels };
    const legacyToNewMap = {
        gore: 'graphic-media',
        nsfw: 'porn',
        suggestive: 'sexual',
    };
    for (const labelName in _labels) {
        const newLabelName = legacyToNewMap[labelName];
        if (newLabelName) {
            _labels[newLabelName] = _labels[labelName];
        }
    }
    return _labels;
}
/**
 * A helper to get the currently enabled labelers from the full preferences array
 */
function prefsArrayToLabelerDids(prefs) {
    const labelersPref = prefs.findLast(predicate.isValidLabelersPref);
    let dids = [];
    if (labelersPref) {
        dids = labelersPref.labelers.map((labeler) => labeler.did);
    }
    return dids;
}
function isBskyPrefs(v) {
    return (v &&
        typeof v === 'object' &&
        'moderationPrefs' in v &&
        isModPrefs(v.moderationPrefs));
}
function isModPrefs(v) {
    return v && typeof v === 'object' && 'labelers' in v;
}
function migrateLegacyMutedWordsItems(items) {
    return items.map((item) => ({
        ...item,
        id: item.id || common_web_1.TID.nextStr(),
    }));
}
function matchMutedWord(existingWord, newWord) {
    // id is undefined in legacy implementation
    const existingId = existingWord.id;
    // prefer matching based on id
    const matchById = existingId && existingId === newWord.id;
    // handle legacy case where id is not set
    const legacyMatchByValue = !existingId && existingWord.value === newWord.value;
    return matchById || legacyMatchByValue;
}
//# sourceMappingURL=agent.js.map