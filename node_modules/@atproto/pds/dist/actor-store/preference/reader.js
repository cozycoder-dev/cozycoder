"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefMatchNamespace = exports.PreferenceReader = void 0;
const util_1 = require("./util");
class PreferenceReader {
    constructor(db) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
    }
    async getPreferences(namespace, scope) {
        const prefsRes = await this.db.db
            .selectFrom('account_pref')
            .orderBy('id')
            .selectAll()
            .execute();
        return prefsRes
            .filter((pref) => !namespace || (0, exports.prefMatchNamespace)(namespace, pref.name))
            .filter((pref) => (0, util_1.prefInScope)(scope, pref.name))
            .map((pref) => JSON.parse(pref.valueJson));
    }
}
exports.PreferenceReader = PreferenceReader;
const prefMatchNamespace = (namespace, fullname) => {
    return fullname === namespace || fullname.startsWith(`${namespace}.`);
};
exports.prefMatchNamespace = prefMatchNamespace;
//# sourceMappingURL=reader.js.map