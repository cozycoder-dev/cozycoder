import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_RotateKeyOnDemandCommand, se_RotateKeyOnDemandCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class RotateKeyOnDemandCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "RotateKeyOnDemand", {})
    .n("KMSClient", "RotateKeyOnDemandCommand")
    .f(void 0, void 0)
    .ser(se_RotateKeyOnDemandCommand)
    .de(de_RotateKeyOnDemandCommand)
    .build() {
}
