"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundQueue = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
const logger_1 = require("./logger");
// A simple queue for in-process, out-of-band/backgrounded work
class BackgroundQueue {
    constructor() {
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new p_queue_1.default({ concurrency: 5 })
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    add(task) {
        if (this.destroyed) {
            return;
        }
        this.queue
            .add(() => task())
            .catch((err) => {
            logger_1.dbLogger.error(err, 'background queue task failed');
        });
    }
    async processAll() {
        await this.queue.onIdle();
    }
    // On destroy we stop accepting new tasks, but complete all pending/in-progress tasks.
    // The application calls this only once http connections have drained (tasks no longer being added).
    async destroy() {
        this.destroyed = true;
        await this.queue.onIdle();
    }
}
exports.BackgroundQueue = BackgroundQueue;
//# sourceMappingURL=background.js.map