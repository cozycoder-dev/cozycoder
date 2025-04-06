import { Readable } from 'node:stream';
import sharp from 'sharp';
export declare function maybeGetInfo(stream: Readable): Promise<ImageInfo | null>;
export declare function getInfo(stream: Readable): Promise<ImageInfo>;
export type Dimensions = {
    height: number;
    width: number;
};
export type ImageInfo = Dimensions & {
    size: number;
    mime: `image/${string}` | 'unknown';
};
export declare const formatsToMimes: {
    [s in keyof sharp.FormatEnum]?: `image/${string}`;
};
//# sourceMappingURL=index.d.ts.map