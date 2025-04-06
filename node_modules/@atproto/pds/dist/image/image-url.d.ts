import { AppView } from '../app-view';
export declare class ImageUrlBuilder {
    readonly pdsHostname: string;
    readonly appview?: AppView | undefined;
    constructor(pdsHostname: string, appview?: AppView | undefined);
    build(pattern: string, did: string, cid: string): string;
}
//# sourceMappingURL=image-url.d.ts.map