"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCodeQB = exports.removeByIdQB = exports.removeOldExpiredQB = exports.updateQB = exports.readQB = exports.createQB = exports.rowToFoundRequestResult = exports.rowToRequestData = void 0;
const db_1 = require("../../db");
const rowToRequestData = (row) => ({
    clientId: row.clientId,
    clientAuth: (0, db_1.fromJsonObject)(row.clientAuth),
    parameters: (0, db_1.fromJsonObject)(row.parameters),
    expiresAt: (0, db_1.fromDateISO)(row.expiresAt),
    deviceId: row.deviceId,
    sub: row.did,
    code: row.code,
});
exports.rowToRequestData = rowToRequestData;
const rowToFoundRequestResult = (row) => ({
    id: row.id,
    data: (0, exports.rowToRequestData)(row),
});
exports.rowToFoundRequestResult = rowToFoundRequestResult;
const requestDataToRow = (id, data) => ({
    id,
    did: data.sub,
    deviceId: data.deviceId,
    clientId: data.clientId,
    clientAuth: (0, db_1.toJsonObject)(data.clientAuth),
    parameters: (0, db_1.toJsonObject)(data.parameters),
    expiresAt: (0, db_1.toDateISO)(data.expiresAt),
    code: data.code,
});
const createQB = (db, id, data) => db.db.insertInto('authorization_request').values(requestDataToRow(id, data));
exports.createQB = createQB;
const readQB = (db, id) => db.db.selectFrom('authorization_request').where('id', '=', id).selectAll();
exports.readQB = readQB;
const updateQB = (db, id, { code, sub, deviceId, expiresAt }) => db.db
    .updateTable('authorization_request')
    .if(code !== undefined, (qb) => qb.set({ code }))
    .if(sub !== undefined, (qb) => qb.set({ did: sub }))
    .if(deviceId !== undefined, (qb) => qb.set({ deviceId }))
    .if(expiresAt != null, (qb) => qb.set({ expiresAt: (0, db_1.toDateISO)(expiresAt) }))
    .where('id', '=', id);
exports.updateQB = updateQB;
const removeOldExpiredQB = (db, delay = 600e3) => 
// We allow some delay for the expiration time so that expired requests
// can still be returned to the OAuthProvider library for error handling.
db.db
    .deleteFrom('authorization_request')
    // uses "authorization_request_expires_at_idx" index
    .where('expiresAt', '<', (0, db_1.toDateISO)(new Date(Date.now() - delay)));
exports.removeOldExpiredQB = removeOldExpiredQB;
const removeByIdQB = (db, id) => db.db.deleteFrom('authorization_request').where('id', '=', id);
exports.removeByIdQB = removeByIdQB;
const findByCodeQB = (db, code) => db.db
    .selectFrom('authorization_request')
    // uses "authorization_request_code_idx" partial index (hence the null check)
    .where('code', '=', code)
    .where('code', 'is not', null)
    .selectAll();
exports.findByCodeQB = findByCodeQB;
//# sourceMappingURL=authorization-request.js.map