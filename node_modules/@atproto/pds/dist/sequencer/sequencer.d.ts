import TypedEmitter from 'typed-emitter';
import { AccountStatus } from '../account-manager/helpers/account';
import { Crawlers } from '../crawlers';
import { CommitDataWithOps, SyncEvtData } from '../repo';
import { RepoSeqEntry, RepoSeqInsert, SequencerDb } from './db';
import { SeqEvt } from './events';
export * from './events';
declare const Sequencer_base: new () => SequencerEmitter;
export declare class Sequencer extends Sequencer_base {
    dbLocation: string;
    crawlers: Crawlers;
    lastSeen: number;
    db: SequencerDb;
    destroyed: boolean;
    pollPromise: Promise<void> | null;
    triesWithNoResults: number;
    constructor(dbLocation: string, crawlers: Crawlers, lastSeen?: number, disableWalAutoCheckpoint?: boolean);
    start(): Promise<void>;
    destroy(): Promise<void>;
    curr(): Promise<number | null>;
    next(cursor: number): Promise<SeqRow | null>;
    earliestAfterTime(time: string): Promise<SeqRow | null>;
    requestSeqRange(opts: {
        earliestSeq?: number;
        latestSeq?: number;
        earliestTime?: string;
        limit?: number;
    }): Promise<SeqEvt[]>;
    private pollDb;
    private exponentialBackoff;
    sequenceEvt(evt: RepoSeqInsert): Promise<number>;
    sequenceCommit(did: string, commitData: CommitDataWithOps): Promise<number>;
    sequenceSyncEvt(did: string, data: SyncEvtData): Promise<number>;
    sequenceIdentityEvt(did: string, handle?: string): Promise<number>;
    sequenceAccountEvt(did: string, status: AccountStatus): Promise<number>;
    deleteAllForUser(did: string, excludingSeqs?: number[]): Promise<void>;
}
export declare const parseRepoSeqRows: (rows: RepoSeqEntry[]) => SeqEvt[];
type SeqRow = RepoSeqEntry;
type SequencerEvents = {
    events: (evts: SeqEvt[]) => void;
    close: () => void;
};
export type SequencerEmitter = TypedEmitter<SequencerEvents>;
export default Sequencer;
//# sourceMappingURL=sequencer.d.ts.map