import { Selectable } from 'kysely';
import { DeviceData, DeviceId } from '@atproto/oauth-provider';
import { AccountDb, Device } from '../db';
export declare const rowToDeviceData: (row: Selectable<Device>) => DeviceData;
export declare const createQB: (db: AccountDb, deviceId: DeviceId, { sessionId, userAgent, ipAddress, lastSeenAt }: DeviceData) => import("kysely").InsertQueryBuilder<import("../db").DatabaseSchema, "device", import("kysely").InsertResult>;
export declare const readQB: (db: AccountDb, deviceId: DeviceId) => import("kysely/dist/cjs/parser/select-parser").SelectAllQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "device">, "device", {}, "device">;
export declare const updateQB: (db: AccountDb, deviceId: DeviceId, { sessionId, userAgent, ipAddress, lastSeenAt }: Partial<DeviceData>) => import("kysely").UpdateQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "device">, "device", "device", import("kysely").UpdateResult>;
export declare const removeQB: (db: AccountDb, deviceId: DeviceId) => import("kysely").DeleteQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "device">, "device", import("kysely").DeleteResult>;
//# sourceMappingURL=device.d.ts.map