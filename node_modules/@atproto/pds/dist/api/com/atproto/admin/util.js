"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPassthru = authPassthru;
exports.formatAccountInfo = formatAccountInfo;
const syntax_1 = require("@atproto/syntax");
function authPassthru(req, withEncoding) {
    if (req.headers.authorization) {
        return {
            headers: { authorization: req.headers.authorization },
            encoding: withEncoding ? 'application/json' : undefined,
        };
    }
}
function formatAccountInfo(account, { managesOwnInvites, invitedBy, invites, }) {
    let invitesResults;
    if (managesOwnInvites) {
        if (Array.isArray(invites)) {
            invitesResults = invites;
        }
        else {
            invitesResults = invites.get(account.did) || [];
        }
    }
    return {
        did: account.did,
        handle: account.handle ?? syntax_1.INVALID_HANDLE,
        email: account.email ?? undefined,
        indexedAt: account.createdAt,
        emailConfirmedAt: account.emailConfirmedAt ?? undefined,
        invitedBy: managesOwnInvites ? invitedBy[account.did] : undefined,
        invites: invitesResults,
        invitesDisabled: managesOwnInvites
            ? account.invitesDisabled === 1
            : undefined,
        deactivatedAt: account.deactivatedAt ?? undefined,
    };
}
//# sourceMappingURL=util.js.map