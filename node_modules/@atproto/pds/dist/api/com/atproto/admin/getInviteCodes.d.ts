import { AppContext } from '../../../../context';
import { Cursor, GenericKeyset, LabeledResult } from '../../../../db/pagination';
import { Server } from '../../../../lexicon';
export default function (server: Server, ctx: AppContext): void;
type TimeCodeResult = {
    createdAt: string;
    code: string;
};
export declare class TimeCodeKeyset extends GenericKeyset<TimeCodeResult, Cursor> {
    labelResult(result: TimeCodeResult): Cursor;
    labeledResultToCursor(labeled: Cursor): {
        primary: string;
        secondary: string;
    };
    cursorToLabeledResult(cursor: Cursor): {
        primary: string;
        secondary: string;
    };
}
type UseCodeResult = {
    uses: number;
    code: string;
};
export declare class UseCodeKeyset extends GenericKeyset<UseCodeResult, LabeledResult> {
    labelResult(result: UseCodeResult): LabeledResult;
    labeledResultToCursor(labeled: Cursor): {
        primary: string;
        secondary: string;
    };
    cursorToLabeledResult(cursor: Cursor): {
        primary: number;
        secondary: string;
    };
}
export {};
//# sourceMappingURL=getInviteCodes.d.ts.map