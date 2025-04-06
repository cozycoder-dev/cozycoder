import { Sequencer } from '../sequencer';
export type PublishIdentityContext = {
    sequencer: Sequencer;
};
export declare const publishIdentity: (ctx: PublishIdentityContext, args: string[]) => Promise<void>;
export declare const publishIdentityFromFile: (ctx: PublishIdentityContext, args: string[]) => Promise<void>;
export declare const publishIdentityEvtForDids: (ctx: PublishIdentityContext, dids: string[], timeBetween?: number) => Promise<void>;
//# sourceMappingURL=publish-identity.d.ts.map