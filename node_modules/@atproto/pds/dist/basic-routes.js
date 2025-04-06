"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const kysely_1 = require("kysely");
const createRouter = (ctx) => {
    const router = (0, express_1.Router)();
    router.get('/', function (req, res) {
        res.type('text/plain');
        res.send(`
         __                         __
        /\\ \\__                     /\\ \\__
    __  \\ \\ ,_\\  _____   _ __   ___\\ \\ ,_\\   ___
  /'__'\\ \\ \\ \\/ /\\ '__'\\/\\''__\\/ __'\\ \\ \\/  / __'\\
 /\\ \\L\\.\\_\\ \\ \\_\\ \\ \\L\\ \\ \\ \\//\\ \\L\\ \\ \\ \\_/\\ \\L\\ \\
 \\ \\__/.\\_\\\\ \\__\\\\ \\ ,__/\\ \\_\\\\ \\____/\\ \\__\\ \\____/
  \\/__/\\/_/ \\/__/ \\ \\ \\/  \\/_/ \\/___/  \\/__/\\/___/
                   \\ \\_\\
                    \\/_/


This is an AT Protocol Personal Data Server (aka, an atproto PDS)

Most API routes are under /xrpc/

      Code: https://github.com/bluesky-social/atproto
 Self-Host: https://github.com/bluesky-social/pds
  Protocol: https://atproto.com
`);
    });
    router.get('/robots.txt', function (req, res) {
        res.type('text/plain');
        res.send('# Hello!\n\n# Crawling the public API is allowed\nUser-agent: *\nAllow: /');
    });
    router.get('/xrpc/_health', async function (req, res) {
        const { version } = ctx.cfg.service;
        try {
            await (0, kysely_1.sql) `select 1`.execute(ctx.accountManager.db.db);
        }
        catch (err) {
            req.log.error(err, 'failed health check');
            res.status(503).send({ version, error: 'Service Unavailable' });
            return;
        }
        res.send({ version });
    });
    return router;
};
exports.createRouter = createRouter;
//# sourceMappingURL=basic-routes.js.map