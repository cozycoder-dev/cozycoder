import { ImageInvalidator } from './types';
export declare class MultiImageInvalidator implements ImageInvalidator {
    invalidators: ImageInvalidator[];
    constructor(invalidators: ImageInvalidator[]);
    invalidate(subject: string, paths: string[]): Promise<void>;
}
//# sourceMappingURL=util.d.ts.map