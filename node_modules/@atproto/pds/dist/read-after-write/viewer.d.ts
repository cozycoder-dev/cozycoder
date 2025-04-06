import { AccountManager } from '../account-manager/account-manager';
import { ActorStoreReader } from '../actor-store/actor-store-reader';
import { BskyAppView } from '../bsky-app-view';
import { ImageUrlBuilder } from '../image/image-url-builder';
import { ProfileView, ProfileViewBasic, ProfileViewDetailed } from '../lexicon/types/app/bsky/actor/defs';
import { Record as ProfileRecord } from '../lexicon/types/app/bsky/actor/profile';
import { Main as EmbedExternal, View as EmbedExternalView } from '../lexicon/types/app/bsky/embed/external';
import { Main as EmbedImages, View as EmbedImagesView } from '../lexicon/types/app/bsky/embed/images';
import { Main as EmbedRecord, View as EmbedRecordView } from '../lexicon/types/app/bsky/embed/record';
import { Main as EmbedRecordWithMedia } from '../lexicon/types/app/bsky/embed/recordWithMedia';
import { FeedViewPost, PostView } from '../lexicon/types/app/bsky/feed/defs';
import { Record as PostRecord } from '../lexicon/types/app/bsky/feed/post';
import { $Typed } from '../lexicon/util';
import { LocalRecords, RecordDescript } from './types';
type CommonSignedUris = 'avatar' | 'banner' | 'feed_thumbnail' | 'feed_fullsize';
export type LocalViewerCreator = (actorStoreReader: ActorStoreReader) => LocalViewer;
export declare class LocalViewer {
    readonly actorStoreReader: ActorStoreReader;
    readonly accountManager: AccountManager;
    readonly imageUrlBuilder: ImageUrlBuilder;
    readonly bskyAppView?: BskyAppView | undefined;
    constructor(actorStoreReader: ActorStoreReader, accountManager: AccountManager, imageUrlBuilder: ImageUrlBuilder, bskyAppView?: BskyAppView | undefined);
    get did(): string;
    static creator(accountManager: AccountManager, imageUrlBuilder: ImageUrlBuilder, bskyAppView?: BskyAppView): LocalViewerCreator;
    getImageUrl(pattern: CommonSignedUris, cid: string): string;
    serviceAuthHeaders(did: string, lxm: string): Promise<{
        headers: {
            authorization: string;
        };
    }>;
    getRecordsSinceRev(rev: string): Promise<LocalRecords>;
    getProfileBasic(): Promise<ProfileViewBasic | null>;
    formatAndInsertPostsInFeed(feed: FeedViewPost[], posts: RecordDescript<PostRecord>[]): Promise<FeedViewPost[]>;
    getPost(descript: RecordDescript<PostRecord>): Promise<PostView | null>;
    formatPostEmbed(did: string, post: PostRecord): Promise<$Typed<EmbedImagesView> | $Typed<EmbedExternalView> | $Typed<EmbedRecordView> | {
        $type: string;
        record: $Typed<EmbedRecordView>;
        media: Promise<$Typed<EmbedImagesView> | $Typed<EmbedExternalView>>;
    } | null>;
    formatSimpleEmbed(embed: $Typed<EmbedImages> | $Typed<EmbedExternal>): Promise<$Typed<EmbedImagesView> | $Typed<EmbedExternalView>>;
    formatRecordEmbed(embed: EmbedRecord): Promise<$Typed<EmbedRecordView>>;
    private formatRecordEmbedInternal;
    formatRecordWithMediaEmbed(did: string, embed: EmbedRecordWithMedia): Promise<{
        $type: string;
        record: $Typed<EmbedRecordView>;
        media: Promise<$Typed<EmbedImagesView> | $Typed<EmbedExternalView>>;
    } | null>;
    updateProfileViewBasic<T extends ProfileViewDetailed | ProfileViewBasic | ProfileView>(view: T, record: ProfileRecord): T;
    updateProfileView<T extends ProfileViewDetailed | ProfileViewBasic | ProfileView>(view: T, record: ProfileRecord): T;
    updateProfileDetailed<T extends ProfileViewDetailed>(view: T, record: ProfileRecord): T;
}
export {};
//# sourceMappingURL=viewer.d.ts.map