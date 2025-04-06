import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { CreateCustomKeyStoreRequestFilterSensitiveLog, } from "../models/models_0";
import { de_CreateCustomKeyStoreCommand, se_CreateCustomKeyStoreCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class CreateCustomKeyStoreCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("TrentService", "CreateCustomKeyStore", {})
    .n("KMSClient", "CreateCustomKeyStoreCommand")
    .f(CreateCustomKeyStoreRequestFilterSensitiveLog, void 0)
    .ser(se_CreateCustomKeyStoreCommand)
    .de(de_CreateCustomKeyStoreCommand)
    .build() {
}
