import { GeneratedAlways } from 'kysely';
export interface AccountPref {
    id: GeneratedAlways<number>;
    name: string;
    valueJson: string;
}
export declare const tableName = "account_pref";
export type PartialDB = {
    [tableName]: AccountPref;
};
//# sourceMappingURL=account-pref.d.ts.map