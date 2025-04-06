import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetKeyRotationStatusCommand, se_GetKeyRotationStatusCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetKeyRotationStatusCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GetKeyRotationStatus", {})
    .n("KMSClient", "GetKeyRotationStatusCommand")
    .f(void 0, void 0)
    .ser(se_GetKeyRotationStatusCommand)
    .de(de_GetKeyRotationStatusCommand)
    .build() {
}
