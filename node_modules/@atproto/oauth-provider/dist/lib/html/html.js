"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Html = void 0;
const symbol = Symbol('Html.dangerouslyCreate');
/**
 * This class represents trusted HTML that can be safely embedded in a web page,
 * or used as fragments to build a larger HTML document.
 */
class Html {
    #fragments;
    constructor(fragments, guard) {
        if (guard !== symbol) {
            // Forces developers to use `Html.dangerouslyCreate` to create an Html
            // instance, to make it clear that the content needs to be trusted.
            throw new TypeError('Use Html.dangerouslyCreate() to create an Html instance');
        }
        // Transform into an array in case iterable can be consumed only once
        // (e.g. a generator function).
        this.#fragments = Array.from(fragments);
    }
    toString() {
        // More efficient than `return this.#fragments.join('')` because it avoids
        // creating intermediate strings when items of this.#fragments are Html
        // instances (as all their toString() would end-up being called, creating
        // lots of intermediary strings). The approach here allows to do a full scan
        // of all the child nodes and concatenate them in a single pass.
        return Array.from(this).join('');
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'string':
            case 'default':
                return this.toString();
            default:
                throw new TypeError(`Cannot convert Html to a ${hint}`);
        }
    }
    *[Symbol.iterator]() {
        for (const fragment of this.#fragments) {
            if (typeof fragment === 'string') {
                yield fragment;
            }
            else {
                yield* fragment;
            }
        }
    }
    static dangerouslyCreate(fragments) {
        return new Html(fragments, symbol);
    }
}
exports.Html = Html;
//# sourceMappingURL=html.js.map