import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { DecryptResponseFilterSensitiveLog } from "../models/models_0";
import { de_DecryptCommand, se_DecryptCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DecryptCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "Decrypt", {})
    .n("KMSClient", "DecryptCommand")
    .f(void 0, DecryptResponseFilterSensitiveLog)
    .ser(se_DecryptCommand)
    .de(de_DecryptCommand)
    .build() {
}
