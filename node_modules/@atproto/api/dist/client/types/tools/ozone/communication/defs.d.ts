/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface TemplateView {
    $type?: 'tools.ozone.communication.defs#templateView';
    id: string;
    /** Name of the template. */
    name: string;
    /** Content of the template, can contain markdown and variable placeholders. */
    subject?: string;
    /** Subject of the message, used in emails. */
    contentMarkdown: string;
    disabled: boolean;
    /** Message language. */
    lang?: string;
    /** DID of the user who last updated the template. */
    lastUpdatedBy: string;
    createdAt: string;
    updatedAt: string;
}
export declare function isTemplateView<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.communication.defs", "templateView">;
export declare function validateTemplateView<V>(v: V): ValidationResult<TemplateView & V>;
//# sourceMappingURL=defs.d.ts.map