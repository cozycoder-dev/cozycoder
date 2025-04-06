"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DpopNonce = exports.dpopSecretSchema = exports.secretHexSchema = exports.secretBytesSchema = exports.rotationIntervalSchema = void 0;
const node_crypto_1 = require("node:crypto");
const zod_1 = require("zod");
const constants_js_1 = require("../constants.js");
const MAX_ROTATION_INTERVAL = constants_js_1.DPOP_NONCE_MAX_AGE / 3;
const MIN_ROTATION_INTERVAL = Math.min(1000, MAX_ROTATION_INTERVAL);
exports.rotationIntervalSchema = zod_1.z
    .number()
    .int()
    .min(MIN_ROTATION_INTERVAL)
    .max(MAX_ROTATION_INTERVAL);
const SECRET_BYTE_LENGTH = 32;
exports.secretBytesSchema = zod_1.z
    .instanceof(Uint8Array)
    .refine((secret) => secret.length === SECRET_BYTE_LENGTH, {
    message: `Secret must be exactly ${SECRET_BYTE_LENGTH} bytes long`,
});
exports.secretHexSchema = zod_1.z
    .string()
    .regex(/^[0-9a-f]+$/i, `Secret must be a ${SECRET_BYTE_LENGTH * 2} chars hex string`)
    .length(SECRET_BYTE_LENGTH * 2)
    .transform((hex) => Buffer.from(hex, 'hex'));
exports.dpopSecretSchema = zod_1.z.union([exports.secretBytesSchema, exports.secretHexSchema]);
class DpopNonce {
    #rotationInterval;
    #secret;
    // Nonce state
    #counter;
    #prev;
    #now;
    #next;
    constructor(secret = (0, node_crypto_1.randomBytes)(SECRET_BYTE_LENGTH), rotationInterval = MAX_ROTATION_INTERVAL) {
        this.#rotationInterval = exports.rotationIntervalSchema.parse(rotationInterval);
        this.#secret = Uint8Array.from(exports.dpopSecretSchema.parse(secret));
        this.#counter = this.currentCounter;
        this.#prev = this.compute(this.#counter - 1);
        this.#now = this.compute(this.#counter);
        this.#next = this.compute(this.#counter + 1);
    }
    /**
     * Returns the number of full rotations since the epoch
     */
    get currentCounter() {
        return (Date.now() / this.#rotationInterval) | 0;
    }
    rotate() {
        const counter = this.currentCounter;
        switch (counter - this.#counter) {
            case 0:
                // counter === this.#counter => nothing to do
                return;
            case 1:
                // Optimization: avoid recomputing #prev & #now
                this.#prev = this.#now;
                this.#now = this.#next;
                this.#next = this.compute(counter + 1);
                break;
            case 2:
                // Optimization: avoid recomputing #prev
                this.#prev = this.#next;
                this.#now = this.compute(counter);
                this.#next = this.compute(counter + 1);
                break;
            default:
                // All nonces are outdated, so we recompute all of them
                this.#prev = this.compute(counter - 1);
                this.#now = this.compute(counter);
                this.#next = this.compute(counter + 1);
                break;
        }
        this.#counter = counter;
    }
    compute(counter) {
        return (0, node_crypto_1.createHmac)('sha256', this.#secret)
            .update(numTo64bits(counter))
            .digest()
            .toString('base64url');
    }
    next() {
        this.rotate();
        return this.#next;
    }
    check(nonce) {
        return this.#next === nonce || this.#now === nonce || this.#prev === nonce;
    }
}
exports.DpopNonce = DpopNonce;
function numTo64bits(num) {
    const arr = new Uint8Array(8);
    // @NOTE Assigning to an uint8 will only keep the last 8 int bits
    arr[7] = num |= 0;
    arr[6] = num >>= 8;
    arr[5] = num >>= 8;
    arr[4] = num >>= 8;
    arr[3] = num >>= 8;
    arr[2] = num >>= 8;
    arr[1] = num >>= 8;
    arr[0] = num >>= 8;
    return arr;
}
//# sourceMappingURL=dpop-nonce.js.map