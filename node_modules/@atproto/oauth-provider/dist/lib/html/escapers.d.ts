import { Html } from './html.js';
import { NestedIterable } from './util.js';
export declare function javascriptEscaper(code: string): Generator<string, void, undefined>;
export declare function jsonEscaper(value: unknown): Generator<string, void, undefined>;
export declare function cssEscaper(css: string): Generator<string, void, undefined>;
export type HtmlVariable = Html | string | number | null | undefined;
export type HtmlValue = NestedIterable<HtmlVariable>;
export declare function htmlEscaper(htmlFragments: TemplateStringsArray, values: readonly HtmlValue[]): Generator<string | Html, void, undefined>;
//# sourceMappingURL=escapers.d.ts.map