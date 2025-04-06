import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DisconnectCustomKeyStoreCommand, se_DisconnectCustomKeyStoreCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DisconnectCustomKeyStoreCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "DisconnectCustomKeyStore", {})
    .n("KMSClient", "DisconnectCustomKeyStoreCommand")
    .f(void 0, void 0)
    .ser(se_DisconnectCustomKeyStoreCommand)
    .de(de_DisconnectCustomKeyStoreCommand)
    .build() {
}
