"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const getRepo_1 = require("../getRepo");
const util_1 = require("../util");
function default_1(server, ctx) {
    server.com.atproto.sync.getCheckout({
        auth: ctx.authVerifier.optionalAccessOrAdminToken(),
        handler: async ({ params, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, ctx.authVerifier.isUserOrAdmin(auth, did));
            const carStream = await (0, getRepo_1.getCarStream)(ctx, did);
            return {
                encoding: 'application/vnd.ipld.car',
                body: carStream,
            };
        },
    });
}
//# sourceMappingURL=getCheckout.js.map