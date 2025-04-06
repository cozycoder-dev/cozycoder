/**
 * This class represents trusted HTML that can be safely embedded in a web page,
 * or used as fragments to build a larger HTML document.
 */
export declare class Html implements Iterable<string> {
    #private;
    private constructor();
    toString(): string;
    [Symbol.toPrimitive](hint: any): string;
    [Symbol.iterator](): IterableIterator<string>;
    static dangerouslyCreate(fragments: Iterable<Html | string>): Html;
}
//# sourceMappingURL=html.d.ts.map