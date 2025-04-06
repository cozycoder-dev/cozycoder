/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon';
export interface JobStatus {
    $type?: 'app.bsky.video.defs#jobStatus';
    jobId: string;
    did: string;
    /** The state of the video processing job. All values not listed as a known value indicate that the job is in process. */
    state: 'JOB_STATE_COMPLETED' | 'JOB_STATE_FAILED' | (string & {});
    /** Progress within the current processing state. */
    progress?: number;
    blob?: BlobRef;
    error?: string;
    message?: string;
}
export declare function isJobStatus<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.video.defs", "jobStatus">;
export declare function validateJobStatus<V>(v: V): ValidationResult<JobStatus & V>;
//# sourceMappingURL=defs.d.ts.map