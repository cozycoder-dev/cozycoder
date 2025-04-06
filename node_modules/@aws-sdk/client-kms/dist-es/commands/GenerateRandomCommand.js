import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { GenerateRandomResponseFilterSensitiveLog, } from "../models/models_0";
import { de_GenerateRandomCommand, se_GenerateRandomCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GenerateRandomCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GenerateRandom", {})
    .n("KMSClient", "GenerateRandomCommand")
    .f(void 0, GenerateRandomResponseFilterSensitiveLog)
    .ser(se_GenerateRandomCommand)
    .de(de_GenerateRandomCommand)
    .build() {
}
