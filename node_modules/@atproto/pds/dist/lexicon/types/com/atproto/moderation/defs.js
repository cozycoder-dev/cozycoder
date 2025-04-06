"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REASONAPPEAL = exports.REASONOTHER = exports.REASONRUDE = exports.REASONSEXUAL = exports.REASONMISLEADING = exports.REASONVIOLATION = exports.REASONSPAM = void 0;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'com.atproto.moderation.defs';
/** Spam: frequent unwanted promotion, replies, mentions */
exports.REASONSPAM = `${id}#reasonSpam`;
/** Direct violation of server rules, laws, terms of service */
exports.REASONVIOLATION = `${id}#reasonViolation`;
/** Misleading identity, affiliation, or content */
exports.REASONMISLEADING = `${id}#reasonMisleading`;
/** Unwanted or mislabeled sexual content */
exports.REASONSEXUAL = `${id}#reasonSexual`;
/** Rude, harassing, explicit, or otherwise unwelcoming behavior */
exports.REASONRUDE = `${id}#reasonRude`;
/** Other: reports not falling under another report category */
exports.REASONOTHER = `${id}#reasonOther`;
/** Appeal: appeal a previously taken moderation action */
exports.REASONAPPEAL = `${id}#reasonAppeal`;
//# sourceMappingURL=defs.js.map