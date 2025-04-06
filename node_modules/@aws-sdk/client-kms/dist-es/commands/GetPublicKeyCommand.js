import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_GetPublicKeyCommand, se_GetPublicKeyCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class GetPublicKeyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "GetPublicKey", {})
    .n("KMSClient", "GetPublicKeyCommand")
    .f(void 0, void 0)
    .ser(se_GetPublicKeyCommand)
    .de(de_GetPublicKeyCommand)
    .build() {
}
