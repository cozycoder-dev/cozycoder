import { ModerationDecision } from './decision';
import { ModerationOpts, ModerationSubjectFeedGenerator, ModerationSubjectNotification, ModerationSubjectPost, ModerationSubjectProfile, ModerationSubjectUserList } from './types';
export { ModerationUI } from './ui';
export { ModerationDecision } from './decision';
export { hasMutedWord } from './mutewords';
export { interpretLabelValueDefinition, interpretLabelValueDefinitions, } from './util';
export declare function moderateProfile(subject: ModerationSubjectProfile, opts: ModerationOpts): ModerationDecision;
export declare function moderatePost(subject: ModerationSubjectPost, opts: ModerationOpts): ModerationDecision;
export declare function moderateNotification(subject: ModerationSubjectNotification, opts: ModerationOpts): ModerationDecision;
export declare function moderateFeedGenerator(subject: ModerationSubjectFeedGenerator, opts: ModerationOpts): ModerationDecision;
export declare function moderateUserList(subject: ModerationSubjectUserList, opts: ModerationOpts): ModerationDecision;
//# sourceMappingURL=index.d.ts.map