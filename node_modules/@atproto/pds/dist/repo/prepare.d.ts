import { CID } from 'multiformats/cid';
import { BlobRef, LexValue, RepoRecord } from '@atproto/lexicon';
import { RecordCreateOp, RecordDeleteOp, RecordUpdateOp, RecordWriteOp } from '@atproto/repo';
import { PreparedBlobRef, PreparedCreate, PreparedDelete, PreparedUpdate, PreparedWrite, ValidationStatus } from './types';
export declare const assertValidRecordWithStatus: (record: Record<string, unknown>, opts: {
    requireLexicon: boolean;
}) => ValidationStatus;
export declare const assertValidCreatedAt: (record: Record<string, unknown>) => void;
export declare const setCollectionName: (collection: string, record: RepoRecord, validate: boolean) => RepoRecord;
export declare const prepareCreate: (opts: {
    did: string;
    collection: string;
    rkey?: string;
    swapCid?: CID | null;
    record: RepoRecord;
    validate?: boolean;
}) => Promise<PreparedCreate>;
export declare const prepareUpdate: (opts: {
    did: string;
    collection: string;
    rkey: string;
    swapCid?: CID | null;
    record: RepoRecord;
    validate?: boolean;
}) => Promise<PreparedUpdate>;
export declare const prepareDelete: (opts: {
    did: string;
    collection: string;
    rkey: string;
    swapCid?: CID | null;
}) => PreparedDelete;
export declare const createWriteToOp: (write: PreparedCreate) => RecordCreateOp;
export declare const updateWriteToOp: (write: PreparedUpdate) => RecordUpdateOp;
export declare const deleteWriteToOp: (write: PreparedDelete) => RecordDeleteOp;
export declare const writeToOp: (write: PreparedWrite) => RecordWriteOp;
type FoundBlobRef = {
    ref: BlobRef;
    path: string[];
};
export declare const blobsForWrite: (record: RepoRecord, validate: boolean) => PreparedBlobRef[];
export declare const findBlobRefs: (val: LexValue, path?: string[], layer?: number) => FoundBlobRef[];
export {};
//# sourceMappingURL=prepare.d.ts.map