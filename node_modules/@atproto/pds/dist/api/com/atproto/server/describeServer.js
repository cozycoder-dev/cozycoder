"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(server, ctx) {
    server.com.atproto.server.describeServer(() => {
        const availableUserDomains = ctx.cfg.identity.serviceHandleDomains;
        const inviteCodeRequired = ctx.cfg.invites.required;
        const privacyPolicy = ctx.cfg.service.privacyPolicyUrl;
        const termsOfService = ctx.cfg.service.termsOfServiceUrl;
        const contactEmailAddress = ctx.cfg.service.contactEmailAddress;
        return {
            encoding: 'application/json',
            body: {
                did: ctx.cfg.service.did,
                availableUserDomains,
                inviteCodeRequired,
                links: { privacyPolicy, termsOfService },
                contact: {
                    email: contactEmailAddress,
                },
            },
        };
    });
}
//# sourceMappingURL=describeServer.js.map