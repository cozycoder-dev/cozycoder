import { AppPassword } from '../../lexicon/types/com/atproto/server/createAppPassword';
import { AccountDb } from '../db';
export type AppPassDescript = {
    name: string;
    privileged: boolean;
};
export declare const verifyAccountPassword: (db: AccountDb, did: string, password: string) => Promise<boolean>;
export declare const verifyAppPassword: (db: AccountDb, did: string, password: string) => Promise<AppPassDescript | null>;
export declare const updateUserPassword: (db: AccountDb, opts: {
    did: string;
    passwordScrypt: string;
}) => Promise<void>;
export declare const createAppPassword: (db: AccountDb, did: string, name: string, privileged: boolean) => Promise<AppPassword>;
export declare const listAppPasswords: (db: AccountDb, did: string) => Promise<{
    name: string;
    createdAt: string;
    privileged: boolean;
}[]>;
export declare const deleteAppPassword: (db: AccountDb, did: string, name: string) => Promise<void>;
//# sourceMappingURL=password.d.ts.map