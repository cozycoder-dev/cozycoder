"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResolver = void 0;
const promises_1 = __importDefault(require("node:dns/promises"));
const SUBDOMAIN = '_atproto';
const PREFIX = 'did=';
class HandleResolver {
    constructor(opts = {}) {
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backupNameservers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "backupNameserverIps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.timeout = opts.timeout ?? 3000;
        this.backupNameservers = opts.backupNameservers;
    }
    async resolve(handle) {
        const dnsPromise = this.resolveDns(handle);
        const httpAbort = new AbortController();
        const httpPromise = this.resolveHttp(handle, httpAbort.signal).catch(() => undefined);
        const dnsRes = await dnsPromise;
        if (dnsRes) {
            httpAbort.abort();
            return dnsRes;
        }
        const res = await httpPromise;
        if (res) {
            return res;
        }
        return this.resolveDnsBackup(handle);
    }
    async resolveDns(handle) {
        let chunkedResults;
        try {
            chunkedResults = await promises_1.default.resolveTxt(`${SUBDOMAIN}.${handle}`);
        }
        catch (err) {
            return undefined;
        }
        return this.parseDnsResult(chunkedResults);
    }
    async resolveHttp(handle, signal) {
        const url = new URL('/.well-known/atproto-did', `https://${handle}`);
        try {
            const res = await fetch(url, { signal });
            const did = (await res.text()).split('\n')[0].trim();
            if (typeof did === 'string' && did.startsWith('did:')) {
                return did;
            }
            return undefined;
        }
        catch (err) {
            return undefined;
        }
    }
    async resolveDnsBackup(handle) {
        let chunkedResults;
        try {
            const backupIps = await this.getBackupNameserverIps();
            if (!backupIps || backupIps.length < 1)
                return undefined;
            const resolver = new promises_1.default.Resolver();
            resolver.setServers(backupIps);
            chunkedResults = await resolver.resolveTxt(`${SUBDOMAIN}.${handle}`);
        }
        catch (err) {
            return undefined;
        }
        return this.parseDnsResult(chunkedResults);
    }
    parseDnsResult(chunkedResults) {
        const results = chunkedResults.map((chunks) => chunks.join(''));
        const found = results.filter((i) => i.startsWith(PREFIX));
        if (found.length !== 1) {
            return undefined;
        }
        return found[0].slice(PREFIX.length);
    }
    async getBackupNameserverIps() {
        if (!this.backupNameservers) {
            return undefined;
        }
        else if (!this.backupNameserverIps) {
            const responses = await Promise.allSettled(this.backupNameservers.map((h) => promises_1.default.lookup(h)));
            for (const res of responses) {
                if (res.status === 'fulfilled') {
                    this.backupNameserverIps ?? (this.backupNameserverIps = []);
                    this.backupNameserverIps.push(res.value.address);
                }
            }
        }
        return this.backupNameserverIps;
    }
}
exports.HandleResolver = HandleResolver;
//# sourceMappingURL=index.js.map