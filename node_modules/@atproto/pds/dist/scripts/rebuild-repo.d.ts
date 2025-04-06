import { AccountManager } from '../account-manager/account-manager';
import { ActorStore } from '../actor-store/actor-store';
import { Sequencer } from '../sequencer';
export interface RebuildContext {
    sequencer: Sequencer;
    accountManager: AccountManager;
    actorStore: ActorStore;
}
export declare const rebuildRepoScript: (ctx: RebuildContext, args: string[]) => Promise<void>;
export declare const rebuildRepo: (ctx: RebuildContext, did: string, promptUser: boolean) => Promise<void>;
//# sourceMappingURL=rebuild-repo.d.ts.map