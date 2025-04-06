import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_ConnectCustomKeyStoreCommand, se_ConnectCustomKeyStoreCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class ConnectCustomKeyStoreCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "ConnectCustomKeyStore", {})
    .n("KMSClient", "ConnectCustomKeyStoreCommand")
    .f(void 0, void 0)
    .ser(se_ConnectCustomKeyStoreCommand)
    .de(de_ConnectCustomKeyStoreCommand)
    .build() {
}
