import express from 'express';
import { ActorAccount } from '../../../../account-manager/helpers/account';
import { CodeDetail } from '../../../../account-manager/helpers/invite';
export declare function authPassthru(req: express.Request, withEncoding?: false): {
    headers: {
        authorization: string;
    };
    encoding: undefined;
} | undefined;
export declare function authPassthru(req: express.Request, withEncoding: true): {
    headers: {
        authorization: string;
    };
    encoding: 'application/json';
} | undefined;
export declare function formatAccountInfo(account: ActorAccount, { managesOwnInvites, invitedBy, invites, }: {
    managesOwnInvites: boolean;
    invites: Map<string, CodeDetail[]> | CodeDetail[];
    invitedBy: Record<string, CodeDetail>;
}): {
    did: string;
    handle: string;
    email: string | undefined;
    indexedAt: string;
    emailConfirmedAt: string | undefined;
    invitedBy: CodeDetail | undefined;
    invites: CodeDetail[] | undefined;
    invitesDisabled: boolean | undefined;
    deactivatedAt: string | undefined;
};
//# sourceMappingURL=util.d.ts.map