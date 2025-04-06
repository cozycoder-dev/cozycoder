import { AuthScope } from '../../auth-verifier';
import { ActorDb } from '../db';
export declare class PreferenceReader {
    db: ActorDb;
    constructor(db: ActorDb);
    getPreferences(namespace: string, scope: AuthScope): Promise<AccountPreference[]>;
}
export type AccountPreference = Record<string, unknown> & {
    $type: string;
};
export declare const prefMatchNamespace: (namespace: string, fullname: string) => boolean;
//# sourceMappingURL=reader.d.ts.map