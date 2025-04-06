import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { EncryptRequestFilterSensitiveLog } from "../models/models_0";
import { de_EncryptCommand, se_EncryptCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class EncryptCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "Encrypt", {})
    .n("KMSClient", "EncryptCommand")
    .f(EncryptRequestFilterSensitiveLog, void 0)
    .ser(se_EncryptCommand)
    .de(de_EncryptCommand)
    .build() {
}
