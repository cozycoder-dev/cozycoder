import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GenerateDataKeyResponseFilterSensitiveLog, } from "../models/models_0";
import { de_GenerateDataKeyCommand, se_GenerateDataKeyCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GenerateDataKeyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GenerateDataKey", {})
    .n("KMSClient", "GenerateDataKeyCommand")
    .f(void 0, GenerateDataKeyResponseFilterSensitiveLog)
    .ser(se_GenerateDataKeyCommand)
    .de(de_GenerateDataKeyCommand)
    .build() {
}
