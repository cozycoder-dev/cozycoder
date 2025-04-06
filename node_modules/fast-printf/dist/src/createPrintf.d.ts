import type { PlaceholderToken } from './types';
type FormatUnboundExpression = (subject: string, token: PlaceholderToken, boundValues: any[]) => string;
type Configuration = {
    formatUnboundExpression: FormatUnboundExpression;
};
type Printf = (subject: string, ...boundValues: any[]) => string;
export declare const createPrintf: (configuration?: Configuration) => Printf;
export {};
