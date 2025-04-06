import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GenerateDataKeyPairResponseFilterSensitiveLog, } from "../models/models_0";
import { de_GenerateDataKeyPairCommand, se_GenerateDataKeyPairCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GenerateDataKeyPairCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GenerateDataKeyPair", {})
    .n("KMSClient", "GenerateDataKeyPairCommand")
    .f(void 0, GenerateDataKeyPairResponseFilterSensitiveLog)
    .ser(se_GenerateDataKeyPairCommand)
    .de(de_GenerateDataKeyPairCommand)
    .build() {
}
