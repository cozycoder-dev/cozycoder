export declare const genSaltAndHash: (password: string) => Promise<string>;
export declare const hashWithSalt: (password: string, salt: string) => Promise<string>;
export declare const verify: (password: string, storedHash: string) => Promise<boolean>;
export declare const getDerivedHash: (password: string, salt: string) => Promise<string>;
export declare const hashAppPassword: (did: string, password: string) => Promise<string>;
//# sourceMappingURL=scrypt.d.ts.map