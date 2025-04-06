import { DeviceId } from '@atproto/oauth-provider';
import { DateISO, JsonArray } from '../../../db';
export interface DeviceAccount {
    did: string;
    deviceId: DeviceId;
    authenticatedAt: DateISO;
    authorizedClients: JsonArray;
    remember: 0 | 1;
}
export declare const tableName = "device_account";
export type PartialDB = {
    [tableName]: DeviceAccount;
};
//# sourceMappingURL=device-account.d.ts.map