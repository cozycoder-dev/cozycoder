"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefInScope = void 0;
const auth_verifier_1 = require("../../auth-verifier");
const FULL_ACCESS_ONLY_PREFS = ['app.bsky.actor.defs#personalDetailsPref'];
const prefInScope = (scope, prefType) => {
    if (scope === auth_verifier_1.AuthScope.Access)
        return true;
    return !FULL_ACCESS_ONLY_PREFS.includes(prefType);
};
exports.prefInScope = prefInScope;
//# sourceMappingURL=util.js.map