import { AuthScope } from '../../auth-verifier';
import { AccountPreference, PreferenceReader } from './reader';
export declare class PreferenceTransactor extends PreferenceReader {
    putPreferences(values: AccountPreference[], namespace: string, scope: AuthScope): Promise<void>;
}
//# sourceMappingURL=transactor.d.ts.map