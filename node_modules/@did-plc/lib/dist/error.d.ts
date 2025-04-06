export declare class PlcError extends Error {
    plcError: boolean;
    constructor(msg: string);
    static is(obj: unknown): obj is PlcError;
}
export declare class ImproperOperationError extends PlcError {
    reason: string;
    op: unknown;
    constructor(reason: string, op: unknown);
}
export declare class MisorderedOperationError extends PlcError {
    constructor();
}
export declare class LateRecoveryError extends PlcError {
    timeLapsed: number;
    constructor(timeLapsed: number);
}
export declare class GenesisHashError extends PlcError {
    expected: string;
    constructor(expected: string);
}
export declare class InvalidSignatureError extends PlcError {
    op: unknown;
    constructor(op: unknown);
}
export declare class UnsupportedKeyError extends PlcError {
    key: string;
    err: unknown;
    constructor(key: string, err: unknown);
}
export declare class ImproperlyFormattedDidError extends PlcError {
    reason: string;
    constructor(reason: string);
}
