import { AppContext } from '../../../../context';
import { Cursor, GenericKeyset } from '../../../../db/pagination';
import { Server } from '../../../../lexicon';
export default function (server: Server, ctx: AppContext): void;
type TimeDidResult = {
    createdAt: string;
    did: string;
};
export declare class TimeDidKeyset extends GenericKeyset<TimeDidResult, Cursor> {
    labelResult(result: TimeDidResult): Cursor;
    labeledResultToCursor(labeled: Cursor): {
        primary: string;
        secondary: string;
    };
    cursorToLabeledResult(cursor: Cursor): {
        primary: string;
        secondary: string;
    };
}
export {};
//# sourceMappingURL=listRepos.d.ts.map