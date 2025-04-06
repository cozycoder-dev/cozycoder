export interface Def<T> {
    parse: (obj: unknown) => T;
    safeParse: (obj: unknown) => {
        success: boolean;
    };
}
export declare const is: <T>(obj: unknown, def: Def<T>) => obj is T;
export declare const assure: <T>(def: Def<T>, obj: unknown) => T;
export declare const isObject: (obj: unknown) => obj is Record<string, unknown>;
