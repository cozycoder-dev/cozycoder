"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueues = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
class UserQueues {
    constructor(concurrency) {
        Object.defineProperty(this, "main", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.main = new p_queue_1.default({ concurrency });
    }
    async addToUser(did, task) {
        if (this.main.isPaused)
            return;
        return this.main.add(() => {
            return this.getQueue(did).add(task);
        });
    }
    getQueue(did) {
        let queue = this.queues.get(did);
        if (!queue) {
            queue = new p_queue_1.default({ concurrency: 1 });
            queue.once('idle', () => this.queues.delete(did));
            this.queues.set(did, queue);
        }
        return queue;
    }
    async onEmpty() {
        await this.main.onEmpty();
    }
    async processAll() {
        await this.main.onIdle();
    }
    async destroy() {
        this.main.pause();
        this.main.clear();
        this.queues.forEach((q) => q.clear());
        await this.processAll();
    }
}
exports.UserQueues = UserQueues;
//# sourceMappingURL=user-queues.js.map