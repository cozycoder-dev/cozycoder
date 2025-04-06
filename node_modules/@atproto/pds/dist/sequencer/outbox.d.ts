import { AsyncBuffer } from '@atproto/common';
import { SeqEvt, Sequencer } from '.';
export type OutboxOpts = {
    maxBufferSize: number;
};
export declare class Outbox {
    sequencer: Sequencer;
    private caughtUp;
    lastSeen: number;
    cutoverBuffer: SeqEvt[];
    outBuffer: AsyncBuffer<SeqEvt>;
    constructor(sequencer: Sequencer, opts?: Partial<OutboxOpts>);
    events(backfillCursor?: number, signal?: AbortSignal): AsyncGenerator<SeqEvt>;
    getBackfill(backfillCursor: number): AsyncGenerator<SeqEvt, void, unknown>;
}
//# sourceMappingURL=outbox.d.ts.map