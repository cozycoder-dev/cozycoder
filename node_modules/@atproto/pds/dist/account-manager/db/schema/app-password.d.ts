export interface AppPassword {
    did: string;
    name: string;
    passwordScrypt: string;
    createdAt: string;
    privileged: 0 | 1;
}
export declare const tableName = "app_password";
export type PartialDB = {
    [tableName]: AppPassword;
};
//# sourceMappingURL=app-password.d.ts.map