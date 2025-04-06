import { BskyAppView } from '../bsky-app-view';
export declare class ImageUrlBuilder {
    readonly pdsHostname: string;
    readonly bskyAppView?: BskyAppView | undefined;
    constructor(pdsHostname: string, bskyAppView?: BskyAppView | undefined);
    build(pattern: string, did: string, cid: string): string;
}
//# sourceMappingURL=image-url-builder.d.ts.map