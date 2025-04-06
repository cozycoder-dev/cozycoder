"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(server, ctx) {
    server.com.atproto.server.reserveSigningKey({
        handler: async ({ input }) => {
            const signingKey = await ctx.actorStore.reserveKeypair(input.body.did);
            return {
                encoding: 'application/json',
                body: {
                    signingKey,
                },
            };
        },
    });
}
//# sourceMappingURL=reserveSigningKey.js.map