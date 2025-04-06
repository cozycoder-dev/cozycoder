import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { VerifyRequestFilterSensitiveLog } from "../models/models_0";
import { de_VerifyCommand, se_VerifyCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class VerifyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "Verify", {})
    .n("KMSClient", "VerifyCommand")
    .f(VerifyRequestFilterSensitiveLog, void 0)
    .ser(se_VerifyCommand)
    .de(de_VerifyCommand)
    .build() {
}
