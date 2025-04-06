import { AtpAgent } from '@atproto/api';
export type AppViewOptions = {
    url: string;
    did: string;
    cdnUrlPattern?: string;
};
export declare class AppView {
    did: string;
    agent: AtpAgent;
    private cdnUrlPattern?;
    constructor(options: AppViewOptions);
    getImageUrl(pattern: string, did: string, cid: string): string | undefined;
}
//# sourceMappingURL=app-view.d.ts.map