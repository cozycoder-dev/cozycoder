import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { UpdateCustomKeyStoreRequestFilterSensitiveLog, } from "../models/models_0";
import { de_UpdateCustomKeyStoreCommand, se_UpdateCustomKeyStoreCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class UpdateCustomKeyStoreCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "UpdateCustomKeyStore", {})
    .n("KMSClient", "UpdateCustomKeyStoreCommand")
    .f(UpdateCustomKeyStoreRequestFilterSensitiveLog, void 0)
    .ser(se_UpdateCustomKeyStoreCommand)
    .de(de_UpdateCustomKeyStoreCommand)
    .build() {
}
