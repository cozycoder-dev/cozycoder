import PQueue from 'p-queue';
export declare class BackgroundQueue {
    queue: PQueue<import("p-queue/dist/priority-queue").default, import("p-queue").DefaultAddOptions>;
    destroyed: boolean;
    constructor();
    add(task: Task): void;
    processAll(): Promise<void>;
    destroy(): Promise<void>;
}
type Task = () => Promise<void>;
export {};
//# sourceMappingURL=background.d.ts.map