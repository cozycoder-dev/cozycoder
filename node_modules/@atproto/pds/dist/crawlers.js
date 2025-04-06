"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawlers = void 0;
const api_1 = require("@atproto/api");
const common_1 = require("@atproto/common");
const logger_1 = require("./logger");
const NOTIFY_THRESHOLD = 20 * common_1.MINUTE;
class Crawlers {
    constructor(hostname, crawlers, backgroundQueue) {
        Object.defineProperty(this, "hostname", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: hostname
        });
        Object.defineProperty(this, "crawlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: crawlers
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: backgroundQueue
        });
        Object.defineProperty(this, "agents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastNotified", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.agents = crawlers.map((service) => new api_1.AtpAgent({ service }));
    }
    async notifyOfUpdate() {
        const now = Date.now();
        if (now - this.lastNotified < NOTIFY_THRESHOLD) {
            return;
        }
        this.backgroundQueue.add(async () => {
            await Promise.all(this.agents.map(async (agent) => {
                try {
                    await agent.api.com.atproto.sync.requestCrawl({
                        hostname: this.hostname,
                    });
                }
                catch (err) {
                    logger_1.crawlerLogger.warn({ err, cralwer: agent.service.toString() }, 'failed to request crawl');
                }
            }));
            this.lastNotified = now;
        });
    }
}
exports.Crawlers = Crawlers;
//# sourceMappingURL=crawlers.js.map