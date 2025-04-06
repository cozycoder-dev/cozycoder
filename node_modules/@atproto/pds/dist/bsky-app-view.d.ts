import { AtpAgent } from '@atproto/api';
export type AppViewOptions = {
    url: string;
    did: string;
    cdnUrlPattern?: string;
};
export declare class BskyAppView {
    did: string;
    url: string;
    agent: AtpAgent;
    private cdnUrlPattern?;
    constructor(options: AppViewOptions);
    getImageUrl(pattern: string, did: string, cid: string): string | undefined;
}
//# sourceMappingURL=bsky-app-view.d.ts.map