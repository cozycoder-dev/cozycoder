import * as plc from '@did-plc/lib';
import AtpAgent from '@atproto/api';
import { Keypair } from '@atproto/crypto';
import { IdResolver } from '@atproto/identity';
import { ActorStore } from '../actor-store/actor-store';
import { Sequencer } from '../sequencer';
export type RotateKeysContext = {
    sequencer: Sequencer;
    actorStore: ActorStore;
    idResolver: IdResolver;
    plcClient: plc.Client;
    plcRotationKey: Keypair;
    entrywayAdminAgent?: AtpAgent;
};
export declare const rotateKeys: (ctx: RotateKeysContext, args: string[]) => Promise<void>;
export declare const rotateKeysFromFile: (ctx: RotateKeysContext, args: string[]) => Promise<void>;
export declare const rotateKeysRecovery: (ctx: RotateKeysContext, args: string[]) => Promise<void>;
//# sourceMappingURL=rotate-keys.d.ts.map