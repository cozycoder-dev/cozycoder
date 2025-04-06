import { AtpAgent } from '@atproto/api';
import { BackgroundQueue } from './background';
export declare class Crawlers {
    hostname: string;
    crawlers: string[];
    backgroundQueue: BackgroundQueue;
    agents: AtpAgent[];
    lastNotified: number;
    constructor(hostname: string, crawlers: string[], backgroundQueue: BackgroundQueue);
    notifyOfUpdate(): Promise<void>;
}
//# sourceMappingURL=crawlers.d.ts.map