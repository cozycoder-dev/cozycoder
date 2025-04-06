import * as aws from '@aws-sdk/client-cloudfront';
import { ImageInvalidator } from './types';
export type CloudfrontConfig = {
    distributionId: string;
    pathPrefix?: string;
} & Omit<aws.CloudFrontClientConfig, 'apiVersion'>;
export declare class CloudfrontInvalidator implements ImageInvalidator {
    distributionId: string;
    pathPrefix: string;
    client: aws.CloudFront;
    constructor(cfg: CloudfrontConfig);
    invalidate(subject: string, paths: string[]): Promise<void>;
}
export default CloudfrontInvalidator;
//# sourceMappingURL=cloudfront.d.ts.map