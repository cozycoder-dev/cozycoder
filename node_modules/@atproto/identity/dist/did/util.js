"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timed = timed;
async function timed(ms, fn) {
    const abortController = new AbortController();
    const timer = setTimeout(() => abortController.abort(), ms);
    const signal = abortController.signal;
    try {
        return (await fn(signal));
    }
    finally {
        clearTimeout(timer);
        abortController.abort();
    }
}
//# sourceMappingURL=util.js.map