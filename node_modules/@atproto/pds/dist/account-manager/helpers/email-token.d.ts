import { AccountDb, EmailTokenPurpose } from '../db';
export declare const createEmailToken: (db: AccountDb, did: string, purpose: EmailTokenPurpose) => Promise<string>;
export declare const deleteEmailToken: (db: AccountDb, did: string, purpose: EmailTokenPurpose) => Promise<void>;
export declare const deleteAllEmailTokens: (db: AccountDb, did: string) => Promise<void>;
export declare const assertValidToken: (db: AccountDb, did: string, purpose: EmailTokenPurpose, token: string, expirationLen?: number) => Promise<void>;
export declare const assertValidTokenAndFindDid: (db: AccountDb, purpose: EmailTokenPurpose, token: string, expirationLen?: number) => Promise<string>;
//# sourceMappingURL=email-token.d.ts.map