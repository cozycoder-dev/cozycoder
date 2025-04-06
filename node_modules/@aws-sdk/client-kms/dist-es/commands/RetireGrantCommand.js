import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_RetireGrantCommand, se_RetireGrantCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class RetireGrantCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "RetireGrant", {})
    .n("KMSClient", "RetireGrantCommand")
    .f(void 0, void 0)
    .ser(se_RetireGrantCommand)
    .de(de_RetireGrantCommand)
    .build() {
}
