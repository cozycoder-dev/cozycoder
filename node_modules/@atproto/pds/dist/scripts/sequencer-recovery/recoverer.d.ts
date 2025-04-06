import { AccountManager } from '../../account-manager/account-manager';
import { ActorStore } from '../../actor-store/actor-store';
import { SeqEvt, Sequencer } from '../../sequencer';
import { RecoveryDb } from './recovery-db';
import { UserQueues } from './user-queues';
export type RecovererContextNoDb = {
    sequencer: Sequencer;
    accountManager: AccountManager;
    actorStore: ActorStore;
};
export type RecovererContext = RecovererContextNoDb & {
    recoveryDb: RecoveryDb;
};
export declare class Recoverer {
    ctx: RecovererContext;
    queues: UserQueues;
    failed: Set<string>;
    constructor(ctx: RecovererContext, opts: {
        concurrency: number;
    });
    run(startCursor?: number): Promise<void>;
    processAll(): Promise<void>;
    destroy(): Promise<void>;
    processEvent(evt: SeqEvt): void;
}
export declare const processSeqEvt: (ctx: RecovererContext, evt: SeqEvt) => Promise<void>;
//# sourceMappingURL=recoverer.d.ts.map