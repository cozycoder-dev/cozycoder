import type { IncomingMessage } from 'node:http';
export type MethodMatcherInput = string | Iterable<string> | MethodMatcher;
export type MethodMatcher = (req: IncomingMessage) => boolean;
export declare function createMethodMatcher(method: MethodMatcherInput): MethodMatcher;
//# sourceMappingURL=method.d.ts.map