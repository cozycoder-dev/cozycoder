"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLETRIAGE = exports.ROLEMODERATOR = exports.ROLEADMIN = void 0;
exports.isMember = isMember;
exports.validateMember = validateMember;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
const is$typed = util_1.is$typed, validate = lexicons_1.validate;
const id = 'tools.ozone.team.defs';
const hashMember = 'member';
function isMember(v) {
    return is$typed(v, id, hashMember);
}
function validateMember(v) {
    return validate(v, id, hashMember);
}
/** Admin role. Highest level of access, can perform all actions. */
exports.ROLEADMIN = `${id}#roleAdmin`;
/** Moderator role. Can perform most actions. */
exports.ROLEMODERATOR = `${id}#roleModerator`;
/** Triage role. Mostly intended for monitoring and escalating issues. */
exports.ROLETRIAGE = `${id}#roleTriage`;
//# sourceMappingURL=defs.js.map