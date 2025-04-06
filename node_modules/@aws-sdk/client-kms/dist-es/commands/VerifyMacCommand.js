import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { VerifyMacRequestFilterSensitiveLog } from "../models/models_0";
import { de_VerifyMacCommand, se_VerifyMacCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class VerifyMacCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "VerifyMac", {})
    .n("KMSClient", "VerifyMacCommand")
    .f(VerifyMacRequestFilterSensitiveLog, void 0)
    .ser(se_VerifyMacCommand)
    .de(de_VerifyMacCommand)
    .build() {
}
