import { ImageInvalidator } from './types';
export type BunnyConfig = {
    accessKey: string;
    urlPrefix: string;
};
export declare class BunnyInvalidator implements ImageInvalidator {
    cfg: BunnyConfig;
    constructor(cfg: BunnyConfig);
    invalidate(_subject: string, paths: string[]): Promise<void>;
}
export default BunnyInvalidator;
//# sourceMappingURL=bunny.d.ts.map