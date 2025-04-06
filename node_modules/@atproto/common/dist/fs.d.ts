export declare const fileExists: (location: string) => Promise<boolean>;
export declare const readIfExists: (filepath: string) => Promise<Uint8Array | undefined>;
export declare const rmIfExists: (filepath: string, recursive?: boolean) => Promise<void>;
export declare const renameIfExists: (oldPath: string, newPath: string) => Promise<void>;
//# sourceMappingURL=fs.d.ts.map