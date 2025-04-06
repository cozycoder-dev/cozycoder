"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishIdentityEvtForDids = exports.publishIdentityFromFile = exports.publishIdentity = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const common_1 = require("@atproto/common");
const util_1 = require("./util");
const publishIdentity = async (ctx, args) => {
    const dids = args;
    await (0, exports.publishIdentityEvtForDids)(ctx, dids);
    console.log('DONE');
};
exports.publishIdentity = publishIdentity;
const publishIdentityFromFile = async (ctx, args) => {
    const filepath = args[0];
    if (!filepath) {
        throw new Error('Expected filepath as argument');
    }
    const timeBetween = args[1] ? (0, util_1.parseIntArg)(args[1]) : 5;
    const file = await promises_1.default.readFile(filepath);
    const dids = file
        .toString()
        .split('\n')
        .map((did) => did.trim());
    await (0, exports.publishIdentityEvtForDids)(ctx, dids, timeBetween);
    console.log('DONE');
};
exports.publishIdentityFromFile = publishIdentityFromFile;
const publishIdentityEvtForDids = async (ctx, dids, timeBetween = 0) => {
    for (const did of dids) {
        try {
            await ctx.sequencer.sequenceIdentityEvt(did);
            console.log(`published identity evt for ${did}`);
        }
        catch (err) {
            console.error(`failed to sequence new identity evt for ${did}: ${err}`);
        }
        if (timeBetween > 0) {
            await (0, common_1.wait)(timeBetween);
        }
    }
};
exports.publishIdentityEvtForDids = publishIdentityEvtForDids;
//# sourceMappingURL=publish-identity.js.map