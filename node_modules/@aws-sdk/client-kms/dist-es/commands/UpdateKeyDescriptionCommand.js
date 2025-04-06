import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_UpdateKeyDescriptionCommand, se_UpdateKeyDescriptionCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class UpdateKeyDescriptionCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "UpdateKeyDescription", {})
    .n("KMSClient", "UpdateKeyDescriptionCommand")
    .f(void 0, void 0)
    .ser(se_UpdateKeyDescriptionCommand)
    .de(de_UpdateKeyDescriptionCommand)
    .build() {
}
