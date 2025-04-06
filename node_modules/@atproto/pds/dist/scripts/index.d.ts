export declare const scripts: {
    'rebuild-repo': (ctx: import("./rebuild-repo").RebuildContext, did: string, promptUser: boolean) => Promise<void>;
    'sequencer-recovery': (ctx: import("./sequencer-recovery/recoverer").RecovererContextNoDb, args: string[]) => Promise<void>;
    'recovery-repair-repos': (ctx: import("./sequencer-recovery/recoverer").RecovererContextNoDb) => Promise<void>;
    'rotate-keys': (ctx: import("./rotate-keys").RotateKeysContext, args: string[]) => Promise<void>;
    'rotate-keys-file': (ctx: import("./rotate-keys").RotateKeysContext, args: string[]) => Promise<void>;
    'rotate-keys-recovery': (ctx: import("./rotate-keys").RotateKeysContext, args: string[]) => Promise<void>;
    'publish-identity': (ctx: import("./publish-identity").PublishIdentityContext, args: string[]) => Promise<void>;
    'publish-identity-file': (ctx: import("./publish-identity").PublishIdentityContext, args: string[]) => Promise<void>;
};
//# sourceMappingURL=index.d.ts.map