"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlobRefs = exports.blobsForWrite = exports.writeToOp = exports.deleteWriteToOp = exports.updateWriteToOp = exports.createWriteToOp = exports.prepareDelete = exports.prepareUpdate = exports.prepareCreate = exports.setCollectionName = exports.assertValidCreatedAt = exports.assertValidRecordWithStatus = void 0;
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const lexicon_1 = require("@atproto/lexicon");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const explicit_slurs_1 = require("../handle/explicit-slurs");
const lex = __importStar(require("../lexicon/lexicons"));
const AppBskyActorProfile = __importStar(require("../lexicon/types/app/bsky/actor/profile"));
const AppBskyFeedGenerator = __importStar(require("../lexicon/types/app/bsky/feed/generator"));
const AppBskyFeedPost = __importStar(require("../lexicon/types/app/bsky/feed/post"));
const AppBskyGraphList = __importStar(require("../lexicon/types/app/bsky/graph/list"));
const AppBskyGraphStarterpack = __importStar(require("../lexicon/types/app/bsky/graph/starterpack"));
const facet_1 = require("../lexicon/types/app/bsky/richtext/facet");
const util_1 = require("../lexicon/util");
const types_1 = require("./types");
const isValidFeedGenerator = (0, util_1.asPredicate)(AppBskyFeedGenerator.validateRecord);
const isValidStarterPack = (0, util_1.asPredicate)(AppBskyGraphStarterpack.validateRecord);
const isValidPost = (0, util_1.asPredicate)(AppBskyFeedPost.validateRecord);
const isValidList = (0, util_1.asPredicate)(AppBskyGraphList.validateRecord);
const isValidProfile = (0, util_1.asPredicate)(AppBskyActorProfile.validateRecord);
const assertValidRecordWithStatus = (record, opts) => {
    if (typeof record.$type !== 'string') {
        throw new types_1.InvalidRecordError('No $type provided');
    }
    try {
        lex.lexicons.assertValidRecord(record.$type, record);
        (0, exports.assertValidCreatedAt)(record);
    }
    catch (e) {
        if (e instanceof lexicon_1.LexiconDefNotFoundError) {
            if (opts.requireLexicon) {
                throw new types_1.InvalidRecordError(e.message);
            }
            else {
                return 'unknown';
            }
        }
        throw new types_1.InvalidRecordError(`Invalid ${record.$type} record: ${e instanceof Error ? e.message : String(e)}`);
    }
    return 'valid';
};
exports.assertValidRecordWithStatus = assertValidRecordWithStatus;
// additional more rigorous check on datetimes
// this check will eventually be in the lex sdk, but this will stop the bleed until then
const assertValidCreatedAt = (record) => {
    const createdAt = record['createdAt'];
    if (typeof createdAt !== 'string') {
        return;
    }
    try {
        (0, syntax_1.ensureValidDatetime)(createdAt);
    }
    catch {
        throw new lexicon_1.ValidationError('createdAt must be an valid atproto datetime (both RFC-3339 and ISO-8601)');
    }
};
exports.assertValidCreatedAt = assertValidCreatedAt;
const setCollectionName = (collection, record, validate) => {
    if (!record.$type) {
        record.$type = collection;
    }
    if (validate && record.$type !== collection) {
        throw new types_1.InvalidRecordError(`Invalid $type: expected ${collection}, got ${record.$type}`);
    }
    return record;
};
exports.setCollectionName = setCollectionName;
const prepareCreate = async (opts) => {
    const { did, collection, swapCid, validate } = opts;
    const maybeValidate = validate !== false;
    const record = (0, exports.setCollectionName)(collection, opts.record, maybeValidate);
    let validationStatus;
    if (maybeValidate) {
        validationStatus = (0, exports.assertValidRecordWithStatus)(record, {
            requireLexicon: validate === true,
        });
    }
    const nextRkey = common_1.TID.next();
    const rkey = opts.rkey || nextRkey.toString();
    // @TODO: validate against Lexicon record 'key' type, not just overall recordkey syntax
    (0, syntax_1.ensureValidRecordKey)(rkey);
    assertNoExplicitSlurs(rkey, record);
    return {
        action: repo_1.WriteOpAction.Create,
        uri: syntax_1.AtUri.make(did, collection, rkey),
        cid: await cidForSafeRecord(record),
        swapCid,
        record,
        blobs: (0, exports.blobsForWrite)(record, maybeValidate),
        validationStatus,
    };
};
exports.prepareCreate = prepareCreate;
const prepareUpdate = async (opts) => {
    const { did, collection, rkey, swapCid, validate } = opts;
    const maybeValidate = validate !== false;
    const record = (0, exports.setCollectionName)(collection, opts.record, maybeValidate);
    let validationStatus;
    if (maybeValidate) {
        validationStatus = (0, exports.assertValidRecordWithStatus)(record, {
            requireLexicon: validate === true,
        });
    }
    assertNoExplicitSlurs(rkey, record);
    return {
        action: repo_1.WriteOpAction.Update,
        uri: syntax_1.AtUri.make(did, collection, rkey),
        cid: await cidForSafeRecord(record),
        swapCid,
        record,
        blobs: (0, exports.blobsForWrite)(record, maybeValidate),
        validationStatus,
    };
};
exports.prepareUpdate = prepareUpdate;
const prepareDelete = (opts) => {
    const { did, collection, rkey, swapCid } = opts;
    return {
        action: repo_1.WriteOpAction.Delete,
        uri: syntax_1.AtUri.make(did, collection, rkey),
        swapCid,
    };
};
exports.prepareDelete = prepareDelete;
const createWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Create,
    collection: write.uri.collection,
    rkey: write.uri.rkey,
    record: write.record,
});
exports.createWriteToOp = createWriteToOp;
const updateWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Update,
    collection: write.uri.collection,
    rkey: write.uri.rkey,
    record: write.record,
});
exports.updateWriteToOp = updateWriteToOp;
const deleteWriteToOp = (write) => ({
    action: repo_1.WriteOpAction.Delete,
    collection: write.uri.collection,
    rkey: write.uri.rkey,
});
exports.deleteWriteToOp = deleteWriteToOp;
const writeToOp = (write) => {
    switch (write.action) {
        case repo_1.WriteOpAction.Create:
            return (0, exports.createWriteToOp)(write);
        case repo_1.WriteOpAction.Update:
            return (0, exports.updateWriteToOp)(write);
        case repo_1.WriteOpAction.Delete:
            return (0, exports.deleteWriteToOp)(write);
        default:
            throw new Error(`Unrecognized action: ${write}`);
    }
};
exports.writeToOp = writeToOp;
async function cidForSafeRecord(record) {
    try {
        const block = await (0, common_1.dataToCborBlock)((0, lexicon_1.lexToIpld)(record));
        (0, repo_1.cborToLex)(block.bytes);
        return block.cid;
    }
    catch (err) {
        // Block does not properly transform between lex and cbor
        const badRecordErr = new types_1.InvalidRecordError('Bad record');
        badRecordErr.cause = err;
        throw badRecordErr;
    }
}
function assertNoExplicitSlurs(rkey, record) {
    const toCheck = [];
    if (isValidProfile(record)) {
        if (record.displayName)
            toCheck.push(record.displayName);
    }
    else if (isValidList(record)) {
        toCheck.push(record.name);
    }
    else if (isValidStarterPack(record)) {
        toCheck.push(record.name);
    }
    else if (isValidFeedGenerator(record)) {
        toCheck.push(rkey);
        toCheck.push(record.displayName);
    }
    else if (isValidPost(record)) {
        if (record.tags) {
            toCheck.push(...record.tags);
        }
        for (const facet of record.facets || []) {
            for (const feat of facet.features) {
                if ((0, facet_1.isTag)(feat)) {
                    toCheck.push(feat.tag);
                }
            }
        }
    }
    if ((0, explicit_slurs_1.hasExplicitSlur)(toCheck.join(' '))) {
        throw new types_1.InvalidRecordError('Unacceptable slur in record');
    }
}
const blobsForWrite = (record, validate) => {
    const refs = (0, exports.findBlobRefs)(record);
    const recordType = typeof record['$type'] === 'string' ? record['$type'] : undefined;
    for (const ref of refs) {
        if (common_1.check.is(ref.ref.original, lexicon_1.untypedJsonBlobRef)) {
            throw new types_1.InvalidRecordError(`Legacy blob ref at '${ref.path.join('/')}'`);
        }
    }
    return refs.map(({ ref, path }) => ({
        size: ref.size,
        cid: ref.ref,
        mimeType: ref.mimeType,
        constraints: validate && recordType
            ? CONSTRAINTS[recordType]?.[path.join('/')] ?? {}
            : {},
    }));
};
exports.blobsForWrite = blobsForWrite;
const findBlobRefs = (val, path = [], layer = 0) => {
    if (layer > 32) {
        return [];
    }
    // walk arrays
    if (Array.isArray(val)) {
        return val.flatMap((item) => (0, exports.findBlobRefs)(item, path, layer + 1));
    }
    // objects
    if (val && typeof val === 'object') {
        // convert blobs, leaving the original encoding so that we don't change CIDs on re-encode
        if (val instanceof lexicon_1.BlobRef) {
            return [
                {
                    ref: val,
                    path,
                },
            ];
        }
        // retain cids & bytes
        if (cid_1.CID.asCID(val) || val instanceof Uint8Array) {
            return [];
        }
        return Object.entries(val).flatMap(([key, item]) => (0, exports.findBlobRefs)(item, [...path, key], layer + 1));
    }
    // pass through
    return [];
};
exports.findBlobRefs = findBlobRefs;
const CONSTRAINTS = {
    [lex.ids.AppBskyActorProfile]: {
        avatar: lex.schemaDict.AppBskyActorProfile.defs.main.record.properties.avatar,
        banner: lex.schemaDict.AppBskyActorProfile.defs.main.record.properties.banner,
    },
    [lex.ids.AppBskyFeedGenerator]: {
        avatar: lex.schemaDict.AppBskyFeedGenerator.defs.main.record.properties.avatar,
    },
    [lex.ids.AppBskyGraphList]: {
        avatar: lex.schemaDict.AppBskyGraphList.defs.main.record.properties.avatar,
    },
    [lex.ids.AppBskyFeedPost]: {
        'embed/images/image': lex.schemaDict.AppBskyEmbedImages.defs.image.properties.image,
        'embed/external/thumb': lex.schemaDict.AppBskyEmbedExternal.defs.external.properties.thumb,
        'embed/media/images/image': lex.schemaDict.AppBskyEmbedImages.defs.image.properties.image,
        'embed/media/external/thumb': lex.schemaDict.AppBskyEmbedExternal.defs.external.properties.thumb,
    },
};
//# sourceMappingURL=prepare.js.map