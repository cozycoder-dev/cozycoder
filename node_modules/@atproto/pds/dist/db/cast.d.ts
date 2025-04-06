export type DateISO = `${string}T${string}Z`;
export declare const toDateISO: (date: Date) => DateISO;
export declare const fromDateISO: (date: DateISO) => Date;
export type Json = string;
export declare const toJson: (obj: unknown) => Json;
export declare const fromJson: <T>(json: Json) => T;
export type JsonArray = `[${string}]`;
export declare const isJsonArray: (json: string) => json is JsonArray;
export declare function assertJsonArray(json: string): asserts json is JsonArray;
export declare const toJsonArray: (obj: readonly unknown[]) => JsonArray;
export declare const fromJsonArray: <T>(json: JsonArray) => T[];
export type JsonObject = `{${string}}`;
export declare const toJsonObject: (obj: Readonly<Record<string, unknown>>) => JsonObject;
export declare const fromJsonObject: <T extends Record<string, unknown>>(json: JsonObject) => T;
//# sourceMappingURL=cast.d.ts.map