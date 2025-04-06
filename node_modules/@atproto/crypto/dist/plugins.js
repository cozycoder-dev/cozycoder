"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const plugin_1 = require("./p256/plugin");
const plugin_2 = require("./secp256k1/plugin");
exports.plugins = [plugin_1.p256Plugin, plugin_2.secp256k1Plugin];
//# sourceMappingURL=plugins.js.map