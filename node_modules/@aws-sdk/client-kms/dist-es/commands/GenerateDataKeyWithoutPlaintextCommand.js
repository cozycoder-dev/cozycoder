import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GenerateDataKeyWithoutPlaintextCommand, se_GenerateDataKeyWithoutPlaintextCommand, } from "../protocols/Aws_json1_1";
export { $Command };
export class GenerateDataKeyWithoutPlaintextCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GenerateDataKeyWithoutPlaintext", {})
    .n("KMSClient", "GenerateDataKeyWithoutPlaintextCommand")
    .f(void 0, void 0)
    .ser(se_GenerateDataKeyWithoutPlaintextCommand)
    .de(de_GenerateDataKeyWithoutPlaintextCommand)
    .build() {
}
