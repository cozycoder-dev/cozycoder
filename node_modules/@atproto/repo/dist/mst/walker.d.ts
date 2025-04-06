import { MST, NodeEntry } from './mst';
type WalkerStatusDone = {
    done: true;
};
type WalkerStatusProgress = {
    done: false;
    curr: NodeEntry;
    walking: MST | null;
    index: number;
};
type WalkerStatus = WalkerStatusDone | WalkerStatusProgress;
export declare class MstWalker {
    root: MST;
    stack: WalkerStatus[];
    status: WalkerStatus;
    constructor(root: MST);
    layer(): number;
    stepOver(): Promise<void>;
    stepInto(): Promise<void>;
    advance(): Promise<void>;
}
export {};
//# sourceMappingURL=walker.d.ts.map