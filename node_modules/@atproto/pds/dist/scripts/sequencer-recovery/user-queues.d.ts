import PQueue from 'p-queue';
export declare class UserQueues {
    main: PQueue;
    queues: Map<string, PQueue<import("p-queue/dist/priority-queue").default, import("p-queue").DefaultAddOptions>>;
    constructor(concurrency: number);
    addToUser(did: string, task: () => Promise<void>): Promise<void>;
    private getQueue;
    onEmpty(): Promise<void>;
    processAll(): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=user-queues.d.ts.map