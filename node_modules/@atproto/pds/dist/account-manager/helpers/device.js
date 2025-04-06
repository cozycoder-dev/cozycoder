"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQB = exports.updateQB = exports.readQB = exports.createQB = exports.rowToDeviceData = void 0;
const db_1 = require("../../db");
const rowToDeviceData = (row) => ({
    sessionId: row.sessionId,
    userAgent: row.userAgent,
    ipAddress: row.ipAddress,
    lastSeenAt: (0, db_1.fromDateISO)(row.lastSeenAt),
});
exports.rowToDeviceData = rowToDeviceData;
const createQB = (db, deviceId, { sessionId, userAgent, ipAddress, lastSeenAt }) => db.db.insertInto('device').values({
    id: deviceId,
    sessionId,
    userAgent,
    ipAddress,
    lastSeenAt: (0, db_1.toDateISO)(lastSeenAt),
});
exports.createQB = createQB;
const readQB = (db, deviceId) => db.db.selectFrom('device').where('id', '=', deviceId).selectAll();
exports.readQB = readQB;
const updateQB = (db, deviceId, { sessionId, userAgent, ipAddress, lastSeenAt }) => db.db
    .updateTable('device')
    .if(sessionId != null, (qb) => qb.set({ sessionId }))
    .if(userAgent != null, (qb) => qb.set({ userAgent }))
    .if(ipAddress != null, (qb) => qb.set({ ipAddress }))
    .if(lastSeenAt != null, (qb) => qb.set({ lastSeenAt: (0, db_1.toDateISO)(lastSeenAt) }))
    .where('id', '=', deviceId);
exports.updateQB = updateQB;
const removeQB = (db, deviceId) => db.db.deleteFrom('device').where('id', '=', deviceId);
exports.removeQB = removeQB;
//# sourceMappingURL=device.js.map