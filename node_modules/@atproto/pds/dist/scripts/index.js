"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts = void 0;
const publish_identity_1 = require("./publish-identity");
const rebuild_repo_1 = require("./rebuild-repo");
const rotate_keys_1 = require("./rotate-keys");
const sequencer_recovery_1 = require("./sequencer-recovery");
const repair_repos_1 = require("./sequencer-recovery/repair-repos");
exports.scripts = {
    'rebuild-repo': rebuild_repo_1.rebuildRepo,
    'sequencer-recovery': sequencer_recovery_1.sequencerRecovery,
    'recovery-repair-repos': repair_repos_1.repairRepos,
    'rotate-keys': rotate_keys_1.rotateKeys,
    'rotate-keys-file': rotate_keys_1.rotateKeysFromFile,
    'rotate-keys-recovery': rotate_keys_1.rotateKeysRecovery,
    'publish-identity': publish_identity_1.publishIdentity,
    'publish-identity-file': publish_identity_1.publishIdentityFromFile,
};
//# sourceMappingURL=index.js.map